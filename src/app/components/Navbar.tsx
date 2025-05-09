'use client';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';
import { useShoppingCart } from '@/app/providers/ShoppingCartProvider';
import Logo from '@/app/lib/images/logo.png';

const navItems = [
  { label: 'Kolekcje Leshio', href: '/shop' },
  { label: 'Kategorie', href: '/kategorie' },
  { label: 'Kawa', href: '/kawa' },
  { label: 'Outlet', href: '/outlet' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { cart } = useShoppingCart();

  return (
    <nav className="text-black p-4 flex justify-between items-center shadow-lg" style={{ backgroundColor: '#F8F6F2' }}>
      <div className="flex items-center space-x-4">
   
        <Link href="/">
          <Image src={Logo} alt="Leshio Logo" width={120} height={40} className="cursor-pointer" />
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="relative text-lg font-medium text-gray-800 hover:text-black transition">
                {item.label}
                {isActive && <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#1f2937] rounded" />}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex space-x-4 items-center">
    

        <div className="flex space-x-2">
          <Link href="/login">
            <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                          </div>
          </Link>
        </div>
        <Link href="/cart" className="relative flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
{cart.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
              {cart.length}
            </span>
          )}
</Link>
       
      </div>
    </nav>
  );
};
