'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
