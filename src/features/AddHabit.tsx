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
import useHabitQuery from "@/hooks/useAddHabbit";
import { HabitObj } from "@/utils/constants";
import moment from "moment";

import { useRef, useState } from "react";
import Select from "react-select";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "custom", label: "Custom" },
];

const AddHabit = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [habitObj, setHabitObj] = useState(HabitObj);
  const habitQuery = useHabitQuery("habit");

  const handleChange = (e: any) => {
    if (e?.target) {
      setHabitObj({
        ...habitObj,
        [e.target.name]: e.target.value,
      });
    } else if (e?.value) {
      setHabitObj({
        ...habitObj,
        frequency: e.value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    habitQuery.addHabit({
      ...habitObj,
      createdAt: moment().format().slice(0, 10),
    });
    setHabitObj(HabitObj);
  };

  const handleAddClick = () => {
    formRef.current?.requestSubmit();
  };
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle>Add Habit</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                onChange={handleChange}
                value={habitObj.name}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <Input
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                value={habitObj.description}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <Select
                id="frequency"
                options={options}
                onChange={handleChange}
                isClearable
                required
                value={
                  options.filter(
                    (option) => option.value === habitObj.frequency
                  )[0]
                }
                
              />
            </div>
            {/* {frequency === "custom" && (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="text">Description</Label>
                </div>
                <Input id="password" type="password" required onChange={handleChange}/>
              </div>
            )} */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          onClick={() => handleAddClick()}
          className="w-full"
        >
          Add Habit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddHabit;
