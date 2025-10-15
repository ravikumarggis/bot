"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Home,
  Calendar,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { IconCurrency, IconExchange, IconHistory } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { toast } from "sonner";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = () => {
    deleteCookie("token");
    toast.success("Logout successfully");
    router.replace("/login");
  };

  // Nav items for desktop view
  const navItems = [
    { label: "Dashboard", path: "/dashboard/home", Icon: Home, type: "link" },
    {
      label: "Exchange",
      path: "/dashboard/exchange",
      Icon: IconExchange,
      type: "link",
    },
    {
      label: "Pricing",
      path: "/dashboard/pricing",
      Icon: IconCurrency,
      type: "link",
    },
    {
      label: "Plan Management",
      path: "/dashboard/plan-management",
      Icon: Calendar,
      type: "link",
    },
    {
      label: "Transaction",
      path: "/dashboard/transaction",
      Icon: IconHistory,
      type: "link",
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      Icon: Settings2,
      type: "link",
    },
    { label: "Logout", Icon: LogOut, type: "button", onClick: logoutHandler }, // no path since it's a button
  ];

  // Nav items for mobile view (subset, based on your original code)
  const mobileNavItems = [
    { label: "Dashboard", path: "/dashboard/home", Icon: Home, type: "link" },
    {
      label: "Settings",
      path: "/dashboard/settings",
      Icon: Settings,
      type: "link",
    },
    { label: "Logout", Icon: LogOut, type: "button", onClick: logoutHandler },
  ];

  const isActive = (path) =>
    pathname === path ? "bg-primary text-white" : "text-gray-300";

  return (
    <>
      <div className="hidden md:flex flex-col bg-gray-800 border-r border-gray-700 w-64 min-h-screen p-5">
        <h2 className="text-2xl font-semibold mb-10 text-primary">My App</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ label, path, Icon, type, onClick }) => {
            if (type === "link") {
              return (
                <Link
                  key={label}
                  href={path}
                  className={`flex items-center gap-3 p-2 rounded-md transition ${isActive(
                    path
                  )}`}
                >
                  <Icon /> {label}
                </Link>
              );
            } else if (type === "button") {
              return (
                <button
                  key={label}
                  className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md mt-auto"
                  onClick={() => {
                    if (onClick) {
                      onClick();
                    }
                  }}
                >
                  <Icon /> {label}
                </button>
              );
            }
          })}
        </nav>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 bg-purple-600 p-2 rounded-lg z-1000"
      >
        <LayoutDashboard size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          <div className="bg-gray-800 w-64 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-primary">My App</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {mobileNavItems.map(({ label, path, Icon, type }) => {
                if (type === "link") {
                  return (
                    <Link
                      key={label}
                      href={path}
                      className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon /> {label}
                    </Link>
                  );
                } else if (type === "button") {
                  return (
                    <button
                      key={label}
                      className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md mt-auto"
                    >
                      <Icon /> {label}
                    </button>
                  );
                }
              })}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}
