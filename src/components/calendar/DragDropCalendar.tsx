import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarShift {
  id: string;
  title: string;
  employee: string;
  time: string;
  status: "confirmed" | "pending" | "conflict";
  department: string;
}

export const DragDropCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [draggedShift, setDraggedShift] = useState<CalendarShift | null>(null);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [shifts, setShifts] = useState<Record<string, CalendarShift[]>>({
    Mon: [
      {
        id: "1",
        title: "Morning Sales",
        employee: "John Doe",
        time: "9:00 AM - 5:00 PM",
        status: "confirmed",
        department: "Sales",
      },
      {
        id: "2",
        title: "Evening Support",
        employee: "Sarah Wilson",
        time: "2:00 PM - 10:00 PM",
        status: "pending",
        department: "Support",
      },
    ],
    Tue: [
      {
        id: "3",
        title: "Operations",
        employee: "Mike Chen",
        time: "8:00 AM - 4:00 PM",
        status: "confirmed",
        department: "Operations",
      },
    ],
    Wed: [
      {
        id: "4",
        title: "Sales Shift",
        employee: "Emily Davis",
        time: "10:00 AM - 6:00 PM",
        status: "conflict",
        department: "Sales",
      },
    ],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 border-green-300 text-green-800";
      case "pending":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "conflict":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Sales":
        return "bg-blue-500";
      case "Support":
        return "bg-purple-500";
      case "Operations":
        return "bg-green-500";
      case "Administration":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDragStart = (
    e: React.DragEvent,
    shift: CalendarShift,
    fromDay: string
  ) => {
    setDraggedShift(shift);
    e.dataTransfer.setData("text/plain", JSON.stringify({ shift, fromDay }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toDay: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { shift, fromDay } = data;

    if (fromDay !== toDay) {
      setShifts((prev) => ({
        ...prev,
        [fromDay]: prev[fromDay].filter((s) => s.id !== shift.id),
        [toDay]: [...prev[toDay], shift],
      }));
    }
    setDraggedShift(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Interactive Schedule Calendar
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">Week of Dec 18-24, 2023</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Color Legend */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Status Legend:</h4>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-200 border border-green-300 rounded mr-1"></div>
              Confirmed
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded mr-1"></div>
              Pending
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-200 border border-red-300 rounded mr-1"></div>
              Conflict
            </div>
          </div>
          <h4 className="text-sm font-medium mb-2 mt-3">Departments:</h4>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              Sales
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
              Support
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              Operations
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
              Administration
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, dayIndex) => (
            <div key={day} className="space-y-2">
              <div className="text-center">
                <p className="font-medium text-gray-900">{day}</p>
                <p className="text-sm text-gray-500">Dec {18 + dayIndex}</p>
              </div>
              <div
                className="space-y-2 min-h-[300px] bg-gray-50 rounded-lg p-2 border-2 border-dashed border-gray-200 transition-colors hover:border-gray-300"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                {shifts[day]?.map((shift) => (
                  <div
                    key={shift.id}
                    className={`relative rounded p-2 border-2 text-xs cursor-move transition-all hover:shadow-md ${getStatusColor(
                      shift.status
                    )}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, shift, day)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full ${getDepartmentColor(
                          shift.department
                        )}`}
                      ></div>
                      <p className="font-medium truncate">{shift.title}</p>
                    </div>
                    <p className="text-gray-600 truncate">{shift.employee}</p>
                    <p className="text-gray-500">{shift.time}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {shift.status}
                    </Badge>
                    {shift.status === "conflict" && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
                {shifts[day]?.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">Drop shifts here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            💡 <strong>Tip:</strong> Drag and drop shifts between days to
            reschedule. Red indicators show conflicts that need attention.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
