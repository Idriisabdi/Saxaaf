'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, doc, type Timestamp, updateDoc } from 'firebase/firestore';
import { sendMessage } from '@/services/chat-service';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';

interface ChatSession {
    id: string;
    userName: string;
    email?: string;
    lastMessage: string;
    lastMessageAt: Timestamp | null;
    isReadByAdmin: boolean;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'admin';
    timestamp: Timestamp | null;
}

export default function AdminChatPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('lastMessageAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatSessions: ChatSession[] = [];
            snapshot.forEach((doc) => {
                chatSessions.push({ id: doc.id, ...doc.data() } as ChatSession);
            });
            setSessions(chatSessions);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedChat) return;

        const q = query(collection(db, 'chats', selectedChat.id, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages: Message[] = [];
            snapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });
        
        // Mark chat as read
        if (!selectedChat.isReadByAdmin) {
            const chatRef = doc(db, 'chats', selectedChat.id);
            updateDoc(chatRef, { isReadByAdmin: true });
        }

        return () => unsubscribe();
    }, [selectedChat]);
    
    const scrollToBottom = () => {
         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedChat) return;
    
        setIsLoading(true);
        try {
            await sendMessage(selectedChat.id, { text: inputValue, sender: 'admin' });
            setInputValue('');
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] border rounded-lg">
            {/* Chat List */}
            <div className="w-1/3 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Conversations</h2>
                </div>
                <ScrollArea className="flex-1">
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            className={cn(
                                "p-4 cursor-pointer border-b hover:bg-muted/50",
                                selectedChat?.id === session.id && "bg-muted",
                                !session.isReadByAdmin && "font-bold"
                            )}
                            onClick={() => setSelectedChat(session)}
                        >
                            <div className="flex justify-between">
                                <p className="truncate">{session.userName}</p>
                                <p className="text-xs text-muted-foreground whitespace-nowrap">
                                    {session.lastMessageAt ? formatDistanceToNow(session.lastMessageAt.toDate(), { addSuffix: true }) : ''}
                                </p>
                            </div>
                            <p className={cn("text-sm truncate text-muted-foreground", !session.isReadByAdmin && "text-foreground")}>
                                {session.lastMessage}
                            </p>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-bold">{selectedChat.userName}</h2>
                            {selectedChat.email && <p className="text-sm text-muted-foreground">{selectedChat.email}</p>}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-card/20">
                            <div className="space-y-4">
                                 {messages.map((msg) => (
                                    <div key={msg.id} className={cn("flex gap-2 items-end", msg.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                                        {msg.sender === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>{selectedChat.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>}
                                        <div className={cn(
                                            "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                                            msg.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        )}>
                                            <p>{msg.text}</p>
                                        </div>
                                        {msg.sender === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <Input 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your reply..."
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
