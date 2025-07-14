import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvailableStaff {
  id: string;
  name: string;
  department: string;
  isOnline: boolean;
  distance?: number;
}

export const EmergencyBroadcast = () => {
  const [broadcastData, setBroadcastData] = useState({
    shiftDate: "",
    startTime: "",
    endTime: "",
    department: "",
    urgency: "medium",
    message: "",
    incentive: "",
  });
  const [availableStaff] = useState<AvailableStaff[]>([
    {
      id: "1",
      name: "John Smith",
      department: "Operations",
      isOnline: true,
      distance: 2.3,
    },
    {
      id: "2",
      name: "Sarah Wilson",
      department: "Support",
      isOnline: false,
      distance: 5.1,
    },
    {
      id: "3",
      name: "Mike Chen",
      department: "Sales",
      isOnline: true,
      distance: 1.8,
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleBroadcast = async () => {
    setIsSending(true);

    // Simulate broadcast sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Emergency Broadcast Sent",
      description: `Broadcast sent to ${availableStaff.length} available staff members`,
    });

    setIsSending(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Emergency Shift Broadcast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shiftDate">Shift Date</Label>
              <Input
                id="shiftDate"
                type="date"
                value={broadcastData.shiftDate}
                onChange={(e) =>
                  setBroadcastData({
                    ...broadcastData,
                    shiftDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={broadcastData.startTime}
                onChange={(e) =>
                  setBroadcastData({
                    ...broadcastData,
                    startTime: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={broadcastData.endTime}
                onChange={(e) =>
                  setBroadcastData({
                    ...broadcastData,
                    endTime: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select
                value={broadcastData.department}
                onValueChange={(value) =>
                  setBroadcastData({ ...broadcastData, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select
                value={broadcastData.urgency}
                onValueChange={(value) =>
                  setBroadcastData({ ...broadcastData, urgency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Broadcast Message</Label>
            <Textarea
              id="message"
              placeholder="Describe the emergency shift details..."
              value={broadcastData.message}
              onChange={(e) =>
                setBroadcastData({ ...broadcastData, message: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="incentive">Incentive (Optional)</Label>
            <Input
              id="incentive"
              placeholder="e.g., $5/hour bonus, Extra PTO day"
              value={broadcastData.incentive}
              onChange={(e) =>
                setBroadcastData({
                  ...broadcastData,
                  incentive: e.target.value,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Available Staff ({availableStaff.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableStaff.map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={staff.isOnline ? "default" : "secondary"}>
                    {staff.isOnline ? "Online" : "Offline"}
                  </Badge>
                  {staff.distance && (
                    <span className="text-sm text-gray-500">
                      {staff.distance}km away
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleBroadcast}
            disabled={isSending}
            className="w-full mt-4"
          >
            {isSending ? (
              <>Sending Broadcast...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Emergency Broadcast
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
