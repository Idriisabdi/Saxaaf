'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

const sanitize = (text: string) => text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

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

    const chatRef = doc(db, 'chats', chatId);
    const messagesCol = collection(chatRef, 'messages');

    await addDoc(messagesCol, {
        ...validatedMessage.data,
        text: sanitize(validatedMessage.data.text),
        timestamp: serverTimestamp(),
    });
    
    await updateDoc(chatRef, {
        lastMessage: sanitize(validatedMessage.data.text),
        lastMessageAt: serverTimestamp(),
        isReadByAdmin: message.sender === 'user' ? false : true,
    });
}

// Action to create a new chat session
export async function createChat(userName: string, email: string, firstMessage?: string) {
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
