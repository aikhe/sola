"use client";

import { PatientIntakeInput } from "@/lib/types";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

export default function PersonalInfoStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age *
        </label>
        <input
          type="number"
          value={formData.age || ""}
          onChange={(e) => updateFormData({ age: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your age"
          min="0"
          max="150"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sex *
        </label>
        <select
          value={formData.sex}
          onChange={(e) =>
            updateFormData({ sex: e.target.value as "male" | "female" | "other" })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
