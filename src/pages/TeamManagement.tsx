import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Settings, Check, X } from "lucide-react";
import { AddTeamMemberForm } from "@/components/team/AddTeamMemberForm";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useAuditLog } from "@/hooks/useAuditLog";
import { toast } from "@/hooks/use-toast";

const TeamManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: "shift_swap",
      employee: "John Doe",
      details: "Wants to swap Dec 25 evening shift with Sarah",
      date: "2024-12-20",
    },
    {
      id: 2,
      type: "time_off",
      employee: "Emily Davis",
      details: "Requesting 3 days off for family vacation",
      date: "2024-12-18",
    },
    {
      id: 3,
      type: "overtime",
      employee: "Mike Chen",
      details: "Requesting overtime approval for last week",
      date: "2024-12-17",
    },
  ]);

  const { executeWithRateLimit } = useRateLimit({
    maxRequests: 3,
    windowMs: 60000,
    message: "Too many team management requests. Please wait a minute.",
  });

  const { logAction } = useAuditLog();

  const mockTeamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "staff",
      department: "Sales",
      status: "active",
      email: "john@company.com",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "manager",
      department: "Support",
      status: "active",
      email: "sarah@company.com",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "staff",
      department: "Operations",
      status: "active",
      email: "mike@company.com",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "staff",
      department: "Sales",
      status: "on_leave",
      email: "emily@company.com",
    },
  ];

  const handleAddTeamMember = async () => {
    await executeWithRateLimit(async () => {
      setShowAddForm(true);
    });
  };

  const handleApproval = async (
    approvalId: number,
    action: "approve" | "deny"
  ) => {
    const approval = pendingApprovals.find((a) => a.id === approvalId);
    if (!approval) return;

    await logAction({
      action: "update",
      resource: "approval",
      resourceId: approvalId.toString(),
      details: `${action === "approve" ? "Approved" : "Denied"} ${
        approval.type
      } request from ${approval.employee}`,
    });

    setPendingApprovals(pendingApprovals.filter((a) => a.id !== approvalId));

    toast({
      title: `Request ${action === "approve" ? "Approved" : "Denied"}`,
      description: `${approval.employee}'s ${approval.type.replace(
        "_",
        " "
      )} request has been ${action === "approve" ? "approved" : "denied"}.`,
    });
  };

  const handleFillShifts = async () => {
    await logAction({
      action: "create",
      resource: "shift_fill",
      resourceId: "auto_fill_" + Date.now(),
      details: "Automatically filled open shifts using availability data",
    });

    toast({
      title: "Shifts Filled",
      description:
        "Open shifts have been automatically filled based on employee availability.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Team Management
            </h1>
            <p className="text-gray-600">
              Manage your team members and their roles
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleFillShifts}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Fill Shifts
            </Button>
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleAddTeamMember}
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <AddTeamMemberForm onClose={() => setShowAddForm(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Pending Approvals ({pendingApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium">{approval.employee}</span>
                        <Badge variant="outline" className="text-xs w-fit">
                          {approval.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {approval.details}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {approval.date}
                      </p>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Button
                        size="sm"
                        onClick={() => handleApproval(approval.id, "approve")}
                        className="flex-1 sm:flex-none"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApproval(approval.id, "deny")}
                        className="flex-1 sm:flex-none"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                  {member.name}
                  <Badge
                    variant={
                      member.status === "active" ? "default" : "secondary"
                    }
                  >
                    {member.status.replace("_", " ")}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Role:</span> {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span>{" "}
                    {member.department}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {member.email}
                  </p>
                  <div className="flex space-x-2 pt-3">
                    <Link to={`/team/edit/${member.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Team Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-blue-600">4</p>
                <p className="text-sm text-gray-600">Total Members</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-green-600">
                  3
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-orange-600">
                  1
                </p>
                <p className="text-sm text-gray-600">On Leave</p>
              </div>
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold text-purple-600">
                  2
                </p>
                <p className="text-sm text-gray-600">Managers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TeamManagement;
