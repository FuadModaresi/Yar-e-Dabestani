
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
            <path d="M20 4v16H8V4h12m0-2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
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
