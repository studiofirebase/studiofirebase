
"use client";

import { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import FetishModal from '@/components/fetish-modal';
import type { Fetish } from '@/lib/fetish-data';
import AdultWarningDialog from '@/components/adult-warning-dialog';
import MainFooter from './main-footer';
import { usePathname } from 'next/navigation';
import { doc, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SecretChatWidget from '@/components/secret-chat-widget';
import SecretChatButton from '@/components/secret-chat-button';



const getOrCreateChatId = (): string => {
    if (typeof window === 'undefined') {
        return '';
    }
    let chatId = localStorage.getItem('secretChatId');
    if (!chatId) {
        const randomId = Math.random().toString(36).substring(2, 8);
        chatId = `secret-chat-${randomId}`;
        localStorage.setItem('secretChatId', chatId);
    }
    return chatId;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFetish, setSelectedFetish] = useState<Fetish | null>(null);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const hasConfirmedAge = localStorage.getItem('ageConfirmed');
    if (!hasConfirmedAge) {
      setIsWarningOpen(true);
    }

    const trackVisitor = async () => {
        if (pathname?.startsWith('/admin')) return;

        // Track chat visitor
        const chatId = getOrCreateChatId();
        if (chatId) {
            const chatDocRef = doc(db, 'chats', chatId);
            try {
                await setDoc(chatDocRef, {
                    lastSeen: serverTimestamp(),
                }, { merge: true });
            } catch (error) {
                // Error handled silently
            }
        }
        
        // Track page view - Temporarily disabled for development
        /*
        if (pathname) {
            // Sanitize path to use as a document ID in Firestore
            const docId = pathname === '/' ? 'home' : pathname.replace(/\//g, '_');
            const pageViewRef = doc(db, 'pageViews', docId);
            try {
                await runTransaction(db, async (transaction) => {
                    const pageViewDoc = await transaction.get(pageViewRef);
                    if (!pageViewDoc.exists()) {
                        transaction.set(pageViewRef, { path: pathname, count: 1, lastViewed: serverTimestamp() });
                    } else {
                        const newCount = pageViewDoc.data().count + 1;
                        transaction.update(pageViewRef, { count: newCount, lastViewed: serverTimestamp() });
                    }
                });
            } catch (error) {
                // Error handled silently
            }
        }
        */
    };

    trackVisitor();

  }, [pathname]);

  const handleConfirmAge = () => {
    localStorage.setItem('ageConfirmed', 'true');
    setIsWarningOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleFetishSelect = (fetish: Fetish) => {
    setSelectedFetish(fetish);
    setSidebarOpen(false); 
  };

  const handleCloseModal = () => {
    setSelectedFetish(null);
  };

  if (!isClient) {
    return null;
  }

  const isAdminPanel = pathname?.startsWith('/admin') ?? false;
  const noHeaderLayoutRoutes = ['/auth', '/old-auth-page', '/chat-secreto'];
  const showHeader = !noHeaderLayoutRoutes.some(route => pathname?.startsWith(route) ?? false) && !isAdminPanel;
  
  const showSiteFooter = !noHeaderLayoutRoutes.some(route => pathname?.startsWith(route) ?? false) && !isAdminPanel;
  const showChat = !isAdminPanel && !pathname?.startsWith('/auth');

  // Para rotas do admin, retornar apenas o children sem nenhum wrapper
  if (isAdminPanel) {
    return <>{children}</>;
  }


  return (
    <>
      <AdultWarningDialog isOpen={isWarningOpen} onConfirm={handleConfirmAge} />
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        { showHeader && <Header onMenuClick={toggleSidebar} /> }
        <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={toggleSidebar} 
            onFetishSelect={handleFetishSelect} 
        />
        <main className="flex-grow flex flex-col items-center">{children}</main>
        {showSiteFooter && <MainFooter />}
      </div>
      {showChat && (
        <>
            <SecretChatWidget isOpen={isChatOpen} onClose={toggleChat} />
            <SecretChatButton onClick={toggleChat} isChatOpen={isChatOpen} />
        </>
      )}
      {selectedFetish && (
        <FetishModal 
          fetish={selectedFetish} 
          isOpen={!!selectedFetish} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default Layout;
