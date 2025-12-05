"use client";

import { PatientIntakeInput } from "@/lib/types";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

export default function LifestyleStep({ formData, updateFormData }: Props) {
  const updateLifestyle = (updates: Partial<typeof formData.lifestyle>) => {
    updateFormData({
      lifestyle: { ...formData.lifestyle, ...updates },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lifestyle Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exercise Level *
        </label>
        <select
          value={formData.lifestyle.exercise}
          onChange={(e) => updateLifestyle({ exercise: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select exercise level</option>
          <option value="none">None</option>
          <option value="light">Light (1-2 days/week)</option>
          <option value="moderate">Moderate (3-4 days/week)</option>
          <option value="heavy">Heavy (5+ days/week)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Average Sleep Hours *
        </label>
        <input
          type="number"
          value={formData.lifestyle.sleep_hours || ""}
          onChange={(e) =>
            updateLifestyle({ sleep_hours: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 7"
          min="0"
          max="24"
          step="0.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you smoke? *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.lifestyle.smoking === true}
              onChange={() => updateLifestyle({ smoking: true })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.lifestyle.smoking === false}
              onChange={() => updateLifestyle({ smoking: false })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alcohol Consumption *
        </label>
        <select
          value={formData.lifestyle.alcohol}
          onChange={(e) => updateLifestyle({ alcohol: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select alcohol consumption</option>
          <option value="none">None</option>
          <option value="occasional">Occasional (1-2 drinks/week)</option>
          <option value="moderate">Moderate (3-7 drinks/week)</option>
          <option value="heavy">Heavy (8+ drinks/week)</option>
        </select>
      </div>
    </div>
  );
}
