
"use client";

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, Video } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetishCategories, Fetish } from '@/lib/fetish-data';
import AboutSection from '@/components/about-section';
import { useProfileSettings } from '@/hooks/use-profile-settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFetishSelect: (fetish: Fetish) => void;
}

const Sidebar = ({ isOpen, onClose, onFetishSelect }: SidebarProps) => {
  const router = useRouter();
  const { adultWorkLabel } = useProfileSettings();
  
  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleFetishClick = (item: Fetish) => {
    onFetishSelect(item);
    onClose();
  };
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-400`}>
        <div className="p-4 flex justify-between items-center border-b border-border">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-white hover:bg-gray-800">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100%-65px)]">
          <div className="bg-white text-black text-center text-xs font-bold p-2 uppercase tracking-wider rounded-md mb-4">
              {adultWorkLabel}
          </div>
          <ul className="space-y-2">
             <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="fetish-bdsm" className="border-none">
                <AccordionTrigger className="p-3 hover:no-underline hover:bg-muted rounded-md text-base">FETISH &amp; BDSM</AccordionTrigger>
                <AccordionContent className="pl-4">
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(fetishCategories).map(([category, items]) => (
                      <AccordionItem key={category} value={category} className="border-none">
                        <AccordionTrigger className="py-2 px-2 text-sm hover:no-underline hover:bg-muted/50 rounded-md">{category}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          <ul className="space-y-1 pt-1">
                            {items.map((item) => (
                               <li key={item.id}>
                                <button onClick={() => handleFetishClick(item)} className="block w-full text-left p-2 text-xs rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50">
                                  {item.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>

              <li><Link href="/fotos" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>FOTOS</Link></li>
              <li><Link href="/videos" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>VÍDEOS</Link></li>
              <li><Link href="/galeria-assinantes" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>
                GALERIA EXCLUSIVA
              </Link></li>
              <li><Link href="/loja" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>LOJA ON-LINE</Link></li>
              {/* <li><Link href="/aluga-se" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>ALUGA-SE</Link></li> */}
              {/* <li><Link href="/canais" className="block p-3 rounded-md hover:bg-muted" onClick={onClose}>CANAIS</Link></li> */}
              

            </Accordion>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
