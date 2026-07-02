"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ShoppingCart } from "lucide-react";
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiSearch,
  FiUser,
  FiSettings,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import logo from "../../public/amar-dokan-logo.png";

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="relative ">
      <Image
        src={logo}
        alt="logo"
        width={60}
        height={60}
        className="w-full h-full"
      />
    </div>
    <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      আমার দোকান
    </span>
  </div>
);

const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 z-50 animate-in fade-in-0 zoom-in-95"
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick, href }) => {
  const Component = href ? Link : "button";
  return (
    <Component
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      role="menuitem"
    >
      {children}
    </Component>
  );
};

const DropdownMenuSeparator = () => (
  <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />
);

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/user-products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const session = authClient.useSession();
  const user = session?.data?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            {user && (
              <Link
                href="/dashboard"
                className="relative p-2.5 rounded-xl  transition-colors cursor-pointer "
              >
                <button className=" cursor-pointer  text-purple-600  flex items-center justify-center font-semibold  ">
                  Dashboard
                </button>
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                className="w-48 lg:w-64 h-10 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                placeholder="Search products..."
                type="search"
              />
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg">
                0
              </span>
            </Link>

            {/* Login Button */}
            {!user && (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            )}

            {/* User Dropdown */}
            {user && (
              <DropdownMenu
                trigger={
                  <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {getUserInitials(user.name)}
                    </div>
                  </button>
                }
              >
                <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getUserInitials(user?.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </div>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                        Pro Plan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <DropdownMenuItem href="/profile">
                    <FiUser className="w-4 h-4" />
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem href="/settings">
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem href="/billing">
                    <FiCreditCard className="w-4 h-4" />
                    Billing & Plans
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />

                <div className="py-1">
                  <DropdownMenuItem href="/help">
                    <FiHelpCircle className="w-4 h-4" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenu>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div className="relative w-5 h-5">
                <FiSun
                  className={`absolute inset-0 w-5 h-5 text-gray-600 dark:text-gray-400 transition-all duration-300 ${
                    theme === "dark"
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <FiMoon
                  className={`absolute inset-0 w-5 h-5 text-gray-600 dark:text-gray-400 transition-all duration-300 ${
                    theme === "dark"
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 py-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  className="block px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
