"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
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
} from "react-icons/fi";
import Image from "next/image";

const Logo = () => (
  <div className="flex items-center justify-center gap-2">
    <div className="relative w-7 h-7">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g clipPath="url(#cs_clip_1_glass)">
          <mask
            id="cs_mask_1_glass"
            style={{ maskType: "alpha" }}
            width="200"
            height="186"
            x="0"
            y="7"
            maskUnits="userSpaceOnUse"
          >
            <path
              fill="#fff"
              d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"
            />
          </mask>
          <g mask="url(#cs_mask_1_glass)">
            <path fill="#fff" d="M200 0H0v200h200V0z" />
            <path fill="url(#paint0_linear_glass)" d="M200 0H0v200h200V0z" />
            <g filter="url(#filter0_f_glass)">
              <path fill="#00D4FF" d="M130 0H69v113h61V0z" />
              <path
                fill="#00FF88"
                fillOpacity="0.35"
                d="M196 91H82v102h114V91z"
              />
              <path
                fill="#FF6B6B"
                fillOpacity="0.74"
                d="M113 80H28v120h85V80z"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_glass"
            width="278"
            height="310"
            x="-27"
            y="-55"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              result="effect1_foregroundBlur_glass"
              stdDeviation="27.5"
            />
          </filter>
          <linearGradient
            id="paint0_linear_glass"
            x1="186.5"
            x2="37"
            y1="37"
            y2="186.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#00FF88" stopOpacity="0.6" />
          </linearGradient>
          <clipPath id="cs_clip_1_glass">
            <path fill="#fff" d="M0 0H200V200H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <span className="font-bold text-lg tracking-wider text-gray-900 dark:text-white">
      আমার দোকান
    </span>
  </div>
);

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm";

    const variantClasses = {
      default:
        "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-gray-800 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:border-gray-700 dark:hover:border-gray-400 shadow-lg hover:shadow-xl",
      ghost:
        "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm",
      glass:
        "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 shadow-2xl hover:shadow-3xl backdrop-blur-md",
    };

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-lg px-3",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-72 rounded-xl shadow-xl bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in-0 zoom-in-95 p-2"
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick }) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
    className="w-full text-left text-zinc-700 dark:text-zinc-300 group flex items-center px-3 py-2.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
    role="menuitem"
  >
    {children}
  </button>
);

const DropdownMenuSeparator = () => (
  <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
);

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const session = authClient.useSession();
  const user = session?.data?.user;

  // Logout Function
  const handleLogout = async () => {
    await authClient.signOut();
  };

  // useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <header className="relative w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="shrink-0">
              <Link href="/" className="text-gray-900 dark:text-white">
                <Logo />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="relative z-10">
              <ul className="flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium relative group transition-all duration-300"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <input
                className="w-64 h-10 pl-10 pr-4 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Search..."
                type="search"
              />
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                size={16}
              />
            </div>

            {/* Login Button */}
            {!user && (
              <Link href="/login">
                <Button
                  variant="glass"
                  size="sm"
                  className="hidden sm:flex cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* User Dropdown */}
            {user && (
              <DropdownMenu
                trigger={
                  <button className="flex items-center cursor-pointer space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitials(user.name)}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.email}
                      </div>
                    </div>
                  </button>
                }
              >
                <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getUserInitials(user?.name)}
                      {/* <Image
                        src={user?.image || getUserInitials(user?.name)}
                        alt={user?.name}
                        width={10}
                        height={10}
                      ></Image> */}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {user.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.email}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Pro Plan
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <FiUser className="mr-3 h-4 w-4 text-zinc-500" />
                      Your Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <FiSettings className="mr-3 h-4 w-4 text-zinc-500" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FiCreditCard className="mr-3 h-4 w-4 text-zinc-500" />
                    Billing & Plans
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />

                <div className="py-1">
                  <DropdownMenuItem>
                    <FiHelpCircle className="mr-3 h-4 w-4 text-zinc-500" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <FiLogOut className="mr-3 h-4 w-4 text-zinc-500" />
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenu>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 cursor-pointer dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="group text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <FiMenu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-600 mt-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
