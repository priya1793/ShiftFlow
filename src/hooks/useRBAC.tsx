import { useAuth, UserRole } from "@/contexts/AuthContext";

export type Permission =
  | "schedule.view"
  | "schedule.create"
  | "schedule.edit"
  | "schedule.delete"
  | "team.view"
  | "team.manage"
  | "reports.view"
  | "reports.export"
  | "emergency.broadcast"
  | "audit.view"
  | "settings.manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  staff: ["schedule.view", "team.view"],
  manager: [
    "schedule.view",
    "schedule.create",
    "schedule.edit",
    "team.view",
    "team.manage",
    "reports.view",
    "reports.export",
    "emergency.broadcast",
  ],
  admin: [
    "schedule.view",
    "schedule.create",
    "schedule.edit",
    "schedule.delete",
    "team.view",
    "team.manage",
    "reports.view",
    "reports.export",
    "emergency.broadcast",
    "audit.view",
    "settings.manage",
  ],
};

export const useRBAC = () => {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  const getPermissions = (): Permission[] => {
    if (!user) return [];
    return rolePermissions[user.role] || [];
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissions,
    userRole: user?.role,
  };
};
