
'use client';

import {
  SidebarContent,
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
