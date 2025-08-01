"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Paperclip, MapPin, Image as ImageIcon, Mic, Video, Phone } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá! Como posso ajudar com seu pedido de hambúrguer?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      setTimeout(() => {
        const botMessage: Message = {
            id: Date.now() + 1,
            text: 'Obrigado por sua mensagem! Um de nossos atendentes responderá em breve.',
            sender: 'bot',
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <Button onClick={toggleChat} size="icon" variant="default" className="rounded-full w-16 h-16 shadow-lg btn-neon-primary">
            {isOpen ? <X /> : <MessageCircle />}
            <span className="sr-only">Abrir Chat</span>
        </Button>
      </div>
      
      {isOpen && (
        <div className="fixed bottom-24 left-4 z-50">
            <Card className="w-80 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-lg">
                    <CardTitle className="text-lg">Fale Conosco</CardTitle>
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                            <Phone className="h-5 w-5" />
                            <span className="sr-only">Fazer ligação de vídeo</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Fechar Chat</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                                    <div className={cn("rounded-lg px-4 py-2 max-w-[80%]",
                                        msg.sender === 'user' 
                                            ? "bg-primary text-primary-foreground" 
                                            : "bg-muted text-muted-foreground"
                                    )}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-2 border-t flex-col">
                    <div className="flex w-full justify-around py-2">
                        <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><MapPin className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                    </div>
                    <Separator />
                    <form onSubmit={handleSendMessage} className="flex w-full gap-2 pt-2">
                        <Input 
                            placeholder="Digite sua mensagem..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button type="submit" size="icon" variant="ghost">
                            <Send />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
      )}
    </>
  );
}
