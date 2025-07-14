import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar } from "lucide-react";

const TimeTracking = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
  };

  const timeEntries = [
    {
      date: "Today",
      clockIn: "9:00 AM",
      clockOut: "In Progress",
      hours: "3.5",
      location: "Main Office",
    },
    {
      date: "Yesterday",
      clockIn: "8:30 AM",
      clockOut: "5:15 PM",
      hours: "8.75",
      location: "Main Office",
    },
    {
      date: "Dec 20",
      clockIn: "9:15 AM",
      clockOut: "6:00 PM",
      hours: "8.75",
      location: "Remote",
    },
    {
      date: "Dec 19",
      clockIn: "8:45 AM",
      clockOut: "5:30 PM",
      hours: "8.75",
      location: "Main Office",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600">
            Track your work hours and manage time entries
          </p>
        </div>

        {/* Clock In/Out Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-gray-600">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    isClockedIn
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      isClockedIn ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                  {isClockedIn ? "Clocked In" : "Clocked Out"}
                </div>
                {isClockedIn && (
                  <p className="text-sm text-gray-600 mt-2">
                    Started at 9:00 AM • 3.5 hours logged
                  </p>
                )}
              </div>

              <Button
                onClick={handleClockInOut}
                size="lg"
                className={`w-full h-12 ${
                  isClockedIn
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                Main Office - Downtown
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Regular Hours
                  </span>
                  <span className="text-lg font-bold text-blue-600">3.5h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Overtime
                  </span>
                  <span className="text-lg font-bold text-gray-600">0h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Break Time
                  </span>
                  <span className="text-lg font-bold text-gray-600">0.5h</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      3.5h
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Time Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Clock In
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Clock Out
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Hours
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timeEntries.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-gray-900">{entry.date}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {entry.clockIn}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        <span
                          className={
                            entry.clockOut === "In Progress"
                              ? "text-green-600 font-medium"
                              : "text-gray-600"
                          }
                        >
                          {entry.clockOut}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {entry.hours}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {entry.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TimeTracking;
