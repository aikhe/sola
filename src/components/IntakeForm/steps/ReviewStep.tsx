"use client";

import { PatientIntakeInput } from "@/lib/types";
import { calculateBMI } from "@/lib/validation";

interface Props {
  formData: Omit<PatientIntakeInput, "user_id">;
}

export default function ReviewStep({ formData }: Props) {
  const bmi =
    formData.height_cm > 0 && formData.weight_kg > 0
      ? calculateBMI(formData.height_cm, formData.weight_kg)
      : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
      <p className="text-gray-600 text-sm">
        Please review your information before submitting.
      </p>

      {/* Personal Info */}
      <div className="border-b pb-4">
        <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Name:</span> {formData.name || "-"}
          </div>
          <div>
            <span className="text-gray-500">Age:</span> {formData.age || "-"}
          </div>
          <div>
            <span className="text-gray-500">Sex:</span> {formData.sex || "-"}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="border-b pb-4">
        <h3 className="font-medium text-gray-900 mb-2">Health Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Height:</span> {formData.height_cm} cm
          </div>
          <div>
            <span className="text-gray-500">Weight:</span> {formData.weight_kg} kg
          </div>
          <div>
            <span className="text-gray-500">BMI:</span> {bmi}
          </div>
          <div>
            <span className="text-gray-500">Blood Pressure:</span>{" "}
            {formData.blood_pressure || "-"}
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="border-b pb-4">
        <h3 className="font-medium text-gray-900 mb-2">Lifestyle</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Exercise:</span>{" "}
            {formData.lifestyle.exercise || "-"}
          </div>
          <div>
            <span className="text-gray-500">Sleep:</span>{" "}
            {formData.lifestyle.sleep_hours} hours
          </div>
          <div>
            <span className="text-gray-500">Smoking:</span>{" "}
            {formData.lifestyle.smoking ? "Yes" : "No"}
          </div>
          <div>
            <span className="text-gray-500">Alcohol:</span>{" "}
            {formData.lifestyle.alcohol || "-"}
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="border-b pb-4">
        <h3 className="font-medium text-gray-900 mb-2">Medical History</h3>
        <div className="text-sm space-y-2">
          <div>
            <span className="text-gray-500">Conditions:</span>{" "}
            {formData.medical_history.conditions.length > 0
              ? formData.medical_history.conditions.join(", ")
              : "None"}
          </div>
          <div>
            <span className="text-gray-500">Allergies:</span>{" "}
            {formData.medical_history.allergies.length > 0
              ? formData.medical_history.allergies.join(", ")
              : "None"}
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="border-b pb-4">
        <h3 className="font-medium text-gray-900 mb-2">Medications</h3>
        {formData.medications.length > 0 ? (
          <div className="text-sm space-y-1">
            {formData.medications.map((med, index) => (
              <div key={index}>
                {med.name} - {med.dose}, {med.frequency}, {med.route}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No medications</p>
        )}
      </div>

      {/* Primary Complaint */}
      <div>
        <h3 className="font-medium text-gray-900 mb-2">Primary Complaint</h3>
        <p className="text-sm">
          {formData.primary_complaint.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </p>
      </div>
    </div>
  );
}
