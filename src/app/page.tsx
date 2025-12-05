"use client";

import { useAuth } from "@/lib/auth-context";
import IntakeForm from "@/components/IntakeForm";
import AuthForm from "@/components/AuthForm";

export default function Home() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-6 mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Signed in as <span className="font-medium">{user.email}</span>
        </p>
        <button
          onClick={signOut}
          className="text-sm text-red-600 hover:underline"
        >
          Sign Out
        </button>
      </div>
      <IntakeForm />
    </main>
  );
}
