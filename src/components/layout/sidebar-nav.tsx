
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
import { Home, Atom, Dna, FlaskConical, Calculator, BookCopy } from 'lucide-react';
import { subjects } from '@/lib/data';

const subjectIcons = {
  physics: Atom,
  math: Calculator,
  chemistry: FlaskConical,
  biology: Dna,
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z"/>
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
      <SidebarFooter className="p-4 mt-auto" />
    </>
  );
}
