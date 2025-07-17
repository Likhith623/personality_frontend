"use client";
import { useEffect } from "react";
import { useUser } from "@/support/UserContext";

export default function PaymentSuccess() {
  const { refreshUserDetails } = useUser(); // Make sure this exists

  useEffect(() => {
    refreshUserDetails && refreshUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-green-800 mb-2">Thank you for upgrading to Premium.</p>
      <p className="text-green-700">You now have access to all premium features.</p>
    </div>
  );
}
