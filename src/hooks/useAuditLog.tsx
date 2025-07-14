import { useAuth } from "@/hooks/useAuth";

interface AuditLogEntry {
  action: "create" | "update" | "delete" | "view";
  resource: string;
  resourceId: string;
  details: string;
}

export const useAuditLog = () => {
  const { user } = useAuth();

  const logAction = async (entry: AuditLogEntry) => {
    if (!user) return;

    const auditEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      ipAddress: "192.168.1.100", // In real app, get from request
      userAgent: navigator.userAgent,
    };

    // In a real application, this would send to your backend
    console.log("Audit Log Entry:", auditEntry);

    // Store in localStorage for demo purposes
    const existingLogs = JSON.parse(localStorage.getItem("auditLogs") || "[]");
    existingLogs.unshift(auditEntry);
    localStorage.setItem(
      "auditLogs",
      JSON.stringify(existingLogs.slice(0, 100))
    ); // Keep last 100 entries
  };

  return { logAction };
};
