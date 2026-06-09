'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navdata = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      {/* Sticky Top Navbar with Glassmorphism */}
      <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link href="/" className="font-extrabold text-2xl tracking-tight text-foreground hover:text-blue-600 transition-colors">
                Bhaskar<span className="text-blue-600">.</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navdata.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-semibold text-foreground/80 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button (Hamburger) */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-7 w-7" />
              </button>
            </div>
            
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        {/* Dark overlay backdrop */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex justify-end">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground shadow-2xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-foreground/10">
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 rounded-md p-2 text-foreground/70 hover:text-foreground transition-colors focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="px-6 py-6 space-y-6">
              <div className="flex flex-col space-y-4">
                {navdata.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)} // Close menu on click
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground/90 hover:bg-foreground/5 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}