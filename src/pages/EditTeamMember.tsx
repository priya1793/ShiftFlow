import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuditLog } from "@/hooks/useAuditLog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  ArrowLeft,
} from "lucide-react";

const EditTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logAction } = useAuditLog();

  // Mock data - in real app would fetch based on ID
  const [memberData, setMemberData] = useState({
    id: id || "1",
    name: "John Doe",
    email: "john@company.com",
    role: "staff",
    department: "Sales",
    status: "active",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    hireDate: "2023-01-15",
    hourlyRate: "18.50",
    emergencyContact: "Jane Doe - (555) 987-6543",
  });

  const [recentShifts] = useState([
    {
      date: "2024-12-20",
      shift: "Morning (9AM-5PM)",
      hours: 8,
      status: "completed",
    },
    {
      date: "2024-12-19",
      shift: "Afternoon (2PM-10PM)",
      hours: 8,
      status: "completed",
    },
    {
      date: "2024-12-18",
      shift: "Morning (9AM-5PM)",
      hours: 7.5,
      status: "completed",
    },
    {
      date: "2024-12-17",
      shift: "Evening (6PM-12AM)",
      hours: 6,
      status: "no-show",
    },
  ]);

  const handleSave = async () => {
    await logAction({
      action: "update",
      resource: "team_member",
      resourceId: memberData.id,
      details: `Updated team member: ${memberData.name}`,
    });

    toast({
      title: "Team Member Updated",
      description: "The team member information has been successfully updated.",
    });
  };

  const handleStatusChange = async (newStatus: string) => {
    setMemberData({ ...memberData, status: newStatus });

    await logAction({
      action: "update",
      resource: "team_member",
      resourceId: memberData.id,
      details: `Changed status to ${newStatus} for ${memberData.name}`,
    });

    toast({
      title: "Status Updated",
      description: `Team member status changed to ${newStatus}.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/team")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
              {memberData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {memberData.name}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant={
                  memberData.status === "active" ? "default" : "secondary"
                }
              >
                {memberData.status.replace("_", " ")}
              </Badge>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600 capitalize">
                {memberData.role}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{memberData.department}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={memberData.name}
                      onChange={(e) =>
                        setMemberData({ ...memberData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={memberData.email}
                      onChange={(e) =>
                        setMemberData({ ...memberData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={memberData.phone}
                      onChange={(e) =>
                        setMemberData({ ...memberData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={memberData.role}
                      onValueChange={(value) =>
                        setMemberData({ ...memberData, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={memberData.department}
                      onValueChange={(value) =>
                        setMemberData({ ...memberData, department: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Administration">
                          Administration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={memberData.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={memberData.address}
                    onChange={(e) =>
                      setMemberData({ ...memberData, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hireDate">Hire Date</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={memberData.hireDate}
                      onChange={(e) =>
                        setMemberData({
                          ...memberData,
                          hireDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={memberData.hourlyRate}
                      onChange={(e) =>
                        setMemberData({
                          ...memberData,
                          hourlyRate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={memberData.emergencyContact}
                    onChange={(e) =>
                      setMemberData({
                        ...memberData,
                        emergencyContact: e.target.value,
                      })
                    }
                  />
                </div>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Shifts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentShifts.map((shift, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{shift.date}</p>
                        <p className="text-sm text-gray-600">{shift.shift}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{shift.hours}h</p>
                        <Badge
                          variant={
                            shift.status === "completed"
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {shift.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-gray-600">Shifts This Month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-sm text-gray-600">Performance Rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Send Email Notifications</p>
                    <p className="text-sm text-gray-600">
                      Employee will receive shift updates via email
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Reminders</p>
                    <p className="text-sm text-gray-600">
                      Send SMS reminders for upcoming shifts
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Shift Swaps</p>
                    <p className="text-sm text-gray-600">
                      Employee can request shift swaps with colleagues
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EditTeamMember;
