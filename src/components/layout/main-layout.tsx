"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import SidebarNav from './sidebar-nav';
import SiteHeader from './site-header';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import {
  SidebarHeader,
} from '@/components/ui/sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const { user } = useUser();

  if (!user) {
    // This can be a loading spinner or some other placeholder
    return (
        <div className="flex h-screen w-full items-center justify-center">
            Loading user...
        </div>
    );
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} defaultOpen={true}>
      <Sidebar side="right" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-primary"
            >
                <path d="M20 4v16H8V4h12m0-2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
            </svg>
            <span className="font-headline text-lg font-bold">یار دبستانی من</span>
            </Link>
        </SidebarHeader>
        <SidebarNav />
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
