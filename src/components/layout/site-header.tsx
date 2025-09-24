'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 md:hidden">
      <SidebarTrigger />
      <div className="flex-1">
        {/* Placeholder for header content on mobile */}
      </div>
    </header>
  );
}
