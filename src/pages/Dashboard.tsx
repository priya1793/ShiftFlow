import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRBAC } from "@/hooks/useRBAC";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { DragDropCalendar } from "@/components/calendar/DragDropCalendar";

const Dashboard = () => {
  const { user } = useAuth();
  const { hasPermission } = useRBAC();

  // Staff Dashboard Content
  const StaffDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DragDropCalendar />
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Shift</p>
                <p className="text-lg font-bold text-gray-900">
                  9:00 AM - 5:00 PM
                </p>
                <p className="text-xs text-blue-600">Sales Department</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours This Week</p>
                <p className="text-lg font-bold text-gray-900">32.5 / 40</p>
                <p className="text-xs text-green-600">On track</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available PTO</p>
                <p className="text-lg font-bold text-gray-900">12 days</p>
                <p className="text-xs text-gray-500">Until Dec 31</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Upcoming Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                date: "Tomorrow",
                time: "9:00 AM - 5:00 PM",
                department: "Sales",
              },
              {
                date: "Dec 20",
                time: "10:00 AM - 6:00 PM",
                department: "Sales",
              },
              {
                date: "Dec 21",
                time: "9:00 AM - 5:00 PM",
                department: "Sales",
              },
            ].map((shift, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{shift.date}</p>
                  <p className="text-sm text-gray-600">{shift.time}</p>
                </div>
                <span className="text-sm text-blue-600">
                  {shift.department}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Manager/Admin Dashboard Content
  const ManagerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DragDropCalendar />
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-xs text-green-600">2 on shift now</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Shifts</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-orange-600">Need coverage</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-xs text-green-600">Above target</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-blue-600">Need approval</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Open Shifts Requiring Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "Today",
                  time: "2:00 PM - 10:00 PM",
                  department: "Support",
                },
                {
                  date: "Tomorrow",
                  time: "6:00 AM - 2:00 PM",
                  department: "Operations",
                },
                {
                  date: "Dec 20",
                  time: "10:00 PM - 6:00 AM",
                  department: "Security",
                },
              ].map((shift, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{shift.date}</p>
                    <p className="text-sm text-gray-600">
                      {shift.time} • {shift.department}
                    </p>
                  </div>
                  <Button size="sm">Fill Shift</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  type: "Time Off",
                  employee: "Sarah Wilson",
                  date: "Dec 25-26",
                  status: "pending",
                },
                {
                  type: "Shift Swap",
                  employee: "Mike Chen",
                  date: "Dec 22",
                  status: "pending",
                },
                {
                  type: "Schedule Change",
                  employee: "Emily Davis",
                  date: "Dec 21",
                  status: "pending",
                },
              ].map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{request.type}</p>
                    <p className="text-sm text-gray-600">
                      {request.employee} • {request.date}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Deny
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === "staff" ? "My Dashboard" : "Management Dashboard"}
          </h1>
          <p className="text-gray-600">
            {user?.role === "staff"
              ? "View your schedule and track your time"
              : "Overview of team performance and pending tasks"}
          </p>
        </div>

        {user?.role === "staff" ? <StaffDashboard /> : <ManagerDashboard />}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
