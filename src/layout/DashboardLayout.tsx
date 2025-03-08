'use client';

import { DashboardNavbar } from '@/components/DashboardNavbar';
import { Drawer } from '@/components/Drawer';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { HTMLAttributes, useEffect, useState } from 'react';

export default function DashboardLayout({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);

  const { windowWidth } = useWindowWidth();

  useEffect(() => {
    if (windowWidth >= 1200) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [windowWidth]);

  return (
    <div className={'h-screen flex flex-col'}>
      <Drawer open={open} onClose={() => setOpen(false)} />
      <DashboardNavbar toggleDrawer={() => setOpen(!open)} />
      <div className={'max-h-full flex-1 overflow-auto transition-all ' + (open ? 'md:pl-72' : '')}>
        <div {...props} className={'p-4 h-full ' + className}>
          {children}
        </div>
      </div>
    </div>
  );
}
