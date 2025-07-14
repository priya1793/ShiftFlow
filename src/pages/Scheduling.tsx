import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Users, AlertTriangle } from "lucide-react";
import { EmergencyBroadcast } from "@/components/scheduling/EmergencyBroadcast";
import { CreateShiftForm } from "@/components/scheduling/CreateShiftForm";
import { AvailabilityManager } from "@/components/availability/AvailabilityManager";
import { DragDropCalendar } from "@/components/calendar/DragDropCalendar";
import { useRBAC } from "@/hooks/useRBAC";
import { useRateLimit } from "@/hooks/useRateLimit";

const Scheduling = () => {
  const [currentView, setCurrentView] = useState<"week" | "month">("week");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { hasPermission } = useRBAC();
  const { executeWithRateLimit } = useRateLimit({
    maxRequests: 5,
    windowMs: 60000,
    message: "Too many scheduling requests. Please wait a minute.",
  });

  const handleCreateShift = async () => {
    await executeWithRateLimit(async () => {
      setShowCreateForm(true);
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Schedule Management
            </h1>
            <p className="text-gray-600">Manage shifts and assignments</p>
          </div>
          <div className="flex space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={currentView === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("week")}
              >
                Week
              </Button>
              <Button
                variant={currentView === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("month")}
              >
                Month
              </Button>
            </div>
            {hasPermission("schedule.create") && (
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button onClick={handleCreateShift}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Shift
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <CreateShiftForm onClose={() => setShowCreateForm(false)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            {hasPermission("emergency.broadcast") && (
              <TabsTrigger value="emergency">Emergency Broadcast</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <DragDropCalendar />

            {/* Shift Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shift Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Morning Shift",
                        time: "6:00 AM - 2:00 PM",
                        departments: ["Operations", "Sales"],
                      },
                      {
                        name: "Afternoon Shift",
                        time: "2:00 PM - 10:00 PM",
                        departments: ["Sales", "Support"],
                      },
                      {
                        name: "Night Shift",
                        time: "10:00 PM - 6:00 AM",
                        departments: ["Security", "Maintenance"],
                      },
                    ].map((template, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {template.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {template.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            {template.departments.join(", ")}
                          </p>
                        </div>
                        {hasPermission("schedule.create") && (
                          <Button variant="outline" size="sm">
                            Use
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        action: "Shift created",
                        user: "Mike Chen",
                        time: "2 hours ago",
                      },
                      {
                        action: "Shift swap approved",
                        user: "Sarah Wilson",
                        time: "4 hours ago",
                      },
                      {
                        action: "Schedule published",
                        user: "Admin",
                        time: "1 day ago",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityManager />
          </TabsContent>

          {hasPermission("emergency.broadcast") && (
            <TabsContent value="emergency">
              <EmergencyBroadcast />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Scheduling;
