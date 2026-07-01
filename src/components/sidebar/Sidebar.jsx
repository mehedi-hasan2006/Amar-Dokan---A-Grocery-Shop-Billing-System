"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBarChart2,
  FiUsers,
  FiFileText,
  FiSettings,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronDown,
  FiList,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { DollarSign } from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: FiGrid,
    href: "/dashboard",
  },
  {
    id: "products",
    title: "Products",
    icon: FiList,
    href: "/products",
  },
  {
    id: "addProduct",
    title: "Add Products",
    icon: FaPlus,
    href: "/add-product",
  },
  {
    id: "payments",
    title: "Payments",
    icon: DollarSign,
    href: "/payments",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: FiBarChart2,
    href: "/analytics",
    subItems: [
      { id: "overview", title: "Overview", href: "/analytics/overview" },
      {
        id: "sellReports",
        title: "Sell Reports",
        href: "/analytics/sell-reports",
      },
      {
        id: "invoiceList",
        title: "Invoice Reports",
        href: "/analytics/invoice-reports",
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: FiUsers,
    href: "/users",
    subItems: [
      { id: "all-users", title: "All Users", href: "/users/all-users" },
      { id: "roles", title: "Roles", href: "/users/roles" },
      { id: "permissions", title: "Permissions", href: "/users/permissions" },
      { id: "addUser", title: "Add User", href: "/users/add-user" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: FiSettings,
    href: "/settings",
  },
];

export default function Sidebar({ className = "" }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(["analytics", "users"]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const session = authClient.useSession();
  const user = session?.data?.user;

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isSubItemActive = (subItems = []) => {
    return subItems.some((subItem) => pathname === subItem.href);
  };

  return (
    <div className={` min-h-screen ${className}`}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" border-r border-slate-200/20 bg-white/80 backdrop-blur-md dark:border-slate-700/30 dark:bg-black/40"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200/20 px-4 dark:border-slate-700/30">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Link href="/dashboard">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-500 cursor-pointer">
                    <span className="text-lg font-bold text-white">A</span>
                  </div>
                </Link>
                <Link href="/dashboard">
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 cursor-pointer">
                    Admin
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <FiChevronLeft
              className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isExpanded = expandedItems.includes(item.id);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const hasActiveSubItem =
                hasSubItems && isSubItemActive(item.subItems);

              return (
                <div key={item.id}>
                  {hasSubItems ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className={`group relative flex w-full items-center rounded-lg transition-all duration-200 ${
                          active || hasActiveSubItem
                            ? "bg-blue-50/80 text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-400"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                        } ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}`}
                      >
                        {/* Active indicator */}
                        {(active || hasActiveSubItem) && !isCollapsed && (
                          <motion.div
                            layoutId="sidebarActiveTab"
                            className="absolute inset-0 rounded-lg bg-blue-50/80 backdrop-blur-sm dark:bg-blue-500/10"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}

                        <div className="relative z-10 flex items-center gap-3">
                          <Icon
                            className={`h-5 w-5 shrink-0 transition-colors ${
                              active || hasActiveSubItem
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
                            }`}
                          />

                          <AnimatePresence mode="wait">
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="font-medium whitespace-nowrap"
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Expand arrow */}
                        {!isCollapsed && (
                          <FiChevronDown
                            className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Sub items */}
                      <AnimatePresence>
                        {hasSubItems && isExpanded && !isCollapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-9 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.href}
                                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                                  pathname === subItem.href
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`group relative flex w-full items-center rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-blue-50/80 text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-400"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                      } ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}`}
                    >
                      {/* Active indicator */}
                      {active && !isCollapsed && (
                        <motion.div
                          layoutId="sidebarActiveTab"
                          className="absolute inset-0 rounded-lg bg-blue-50/80 backdrop-blur-sm dark:bg-blue-500/10"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            active
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
                          }`}
                        />

                        <AnimatePresence mode="wait">
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="font-medium whitespace-nowrap"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* User profile */}
        <div className="border-t border-slate-200/20 p-3 dark:border-slate-700/30">
          <Link href="#">
            <div
              className={`flex items-center rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <Avatar className="ring-2 ring-blue-500 ring-offset-2 group-hover:ring-purple-500 transition-all duration-300">
                <Avatar.Image alt={user?.name || "User"} src={user?.image} />
                <Avatar.Fallback className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold">
                  {user?.name?.charAt(0) || "U"}
                </Avatar.Fallback>
              </Avatar>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-hidden"
                  >
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                      {user?.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </div>
      </motion.aside>
    </div>
  );
}
