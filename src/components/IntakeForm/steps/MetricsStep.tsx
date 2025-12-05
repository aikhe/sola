"use client";

import { PatientIntakeInput } from "@/lib/types";
import { calculateBMI } from "@/lib/validation";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

export default function MetricsStep({ formData, updateFormData }: Props) {
  const bmi =
    formData.height_cm > 0 && formData.weight_kg > 0
      ? calculateBMI(formData.height_cm, formData.weight_kg)
      : 0;

  const getBMICategory = (bmi: number) => {
    if (bmi === 0) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getBMIColor = (bmi: number) => {
    if (bmi === 0) return "text-gray-500";
    if (bmi < 18.5) return "text-yellow-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Health Metrics</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm) *
          </label>
          <input
            type="number"
            value={formData.height_cm || ""}
            onChange={(e) =>
              updateFormData({ height_cm: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 170"
            min="30"
            max="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg) *
          </label>
          <input
            type="number"
            value={formData.weight_kg || ""}
            onChange={(e) =>
              updateFormData({ weight_kg: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 70"
            min="1"
            max="700"
          />
        </div>
      </div>

      {/* BMI Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Calculated BMI</p>
        <p className={`text-2xl font-bold ${getBMIColor(bmi)}`}>
          {bmi > 0 ? bmi : "--"}
          {bmi > 0 && (
            <span className="text-sm font-normal ml-2">({getBMICategory(bmi)})</span>
          )}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Blood Pressure *
        </label>
        <input
          type="text"
          value={formData.blood_pressure}
          onChange={(e) => updateFormData({ blood_pressure: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 120/80"
        />
        <p className="text-xs text-gray-500 mt-1">Format: systolic/diastolic (e.g., 120/80)</p>
      </div>
    </div>
  );
}
