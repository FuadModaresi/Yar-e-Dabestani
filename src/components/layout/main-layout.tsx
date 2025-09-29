"use client";

import dynamic from 'next/dynamic'

const MainLayoutClient = dynamic(() => import('./main-layout-client'), {
  ssr: false,
})

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MainLayoutClient>{children}</MainLayoutClient>
}
