
'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, doc, type Timestamp, updateDoc } from 'firebase/firestore';
import { sendMessage, updateTypingStatus } from '@/services/chat-service';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2, Bot, MessageSquare } from 'lucide-react';
import { TypingIndicator } from '@/components/typing-indicator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';

interface ChatSession {
    id: string;
    userName: string;
    email?: string;
    lastMessage: string;
    lastMessageAt: Timestamp | null;
    isReadByAdmin: boolean;
    unreadCount?: number;
    isUserTyping?: boolean;
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
    const [isUserTyping, setIsUserTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (authLoading || !user) {
            // Wait for authentication to resolve. The AdminLayout will handle redirection if needed.
            return;
        }

        const q = query(collection(db, 'chats'), orderBy('lastMessageAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatSessions: ChatSession[] = [];
            snapshot.forEach((doc) => {
                chatSessions.push({ id: doc.id, ...doc.data() } as ChatSession);
            });
            setSessions(chatSessions);
            setIsPageLoading(false);
        }, (error) => {
            console.error("Error fetching chat sessions:", error);
            setIsPageLoading(false);
        });
        return () => unsubscribe();
    }, [user, authLoading]);

    useEffect(() => {
        if (!selectedChat) return;

        // Listener for messages
        const messagesQuery = query(collection(db, 'chats', selectedChat.id, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
            const newMessages: Message[] = [];
            snapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });
        
        // Listener for chat metadata (like typing status)
        const chatDocRef = doc(db, 'chats', selectedChat.id);
        const unsubscribeChat = onSnapshot(chatDocRef, (doc) => {
             if (doc.exists()) {
                setIsUserTyping(doc.data().isUserTyping || false);
             }
        });

        // Mark chat as read and reset unread count
        if (!selectedChat.isReadByAdmin || (selectedChat.unreadCount && selectedChat.unreadCount > 0)) {
            updateDoc(chatDocRef, { isReadByAdmin: true, unreadCount: 0 });
        }

        return () => {
            unsubscribeMessages();
            unsubscribeChat();
        };
    }, [selectedChat]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedChat) return;
        
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        updateTypingStatus(selectedChat.id, 'admin', false);
    
        setIsSubmitting(true);
        const messageText = inputValue;
        setInputValue('');

        try {
            await sendMessage(selectedChat.id, { text: messageText, sender: 'admin' });
        } catch (error) {
            console.error("Failed to send message:", error);
            setInputValue(messageText); // Restore input on failure
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (!selectedChat) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        } else {
            updateTypingStatus(selectedChat.id, 'admin', true);
        }

        typingTimeoutRef.current = setTimeout(() => {
            updateTypingStatus(selectedChat.id, 'admin', false);
            typingTimeoutRef.current = null;
        }, 2000);
    };

    if (isPageLoading) {
      return (
        <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] border rounded-lg bg-card text-card-foreground">
            {/* Chat List */}
            <div className="w-1/3 border-r flex flex-col bg-background/50">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Conversations</h2>
                </div>
                <ScrollArea className="flex-1">
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            className={cn(
                                "p-4 cursor-pointer border-b hover:bg-muted/50 transition-colors",
                                selectedChat?.id === session.id && "bg-muted",
                            )}
                            onClick={() => setSelectedChat(session)}
                        >
                            <div className="flex justify-between items-center">
                                <p className={cn("truncate font-semibold", !session.isReadByAdmin && "text-primary")}>
                                    {session.userName}
                                </p>
                                {session.unreadCount && session.unreadCount > 0 ? (
                                    <Badge variant="destructive" className="h-5">{session.unreadCount}</Badge>
                                ) : (
                                    session.lastMessageAt && (
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            {formatDistanceToNow(session.lastMessageAt.toDate(), { addSuffix: true })}
                                        </p>
                                    )
                                )}
                            </div>
                            <p className={cn("text-sm truncate text-muted-foreground", !session.isReadByAdmin && "text-foreground font-medium")}>
                                {session.isUserTyping ? <span className="italic text-primary">typing...</span> : session.lastMessage}
                            </p>
                        </div>
                    ))}
                     {sessions.length === 0 && !isPageLoading && (
                        <div className="text-center p-8 text-muted-foreground">
                            <p>No active conversations.</p>
                        </div>
                    )}
                </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b flex items-center gap-4">
                            <Avatar><AvatarFallback>{selectedChat.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>
                            <div>
                                <h2 className="text-lg font-bold">{selectedChat.userName}</h2>
                                {selectedChat.email && <p className="text-sm text-muted-foreground">{selectedChat.email}</p>}
                            </div>
                        </div>
                        <ScrollArea className="flex-1 bg-background/30">
                            <div className="p-4 space-y-4">
                                 {messages.map((msg) => (
                                    <div key={msg.id} className={cn("flex gap-2.5 items-end", msg.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                                        {msg.sender === 'user' && <Avatar className="h-8 w-8 shadow"><AvatarFallback>{selectedChat.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>}
                                        <div className={cn(
                                            "max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm",
                                            msg.sender === 'admin' ? 'bg-primary text-primary-foreground rounded-bl-none' : 'bg-muted rounded-br-none'
                                        )}>
                                            <p>{msg.text}</p>
                                        </div>
                                        {msg.sender === 'admin' && <Avatar className="h-8 w-8 shadow"><AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback></Avatar>}
                                    </div>
                                ))}
                                {isUserTyping && (
                                    <div className="flex gap-2.5 items-end justify-start">
                                        <Avatar className="h-8 w-8 shadow"><AvatarFallback>{selectedChat.userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>
                                        <div className="bg-muted rounded-lg px-3 py-2 shadow-sm">
                                            <TypingIndicator />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <Input 
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Type your reply..."
                                    disabled={isSubmitting}
                                    autoComplete="off"
                                />
                                <Button type="submit" size="icon" disabled={isSubmitting || !inputValue.trim()}>
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <MessageSquare className="h-16 w-16 text-muted-foreground/30" />
                        <p className="mt-4 text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
