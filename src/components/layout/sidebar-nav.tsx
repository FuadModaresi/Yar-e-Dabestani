
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
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M22 10v6M2 10v6" />
            <path d="M6 12v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
            <path d="M6 12h12" />
            <path d="M12 12v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6" />
            <path d="m18 12 4-2-4-2" />
            <path d="m6 12-4-2 4-2" />
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
