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
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuditLog } from "@/hooks/useAuditLog";

export const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    passwordMinLength: "8",
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    sessionTimeout: "480", // 8 hours in minutes
    twoFactorAuth: false,
    loginAttempts: "5",
    lockoutDuration: "30", // minutes
  });

  const { toast } = useToast();
  const { logAction } = useAuditLog();

  const handleSave = async () => {
    console.log("Saving security settings:", settings);

    await logAction({
      action: "update",
      resource: "settings",
      resourceId: "security",
      details: "Updated security settings and password policies",
    });

    toast({
      title: "Security Settings Saved",
      description: "Security policies have been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Password Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    passwordMinLength: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={settings.loginAttempts}
                onChange={(e) =>
                  setSettings({ ...settings, loginAttempts: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  setSettings({ ...settings, sessionTimeout: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="lockoutDuration">
                Account Lockout Duration (minutes)
              </Label>
              <Input
                id="lockoutDuration"
                type="number"
                value={settings.lockoutDuration}
                onChange={(e) =>
                  setSettings({ ...settings, lockoutDuration: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireUppercase">
                  Require Uppercase Letters
                </Label>
                <p className="text-sm text-gray-600">
                  Passwords must contain at least one uppercase letter
                </p>
              </div>
              <Switch
                id="requireUppercase"
                checked={settings.requireUppercase}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireUppercase: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireNumbers">Require Numbers</Label>
                <p className="text-sm text-gray-600">
                  Passwords must contain at least one number
                </p>
              </div>
              <Switch
                id="requireNumbers"
                checked={settings.requireNumbers}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireNumbers: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireSpecialChars">
                  Require Special Characters
                </Label>
                <p className="text-sm text-gray-600">
                  Passwords must contain special characters (!@#$%^&*)
                </p>
              </div>
              <Switch
                id="requireSpecialChars"
                checked={settings.requireSpecialChars}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireSpecialChars: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">
                  Require 2FA for all users
                </p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, twoFactorAuth: checked })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Access Control</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Current RBAC Roles:</p>
            <ul className="text-sm space-y-1">
              <li>
                <span className="font-medium">Admin:</span> Full system access
              </li>
              <li>
                <span className="font-medium">Manager:</span> Team management,
                scheduling, reports
              </li>
              <li>
                <span className="font-medium">Staff:</span> View schedule, track
                time, manage availability
              </li>
            </ul>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Security Settings
        </Button>
      </CardContent>
    </Card>
  );
};
