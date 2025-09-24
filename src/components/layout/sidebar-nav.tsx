'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Atom, Variable, FlaskConical, Calculator, BookCopy } from 'lucide-react';
import { subjects } from '@/lib/data';

const subjectIcons = {
  physics: Atom,
  math: Calculator,
  chemistry: FlaskConical,
  biology: Variable,
};

export default function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };
  
  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-8 w-8 text-primary">
            <rect width="256" height="256" fill="none" />
            <path d="M128,24a72,72,0,0,0-72,72c0,30.4,14.8,64.2,42.4,99.8,25.3,32.6,33.8,42.5,29.5,45.9a.8.8,0,0,0,.2,0,7.9,7.9,0,0,0,6.5-3.3c4.9-7.1,10.7-16.3,20-31.5,13.7-22.6,48.4-78.2,48.4-110.9A72,72,0,0,0,128,24Z" opacity="0.2" />
            <path d="M128,24a72,72,0,0,0-72,72c0,30.4,14.8,64.2,42.4,99.8,25.3,32.6,33.8,42.5,29.5,45.9a.8.8,0,0,0,.2,0,7.9,7.9,0,0,0,6.5-3.3c4.9-7.1,10.7-16.3,20-31.5,13.7-22.6,48.4-78.2,48.4-110.9A72,72,0,0,0,128,24Zm0,104a32,32,0,1,1,32-32A32.1,32.1,0,0,1,128,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
          </svg>
          <span className="font-headline text-lg font-bold">یار دبستانی من</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip={{ children: 'داشبورد' }}
            >
              <Link href="/">
                <Home />
                <span>داشبورد</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {subjects.map((subject) => {
            const Icon = subjectIcons[subject.id as keyof typeof subjectIcons] || Atom;
            return (
              <SidebarMenuItem key={subject.id}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(`/subjects/${subject.id}`)}
                  tooltip={{ children: subject.name }}
                >
                  <Link href={`/subjects/${subject.id}`}>
                    <Icon />
                    <span>{subject.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/glossary')}
              tooltip={{ children: 'واژه‌نامه' }}
            >
              <Link href="/glossary">
                <BookCopy />
                <span>واژه‌نامه</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Footer content can go here */}
      </SidebarFooter>
    </>
  );
}
