'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { createChat, sendMessage, updateTypingStatus } from '@/services/chat-service';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, type Timestamp, doc } from 'firebase/firestore';
import { TypingIndicator } from '@/components/typing-indicator';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Timestamp | null;
}

const PreChatSchema = z.object({
    name: z.string().min(2, "Name is required.").max(50),
    email: z.string().email("A valid email address is required."),
    message: z.string().min(1, "Please enter a message to start.").max(1000),
});
type PreChatValues = z.infer<typeof PreChatSchema>;


export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'pre-chat' | 'chatting'>('chatting');
    const [chatId, setChatId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminTyping, setIsAdminTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const preChatForm = useForm<PreChatValues>({
        resolver: zodResolver(PreChatSchema),
        defaultValues: { name: '', email: '', message: '' },
    });
    
    useEffect(() => {
        const storedChatId = localStorage.getItem('chatId');
        const storedUserName = localStorage.getItem('userName');
        if (storedChatId && storedUserName) {
            setChatId(storedChatId);
            setUserName(storedUserName);
            setView('chatting');
        } else {
            setView('pre-chat');
        }
    }, []);

    useEffect(() => {
        if (!chatId) return;

        // Listener for messages
        const messagesQuery = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
            const newMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(newMessages);
        });
        
        // Listener for chat metadata (like typing status)
        const chatDocRef = doc(db, 'chats', chatId);
        const unsubscribeChat = onSnapshot(chatDocRef, (doc) => {
            if (doc.exists()) {
                setIsAdminTyping(doc.data().isAdminTyping || false);
            }
        });

        return () => {
            unsubscribeMessages();
            unsubscribeChat();
        };
    }, [chatId]);

    const handleStartChat = async (values: PreChatValues) => {
        setIsLoading(true);
        try {
            const newChatId = await createChat(values.name, values.email, values.message);
            setChatId(newChatId);
            setUserName(values.name);
            localStorage.setItem('chatId', newChatId);
            localStorage.setItem('userName', values.name);
            setView('chatting');
        } catch (error) {
            console.error("Failed to create chat:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !chatId) return;

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        updateTypingStatus(chatId, 'user', false);

        setIsLoading(true);
        const messageText = inputValue;
        setInputValue('');

        try {
            await sendMessage(chatId, { text: messageText, sender: 'user' });
        } catch (error) {
            console.error("Failed to send message:", error);
            setInputValue(messageText);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (!chatId) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        } else {
            updateTypingStatus(chatId, 'user', true);
        }

        typingTimeoutRef.current = setTimeout(() => {
            updateTypingStatus(chatId, 'user', false);
            typingTimeoutRef.current = null;
        }, 2000);
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

    const ChatArea = () => (
      <>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-8">
                    <p>Welcome! How can we help you today?</p>
                </div>
              )}
              {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex gap-2.5 items-end", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                      {msg.sender === 'admin' && <Avatar className="h-8 w-8 shadow"><AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback></Avatar>}
                      <div className={cn(
                          "max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm",
                          msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                      )}>
                          <p>{msg.text}</p>
                      </div>
                      {msg.sender === 'user' && <Avatar className="h-8 w-8 shadow"><AvatarFallback>{userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback></Avatar>}
                  </div>
              ))}
                {isAdminTyping && (
                  <div className="flex gap-2.5 items-end justify-start">
                      <Avatar className="h-8 w-8 shadow"><AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback></Avatar>
                      <div className="bg-muted rounded-lg px-3 py-2 shadow-sm">
                          <TypingIndicator />
                      </div>
                  </div>
              )}
          </div>
        </ScrollArea>
        <CardFooter className="p-2 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input 
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    disabled={isLoading}
                    autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
            </form>
        </CardFooter>
      </>
    );

    const PreChatForm = () => (
        <ScrollArea className="flex-1">
            <CardContent className="p-4">
                <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground">
                        Please provide your details below to start the chat.
                    </p>
                </div>
                <Form {...preChatForm}>
                    <form onSubmit={preChatForm.handleSubmit(handleStartChat)} className="space-y-4">
                        <FormField
                            control={preChatForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={preChatForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your@email.com" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={preChatForm.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="How can we help you?" {...field} disabled={isLoading} rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Start Chat'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </ScrollArea>
    )

    return (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm h-[32rem] flex flex-col shadow-lg animate-in fade-in zoom-in-95">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                    </Avatar>
                    <div>
                         <CardTitle className="text-lg">Support Chat</CardTitle>
                         <p className="text-xs text-muted-foreground">We typically reply within minutes.</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            {view === 'pre-chat' ? <PreChatForm /> : <ChatArea />}
        </Card>
    );
}
