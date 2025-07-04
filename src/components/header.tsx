"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/market-research", label: "Market Research" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        
        {/* Left Side */}
        <div className="flex-1 flex justify-start">
            <div className="hidden md:flex">
                <Logo />
            </div>
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-xs pr-0">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <SheetDescription className="sr-only">A list of navigation links for the site.</SheetDescription>
                    <Logo className="mr-6 mb-8" onClick={() => setIsOpen(false)} width={140} />
                    <div className="flex flex-col space-y-3">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-lg transition-colors hover:text-foreground/80",
                            pathname === link.href ? "text-foreground font-semibold" : "text-foreground/60"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
        </div>

        {/* Center */}
        <div className="flex-none">
            <nav className="hidden items-center gap-6 text-sm md:flex">
                {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === link.href ? "text-foreground font-semibold" : "text-foreground/60"
                    )}
                >
                    {link.label}
                </Link>
                ))}
            </nav>
            <div className="flex items-center md:hidden">
                <Logo width={140} />
            </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end">
            <Button asChild>
                <Link href="/lead-assessment">
                Schedule a Consultation
                </Link>
            </Button>
        </div>
        
      </div>
    </header>
  );
}
