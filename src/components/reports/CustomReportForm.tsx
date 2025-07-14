import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CustomReportForm = () => {
  const [reportConfig, setReportConfig] = useState({
    type: "",
    dateRange: "last30days",
    startDate: "",
    endDate: "",
    departments: [] as string[],
    metrics: [] as string[],
    format: "pdf",
  });

  const { toast } = useToast();

  const availableMetrics = [
    "Total Hours Worked",
    "Overtime Hours",
    "Attendance Rate",
    "Late Arrivals",
    "Early Departures",
    "Break Duration",
    "Shift Adherence",
  ];

  const departments = ["Sales", "Operations", "Support", "Administration"];

  const toggleDepartment = (dept: string) => {
    setReportConfig((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  const toggleMetric = (metric: string) => {
    setReportConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter((m) => m !== metric)
        : [...prev.metrics, metric],
    }));
  };

  const generateReport = () => {
    console.log("Generating report with config:", reportConfig);

    toast({
      title: "Report Generated",
      description: `Your custom ${reportConfig.type} report is being prepared for download.`,
    });

    // Mock download
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Your report is ready for download.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Custom Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Report Type</Label>
          <Select
            value={reportConfig.type}
            onValueChange={(value) =>
              setReportConfig({ ...reportConfig, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attendance">Attendance Report</SelectItem>
              <SelectItem value="hours">Hours Worked Report</SelectItem>
              <SelectItem value="overtime">Overtime Analysis</SelectItem>
              <SelectItem value="productivity">Productivity Report</SelectItem>
              <SelectItem value="compliance">Compliance Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date Range</Label>
          <Select
            value={reportConfig.dateRange}
            onValueChange={(value) =>
              setReportConfig({ ...reportConfig, dateRange: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {reportConfig.dateRange === "custom" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={reportConfig.startDate}
                onChange={(e) =>
                  setReportConfig({
                    ...reportConfig,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={reportConfig.endDate}
                onChange={(e) =>
                  setReportConfig({ ...reportConfig, endDate: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div>
          <Label className="mb-3 block">Departments</Label>
          <div className="grid grid-cols-2 gap-2">
            {departments.map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={dept}
                  checked={reportConfig.departments.includes(dept)}
                  onCheckedChange={() => toggleDepartment(dept)}
                />
                <Label htmlFor={dept} className="text-sm">
                  {dept}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Metrics to Include</Label>
          <div className="grid grid-cols-1 gap-2">
            {availableMetrics.map((metric) => (
              <div key={metric} className="flex items-center space-x-2">
                <Checkbox
                  id={metric}
                  checked={reportConfig.metrics.includes(metric)}
                  onCheckedChange={() => toggleMetric(metric)}
                />
                <Label htmlFor={metric} className="text-sm">
                  {metric}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Export Format</Label>
          <Select
            value={reportConfig.format}
            onValueChange={(value) =>
              setReportConfig({ ...reportConfig, format: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generateReport} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
};
