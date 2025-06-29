'use client';

import { usePathname } from "next/navigation";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ChatWidget from '@/components/chat-widget';
import PageViewTracker from '@/components/page-view-tracker';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    const isLoginPage = pathname === '/portal';

    if (isAdminPage || isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <PageViewTracker />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
        </>
    )
}
