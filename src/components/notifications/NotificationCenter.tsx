import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "shift_update" | "swap_request" | "upcoming_shift" | "reminder";
  title: string;
  message: string;
  time: string;
  actionable: boolean;
  status?: "pending" | "approved" | "denied";
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "shift_update",
      title: "Shift Assignment",
      message:
        "You have been assigned to Sales Department shift tomorrow 9:00 AM - 5:00 PM",
      time: "2 minutes ago",
      actionable: true,
      status: "pending",
    },
    {
      id: "2",
      type: "swap_request",
      title: "Shift Swap Request",
      message:
        "Sarah Wilson wants to swap her Friday shift with your Saturday shift",
      time: "1 hour ago",
      actionable: true,
      status: "pending",
    },
    {
      id: "3",
      type: "upcoming_shift",
      title: "Upcoming Shift Reminder",
      message: "Your shift starts in 2 hours at Sales Department",
      time: "30 minutes ago",
      actionable: false,
    },
    {
      id: "4",
      type: "reminder",
      title: "Time Clock Reminder",
      message: "Don't forget to clock out when your shift ends",
      time: "1 day ago",
      actionable: false,
    },
  ]);

  const { toast } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case "shift_update":
        return <Clock className="w-4 h-4" />;
      case "swap_request":
        return <Users className="w-4 h-4" />;
      case "upcoming_shift":
        return <Bell className="w-4 h-4" />;
      case "reminder":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "shift_update":
        return "bg-blue-100 text-blue-800";
      case "swap_request":
        return "bg-purple-100 text-purple-800";
      case "upcoming_shift":
        return "bg-green-100 text-green-800";
      case "reminder":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = (
    notificationId: string,
    action: "confirm" | "approve" | "deny" | "snooze"
  ) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId
          ? {
              ...notif,
              status:
                action === "confirm" || action === "approve"
                  ? "approved"
                  : "denied",
            }
          : notif
      )
    );

    toast({
      title: `Action ${action}`,
      description: `Notification ${action}d successfully`,
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </div>
          <Badge variant="secondary">{notifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1 rounded-full ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {notification.actionable &&
                  notification.status === "pending" && (
                    <div className="flex space-x-2">
                      {notification.type === "shift_update" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleAction(notification.id, "confirm")
                            }
                            className="flex-1"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleAction(notification.id, "deny")
                            }
                            className="flex-1"
                          >
                            Request Change
                          </Button>
                        </>
                      )}
                      {notification.type === "swap_request" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleAction(notification.id, "approve")
                            }
                            className="flex-1"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleAction(notification.id, "deny")
                            }
                            className="flex-1"
                          >
                            Deny
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAction(notification.id, "snooze")}
                      >
                        Snooze
                      </Button>
                    </div>
                  )}

                {notification.status && notification.status !== "pending" && (
                  <Badge
                    variant={
                      notification.status === "approved"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {notification.status === "approved"
                      ? "Confirmed"
                      : "Declined"}
                  </Badge>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
