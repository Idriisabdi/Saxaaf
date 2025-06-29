'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { z } from 'zod';

const sanitize = (text: string) => text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

const spamKeywords = ['crypto', 'forex', 'investment', 'free money', 'SEO service', 'marketing service', 'buy now'];

const containsSpam = (text: string) => {
    if (!text) return false;
    const lowercasedText = text.toLowerCase();
    return spamKeywords.some(keyword => lowercasedText.includes(keyword));
};

const MessageSchema = z.object({
    text: z.string().min(1).max(1000),
    sender: z.enum(['user', 'admin']),
});

// Action to send a message to an existing chat
export async function sendMessage(chatId: string, message: z.infer<typeof MessageSchema>) {
    const validatedMessage = MessageSchema.safeParse(message);
    if (!validatedMessage.success) {
        throw new Error('Invalid message data');
    }
    
    if (containsSpam(validatedMessage.data.text)) {
        // We can choose to silently fail or throw an error.
        // For a better UX, you might want to handle this on the client with a toast.
        // For now, we'll just prevent the message from being sent.
        console.warn(`Blocked spam message from chat ${chatId}`);
        // Optionally, throw an error to notify the client.
        throw new Error("Message blocked due to spam content.");
    }


    const chatRef = doc(db, 'chats', chatId);
    const messagesCol = collection(chatRef, 'messages');

    await addDoc(messagesCol, {
        ...validatedMessage.data,
        text: sanitize(validatedMessage.data.text),
        timestamp: serverTimestamp(),
    });
    
    const updateData: any = {
        lastMessage: sanitize(validatedMessage.data.text),
        lastMessageAt: serverTimestamp(),
    };

    if (message.sender === 'user') {
        updateData.isReadByAdmin = false;
        updateData.unreadCount = increment(1);
    } else {
        updateData.isReadByAdmin = true;
    }

    await updateDoc(chatRef, updateData);
}

// Action to create a new chat session
export async function createChat(userName: string, email: string, firstMessage?: string) {
    if (containsSpam(userName) || (firstMessage && containsSpam(firstMessage))) {
        throw new Error("Request blocked due to spam content.");
    }
    
    const sanitizedUserName = sanitize(userName);
    const sanitizedEmail = sanitize(email);

    const chatsCol = collection(db, 'chats');
    const newChatRef = doc(chatsCol); // Create a new doc with a generated ID
    
    const lastMessage = firstMessage ? sanitize(firstMessage) : 'New chat session started.';

    await setDoc(newChatRef, {
        userName: sanitizedUserName,
        email: sanitizedEmail,
        createdAt: serverTimestamp(),
        lastMessage: lastMessage,
        lastMessageAt: serverTimestamp(),
        isReadByAdmin: false,
        isUserTyping: false,
        isAdminTyping: false,
        unreadCount: firstMessage ? 1 : 0,
    });

    if (firstMessage) {
        const messagesCol = collection(newChatRef, 'messages');
        await addDoc(messagesCol, {
            text: sanitize(firstMessage),
            sender: 'user',
            timestamp: serverTimestamp(),
        });
    }

    return newChatRef.id;
}

// Action to update typing status
export async function updateTypingStatus(chatId: string, userType: 'user' | 'admin', isTyping: boolean) {
    const chatRef = doc(db, 'chats', chatId);
    const fieldToUpdate = userType === 'user' ? 'isUserTyping' : 'isAdminTyping';
    await updateDoc(chatRef, { [fieldToUpdate]: isTyping });
}
