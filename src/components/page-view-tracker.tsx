'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logPageView } from '@/services/tracking-service';

function generateSessionId() {
    // A simple way to generate a unique ID for the session
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let sessionId = localStorage.getItem('userSessionId');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('userSessionId', sessionId);
    }
    
    // We only want to track page views for non-admin pages
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/portal')) {
        logPageView({ pathname, sessionId });
    }
    
  }, [pathname]);

  return null;
}
