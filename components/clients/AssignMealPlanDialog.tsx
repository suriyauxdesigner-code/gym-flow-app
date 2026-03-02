"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Salad } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAN_TYPES = [
  "Weight Loss Diet",
  "Muscle Gain Diet",
  "Maintenance Plan",
  "Custom Plan",
] as const;

type PlanType = (typeof PLAN_TYPES)[number];

interface MacroDefaults {
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

interface MealDefaults {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

const PLAN_MACRO_DEFAULTS: Record<PlanType, MacroDefaults> = {
  "Weight Loss Diet": {
    calories: "1500",
    protein: "140",
    carbs: "120",
    fats: "45",
  },
  "Muscle Gain Diet": {
    calories: "3000",
    protein: "220",
    carbs: "320",
    fats: "85",
  },
  "Maintenance Plan": {
    calories: "2100",
    protein: "160",
    carbs: "220",
    fats: "65",
  },
  "Custom Plan": { calories: "", protein: "", carbs: "", fats: "" },
};

const PLAN_MEAL_DEFAULTS: Record<PlanType, MealDefaults> = {
  "Weight Loss Diet": {
    breakfast: "Greek yogurt with berries and granola",
    lunch: "Grilled chicken salad with olive oil dressing",
    snack: "Apple with almond butter",
    dinner: "Baked salmon with steamed broccoli and quinoa",
  },
  "Muscle Gain Diet": {
    breakfast: "5 scrambled eggs, oats with banana and honey",
    lunch: "Beef stir-fry with brown rice and vegetables",
    snack: "Protein shake with milk and peanut butter",
    dinner: "Grilled chicken thighs with sweet potato and mixed veg",
  },
  "Maintenance Plan": {
    breakfast: "Whole grain toast with avocado and eggs",
    lunch: "Turkey wrap with salad",
    snack: "Mixed nuts and fruit",
    dinner: "Lean beef or chicken with rice and salad",
  },
  "Custom Plan": { breakfast: "", lunch: "", snack: "", dinner: "" },
};

const MEAL_ROWS: { label: string; emoji: string; key: keyof MealDefaults }[] =
  [
    { label: "Breakfast", emoji: "🌅", key: "breakfast" },
    { label: "Lunch", emoji: "☀️", key: "lunch" },
    { label: "Snack", emoji: "🍎", key: "snack" },
    { label: "Dinner", emoji: "🌙", key: "dinner" },
  ];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MealPlanAssignment {
  type: PlanType;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  onAssign: (plan: MealPlanAssignment) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssignMealPlanDialog({
  open,
  onOpenChange,
  clientName,
  onAssign,
}: Props) {
  const [planType, setPlanType] = useState<PlanType | "">("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [meals, setMeals] = useState<MealDefaults>({
    breakfast: "",
    lunch: "",
    snack: "",
    dinner: "",
  });

  const isValid = planType !== "" && calories !== "";

  function selectPlanType(type: PlanType) {
    setPlanType(type);
    const macros = PLAN_MACRO_DEFAULTS[type];
    setCalories(macros.calories);
    setProtein(macros.protein);
    setCarbs(macros.carbs);
    setFats(macros.fats);
    setMeals(PLAN_MEAL_DEFAULTS[type]);
  }

  function updateMeal(key: keyof MealDefaults, value: string) {
    setMeals((prev) => ({ ...prev, [key]: value }));
  }

  function handleAssign() {
    if (!isValid) return;
    onAssign({
      type: planType as PlanType,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      breakfast: meals.breakfast,
      lunch: meals.lunch,
      snack: meals.snack,
      dinner: meals.dinner,
    });
    toast.success("Meal plan assigned successfully!");
    onOpenChange(false);
    setPlanType("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setMeals({ breakfast: "", lunch: "", snack: "", dinner: "" });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
              <Salad className="h-4 w-4 text-emerald-600" />
            </div>
            Assign Meal Plan
          </DialogTitle>
          <DialogDescription>
            Set a nutrition plan for{" "}
            <span className="font-medium text-slate-700">{clientName}</span>.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh]">
          <div className="space-y-6 py-2 pr-4">
            {/* ── Section 1: Plan Type ── */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Plan Type <span className="text-red-400">*</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {PLAN_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectPlanType(type)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      planType === type
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-300"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 2: Calorie Target ── */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Calorie Target
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="mp-calories">
                    Daily Calories (kcal){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mp-calories"
                    type="number"
                    placeholder="e.g. 2000"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mp-protein">Protein (g)</Label>
                  <Input
                    id="mp-protein"
                    type="number"
                    placeholder="e.g. 150"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mp-carbs">Carbs (g)</Label>
                  <Input
                    id="mp-carbs"
                    type="number"
                    placeholder="e.g. 200"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="mp-fats">Fats (g)</Label>
                  <Input
                    id="mp-fats"
                    type="number"
                    placeholder="e.g. 65"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Macro preview when calories are filled */}
                {calories && (protein || carbs || fats) && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                      {[
                        {
                          label: "Protein",
                          value: protein || "0",
                          color: "bg-indigo-500",
                        },
                        {
                          label: "Carbs",
                          value: carbs || "0",
                          color: "bg-amber-400",
                        },
                        {
                          label: "Fats",
                          value: fats || "0",
                          color: "bg-emerald-500",
                        },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="flex flex-1 flex-col items-center"
                        >
                          <div
                            className={cn(
                              "mb-1 h-1.5 w-full max-w-[60px] rounded-full",
                              m.color
                            )}
                          />
                          <p className="text-sm font-bold text-slate-800">
                            {m.value}g
                          </p>
                          <p className="text-xs text-slate-500">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Section 3: Meal Breakdown ── */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Meal Breakdown
              </h4>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                {MEAL_ROWS.map((meal, i) => (
                  <div
                    key={meal.key}
                    className={cn(
                      "p-4",
                      i < MEAL_ROWS.length - 1 && "border-b border-slate-100"
                    )}
                  >
                    <Label
                      htmlFor={`mp-${meal.key}`}
                      className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700"
                    >
                      <span>{meal.emoji}</span>
                      {meal.label}
                    </Label>
                    <Textarea
                      id={`mp-${meal.key}`}
                      rows={2}
                      placeholder={`Describe ${meal.label.toLowerCase()} meals…`}
                      value={meals[meal.key]}
                      onChange={(e) => updateMeal(meal.key, e.target.value)}
                      className="resize-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 border-t border-slate-100 pt-4">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            onClick={handleAssign}
            disabled={!isValid}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Assign Meal Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
