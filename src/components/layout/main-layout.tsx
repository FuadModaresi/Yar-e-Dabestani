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
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-user';


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} defaultOpen={true}>
      <Sidebar side="right" variant="sidebar" collapsible="icon">
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
