"use client";

import { useState } from "react";
import { PatientIntakeInput } from "@/lib/types";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

export default function MedicalHistoryStep({ formData, updateFormData }: Props) {
  const [newCondition, setNewCondition] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

  const addCondition = () => {
    if (newCondition.trim()) {
      updateFormData({
        medical_history: {
          ...formData.medical_history,
          conditions: [...formData.medical_history.conditions, newCondition.trim()],
        },
      });
      setNewCondition("");
    }
  };

  const removeCondition = (index: number) => {
    updateFormData({
      medical_history: {
        ...formData.medical_history,
        conditions: formData.medical_history.conditions.filter((_, i) => i !== index),
      },
    });
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      updateFormData({
        medical_history: {
          ...formData.medical_history,
          allergies: [...formData.medical_history.allergies, newAllergy.trim()],
        },
      });
      setNewAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    updateFormData({
      medical_history: {
        ...formData.medical_history,
        allergies: formData.medical_history.allergies.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Medical History</h2>

      {/* Conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical Conditions
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCondition())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Diabetes, Hypertension"
          />
          <button
            type="button"
            onClick={addCondition}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.medical_history.conditions.map((condition, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {condition}
              <button
                type="button"
                onClick={() => removeCondition(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
          {formData.medical_history.conditions.length === 0 && (
            <span className="text-gray-400 text-sm">No conditions added</span>
          )}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergy())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Penicillin, Peanuts"
          />
          <button
            type="button"
            onClick={addAllergy}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.medical_history.allergies.map((allergy, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
            >
              {allergy}
              <button
                type="button"
                onClick={() => removeAllergy(index)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </span>
          ))}
          {formData.medical_history.allergies.length === 0 && (
            <span className="text-gray-400 text-sm">No allergies added</span>
          )}
        </div>
      </div>
    </div>
  );
}
