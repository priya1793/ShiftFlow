import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuditLog } from "@/hooks/useAuditLog";

export const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    companyName: "ShiftFlow Corp",
    timezone: "America/New_York",
    workWeekStart: "monday",
    defaultShiftDuration: "8",
    enableNotifications: true,
    autoApproveShifts: false,
    requireShiftConfirmation: true,
  });

  const { toast } = useToast();
  const { logAction } = useAuditLog();

  const handleSave = async () => {
    console.log("Saving general settings:", settings);

    await logAction({
      action: "update",
      resource: "settings",
      resourceId: "general",
      details: "Updated general application settings",
    });

    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2" />
          General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) =>
                setSettings({ ...settings, timezone: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">
                  Pacific Time
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="workWeekStart">Work Week Starts On</Label>
            <Select
              value={settings.workWeekStart}
              onValueChange={(value) =>
                setSettings({ ...settings, workWeekStart: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="defaultShiftDuration">
              Default Shift Duration (hours)
            </Label>
            <Input
              id="defaultShiftDuration"
              type="number"
              value={settings.defaultShiftDuration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultShiftDuration: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableNotifications">Enable Notifications</Label>
              <p className="text-sm text-gray-600">
                Send email and push notifications for shift updates
              </p>
            </div>
            <Switch
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoApproveShifts">Auto-approve Shifts</Label>
              <p className="text-sm text-gray-600">
                Automatically approve shift assignments without manager review
              </p>
            </div>
            <Switch
              id="autoApproveShifts"
              checked={settings.autoApproveShifts}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoApproveShifts: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="requireShiftConfirmation">
                Require Shift Confirmation
              </Label>
              <p className="text-sm text-gray-600">
                Employees must confirm assigned shifts
              </p>
            </div>
            <Switch
              id="requireShiftConfirmation"
              checked={settings.requireShiftConfirmation}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, requireShiftConfirmation: checked })
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};
