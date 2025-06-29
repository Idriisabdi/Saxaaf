'use client';

import { usePathname } from "next/navigation";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ChatWidget from '@/components/chat-widget';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    if (isAdminPage) {
        // AdminLayout provides its own <main> via SidebarInset
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
        </>
    )
}
