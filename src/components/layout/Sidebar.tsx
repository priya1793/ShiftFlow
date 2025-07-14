import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRBAC } from "@/hooks/useRBAC";
import { Calendar, Clock, Users, FileText, User, Settings } from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Calendar,
    roles: ["admin", "manager", "staff"],
  },
  {
    name: "Scheduling",
    href: "/scheduling",
    icon: Calendar,
    roles: ["admin", "manager", "staff"],
  },
  {
    name: "Time Tracking",
    href: "/time-tracking",
    icon: Clock,
    roles: ["admin", "manager", "staff"],
  },
  {
    name: "Team Management",
    href: "/team",
    icon: Users,
    roles: ["admin", "manager"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    roles: ["admin", "manager"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "manager", "staff"],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 h-screen  bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">ShiftFlow</h1>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
