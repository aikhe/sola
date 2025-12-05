"use client";

import { useState } from "react";
import { PatientIntakeInput, Medication } from "@/lib/types";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

const emptyMedication: Medication = {
  name: "",
  dose: "",
  frequency: "",
  route: "",
};

export default function MedicationsStep({ formData, updateFormData }: Props) {
  const [newMed, setNewMed] = useState<Medication>(emptyMedication);

  const addMedication = () => {
    if (newMed.name.trim() && newMed.dose.trim() && newMed.frequency && newMed.route) {
      updateFormData({
        medications: [...formData.medications, { ...newMed }],
      });
      setNewMed(emptyMedication);
    }
  };

  const removeMedication = (index: number) => {
    updateFormData({
      medications: formData.medications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Current Medications</h2>

      {/* Add new medication form */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <p className="text-sm font-medium text-gray-700">Add Medication</p>
        
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Medication name"
          />
          <input
            type="text"
            value={newMed.dose}
            onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Dose (e.g., 10mg)"
          />
          <select
            value={newMed.frequency}
            onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select frequency</option>
            <option value="once daily">Once daily</option>
            <option value="twice daily">Twice daily</option>
            <option value="three times daily">Three times daily</option>
            <option value="four times daily">Four times daily</option>
            <option value="as needed">As needed</option>
            <option value="weekly">Weekly</option>
          </select>
          <select
            value={newMed.route}
            onChange={(e) => setNewMed({ ...newMed, route: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select route</option>
            <option value="oral">Oral</option>
            <option value="topical">Topical</option>
            <option value="injection">Injection</option>
            <option value="inhalation">Inhalation</option>
            <option value="sublingual">Sublingual</option>
            <option value="rectal">Rectal</option>
          </select>
        </div>
        
        <button
          type="button"
          onClick={addMedication}
          disabled={!newMed.name || !newMed.dose || !newMed.frequency || !newMed.route}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Medication
        </button>
      </div>

      {/* Medications list */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Current Medications ({formData.medications.length})
        </p>
        
        {formData.medications.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            No medications added. If you don&apos;t take any medications, you can proceed to the next step.
          </p>
        ) : (
          <div className="space-y-2">
            {formData.medications.map((med, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">
                    {med.dose} • {med.frequency} • {med.route}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeMedication(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
