import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: "create" | "update" | "delete" | "view";
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
}

export const AuditLog = () => {
  const [filters, setFilters] = useState({
    search: "",
    action: "all",
    resource: "all",
    dateRange: "7days",
  });

  // Mock audit data
  const auditEntries: AuditEntry[] = [
    {
      id: "1",
      timestamp: "2024-12-18T10:30:00Z",
      userId: "1",
      userName: "Sarah Johnson",
      action: "create",
      resource: "shift",
      resourceId: "shift_123",
      details: "Created emergency shift for Operations department",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    {
      id: "2",
      timestamp: "2024-12-18T09:15:00Z",
      userId: "2",
      userName: "Mike Chen",
      action: "update",
      resource: "user",
      resourceId: "user_456",
      details: "Updated employee department from Sales to Operations",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
    {
      id: "3",
      timestamp: "2024-12-18T08:45:00Z",
      userId: "3",
      userName: "Emily Davis",
      action: "view",
      resource: "report",
      resourceId: "report_789",
      details: "Accessed weekly attendance report",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
    },
    {
      id: "4",
      timestamp: "2024-12-17T15:20:00Z",
      userId: "1",
      userName: "Sarah Johnson",
      action: "delete",
      resource: "shift",
      resourceId: "shift_456",
      details: "Deleted cancelled shift for December 20th",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    {
      id: "5",
      timestamp: "2024-12-17T11:30:00Z",
      userId: "2",
      userName: "Mike Chen",
      action: "update",
      resource: "team_member",
      resourceId: "user_123",
      details: "Updated John Doe profile information",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
  ];

  // Filter the audit entries based on current filters
  const filteredEntries = useMemo(() => {
    return auditEntries.filter((entry) => {
      const matchesSearch =
        filters.search === "" ||
        entry.userName.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.details.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.resource.toLowerCase().includes(filters.search.toLowerCase());

      const matchesAction =
        filters.action === "all" || entry.action === filters.action;
      const matchesResource =
        filters.resource === "all" || entry.resource === filters.resource;

      // Simple date filtering (in real app would use proper date comparison)
      const matchesDate =
        filters.dateRange === "all" ||
        (filters.dateRange === "7days" &&
          new Date(entry.timestamp) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (filters.dateRange === "30days" &&
          new Date(entry.timestamp) >=
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      return matchesSearch && matchesAction && matchesResource && matchesDate;
    });
  }, [filters, auditEntries]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="w-4 h-4" />;
      case "update":
        return <Edit className="w-4 h-4" />;
      case "delete":
        return <Trash2 className="w-4 h-4" />;
      case "view":
        return <Eye className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "view":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportAuditLog = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Resource", "Details", "IP Address"].join(
        ","
      ),
      ...filteredEntries.map((entry) =>
        [
          entry.timestamp,
          entry.userName,
          entry.action,
          entry.resource,
          `"${entry.details}"`,
          entry.ipAddress,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Audit Log ({filteredEntries.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Input
              placeholder="Search audit entries..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="lg:col-span-2"
            />
            <Select
              value={filters.action}
              onValueChange={(value) =>
                setFilters({ ...filters, action: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="view">View</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.resource}
              onValueChange={(value) =>
                setFilters({ ...filters, resource: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="shift">Shifts</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="team_member">Team Members</SelectItem>
                <SelectItem value="report">Reports</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={exportAuditLog}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Audit Entries */}
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No audit entries found matching your filters.</p>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`p-2 rounded-full ${getActionColor(
                          entry.action
                        )}`}
                      >
                        {getActionIcon(entry.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {entry.userName}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {entry.action}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {entry.resource}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 break-words">
                          {entry.details}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500">
                          <span>
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                          <span className="hidden sm:inline">
                            IP: {entry.ipAddress}
                          </span>
                          <span>ID: {entry.resourceId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
