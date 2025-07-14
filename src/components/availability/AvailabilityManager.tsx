import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";
import { useAuditLog } from "@/hooks/useAuditLog";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  available: boolean;
  timeSlots: TimeSlot[];
}

export const AvailabilityManager = () => {
  const [availability, setAvailability] = useState<
    Record<string, DayAvailability>
  >({
    monday: { available: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    tuesday: { available: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    wednesday: {
      available: true,
      timeSlots: [{ start: "09:00", end: "17:00" }],
    },
    thursday: {
      available: true,
      timeSlots: [{ start: "09:00", end: "17:00" }],
    },
    friday: { available: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    saturday: { available: false, timeSlots: [] },
    sunday: { available: false, timeSlots: [] },
  });

  const { logAction } = useAuditLog();
  const { toast } = useToast();

  const conflicts = [
    {
      day: "Wednesday",
      time: "2:00 PM - 6:00 PM",
      reason: "Shift scheduled during unavailable time",
    },
    {
      day: "Friday",
      time: "5:00 PM - 9:00 PM",
      reason: "Extends beyond available hours",
    },
  ];

  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDayAvailability = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
        timeSlots: !prev[day].available
          ? [{ start: "09:00", end: "17:00" }]
          : [],
      },
    }));
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const saveAvailability = async () => {
    console.log("Saving availability:", availability);

    await logAction({
      action: "update",
      resource: "availability",
      resourceId: "user_availability",
      details: "Updated weekly availability preferences",
    });

    toast({
      title: "Availability Updated",
      description: "Your availability preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Weekly Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dayNames.map((day, index) => (
            <div key={day} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-medium">
                  {dayLabels[index]}
                </Label>
                <Switch
                  checked={availability[day].available}
                  onCheckedChange={() => toggleDayAvailability(day)}
                />
              </div>

              {availability[day].available && (
                <div className="space-y-2">
                  {availability[day].timeSlots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          updateTimeSlot(
                            day,
                            slotIndex,
                            "start",
                            e.target.value
                          )
                        }
                        className="w-32"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          updateTimeSlot(day, slotIndex, "end", e.target.value)
                        }
                        className="w-32"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Button onClick={saveAvailability} className="w-full">
            Save Availability
          </Button>
        </CardContent>
      </Card>

      {conflicts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Schedule Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conflicts.map((conflict, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{conflict.day}</p>
                    <p className="text-sm text-gray-600">{conflict.time}</p>
                    <p className="text-sm text-orange-600">{conflict.reason}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-orange-600 border-orange-200"
                  >
                    Conflict
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
