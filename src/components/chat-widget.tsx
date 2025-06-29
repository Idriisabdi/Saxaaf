'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { createChat, sendMessage } from '@/services/chat-service';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, type Timestamp } from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Timestamp | null;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const storedChatId = localStorage.getItem('chatId');
        const storedUserName = localStorage.getItem('userName');
        if (storedChatId) {
            setChatId(storedChatId);
            if (storedUserName) {
              setUserName(storedUserName);
            }
        }
    }, []);

    useEffect(() => {
        if (!chatId) return;

        const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [chatId]);
    
    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setIsLoading(true);
        const messageText = inputValue;
        setInputValue('');

        try {
            if (chatId) {
                // Existing chat: just send the message
                await sendMessage(chatId, { text: messageText, sender: 'user' });
            } else {
                // New chat: generate a visitor name and create the chat
                const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
                const newUserName = `Visitor ${randomId}`;
                setUserName(newUserName);
                localStorage.setItem('userName', newUserName);
                
                const newChatId = await createChat(newUserName, messageText);
                setChatId(newChatId);
                localStorage.setItem('chatId', newChatId);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg"
                onClick={toggleChat}
            >
                <MessageSquare className="h-8 w-8" />
            </Button>
        );
    }

    return (
        <Card className="fixed bottom-4 right-4 z-50 w-80 h-[28rem] flex flex-col shadow-lg animate-in fade-in zoom-in-95">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <CardTitle className="text-lg">Support Chat</CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.sender === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
                            <div className={cn(
                                "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                                msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            )}>
                                {msg.text}
                            </div>
                            {msg.sender === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>{userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                    <Input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
