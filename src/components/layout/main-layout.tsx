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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // We manage the sidebar open state here to persist it across page navigations.
  const [open, setOpen] = React.useState(true);

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
