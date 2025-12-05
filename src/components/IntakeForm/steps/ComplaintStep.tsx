"use client";

import { PatientIntakeInput, PrimaryComplaint } from "@/lib/types";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
  updateFormData: (updates: Partial<Omit<PatientIntakeInput, "user_id">>) => void;
}

const complaints: { value: PrimaryComplaint; label: string; description: string }[] = [
  {
    value: "erectile_dysfunction",
    label: "Erectile Dysfunction",
    description: "Difficulty achieving or maintaining an erection",
  },
  {
    value: "hair_loss",
    label: "Hair Loss",
    description: "Thinning hair or baldness",
  },
  {
    value: "weight_loss",
    label: "Weight Management",
    description: "Difficulty losing or managing weight",
  },
  {
    value: "fatigue",
    label: "Fatigue",
    description: "Persistent tiredness or lack of energy",
  },
  {
    value: "anxiety",
    label: "Anxiety",
    description: "Excessive worry or nervousness",
  },
  {
    value: "depression",
    label: "Depression",
    description: "Persistent sadness or loss of interest",
  },
  {
    value: "sleep_issues",
    label: "Sleep Issues",
    description: "Difficulty falling or staying asleep",
  },
  {
    value: "other",
    label: "Other",
    description: "Other health concerns not listed above",
  },
];

export default function ComplaintStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Primary Complaint</h2>
      <p className="text-gray-600 text-sm mb-4">
        Select the main reason for your visit today.
      </p>

      <div className="grid gap-3">
        {complaints.map((complaint) => (
          <label
            key={complaint.value}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.primary_complaint === complaint.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="primary_complaint"
              value={complaint.value}
              checked={formData.primary_complaint === complaint.value}
              onChange={(e) =>
                updateFormData({
                  primary_complaint: e.target.value as PrimaryComplaint,
                })
              }
              className="mt-1 mr-3"
            />
            <div>
              <p className="font-medium">{complaint.label}</p>
              <p className="text-sm text-gray-500">{complaint.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
