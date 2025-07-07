import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "custom", label: "Custom" },
];

const AddHabit = () => {
  const [frequency, setfrequency] = useState("");
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Habit</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="text">Habit Name</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="text">Description</Label>
              </div>
              <Input id="description" name="description" type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">Frequency</Label>
              <Select
                options={options}
                onChange={(e) => {
                  if (e?.value) {
                    setfrequency(e?.value);
                  }
                }}
              />
            </div>
            {frequency === "custom" && (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="text">Description</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddHabit;
