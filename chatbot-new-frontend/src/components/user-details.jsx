"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/support/UserContext";
import { Label } from "../components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../components/ui/input";
import { supabase } from "../../supabaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserDetails = ({ filter }) => {
  const router = useRouter();
  const { setUserDetails } = useUser();
  const [session, setSession] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(filter ? `/signup?filter=${filter}` : "/signup");
      } else {
        setSession(session);
        if (!session.user.email_confirmed_at) {
          setError("Please verify your email address to proceed.");
        } else {
          setEmailVerified(true);
        }
        setAuthProvider(session.user.app_metadata.provider);
      }
    };
    checkSession();
  }, [router, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified) {
      setError("Please verify your email address to proceed.");
      return;
    }

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const gender = selectedGender;
    const city = selectedCity;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const email = user.email;
    if (name && gender && city) {
      const userDetails = { name, gender, city, email, auth_provider: authProvider };

      const { error: dbError } = await supabase
        .from("user_details")
        .upsert(userDetails, { onConflict: ["email"] });

      if (dbError) {
        console.error("Error saving user details:", dbError.message);
        setError("An error occurred while saving your details.");
        return;
      }

      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      setUserDetails(userDetails);
      router.push(filter ? `/details?filter=${filter}` : "/details");
    }
  };

  if (!session) return null;

  return (
    <div className="font-[family-name:var(--font-garamond)] bg-white/20 flex flex-col justify-center bg-opacity-10 p-12 rounded-3xl mx-4 lg:p-20">
      <p className="text-center text-black/70 lg:text-4xl text-2xl mb-4 font-extrabold">
        Tell us about yourself
      </p>
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
          {!emailVerified && (
            <button
              className="text-blue-500 underline"
              onClick={async () => {
                const { error } = await supabase.auth.resend({
                  type: "signup",
                  email: session.user.email,
                });
                setError(error ? "Failed to resend verification email." : "Verification email sent. Please check your inbox.");
              }}
            >
              Resend Verification Email
            </button>
          )}
        </div>
      )}

      <form className="my-8 border-none" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="name" className="text-lg text-black/70">
            What should Novi call you?
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            type="text"
            className="border text-black/70 border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            disabled={!emailVerified}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="gender" className="text-lg text-black/70">
            Select your gender
          </Label>
          <Select
            value={selectedGender}
            onValueChange={setSelectedGender}
            disabled={!emailVerified}
          >
            <SelectTrigger className="border text-black/70 border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="city" className="text-lg text-black/70">
            What city should your Novi be from?
          </Label>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
            disabled={!emailVerified}
          >
            <SelectTrigger className="border text-black/70 border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400">
              <SelectValue placeholder="Select city of your Novi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
        </LabelInputContainer>

        <button
          className="px-6 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-xl flex justify-center items-center text-lg gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] w-full"
          type="submit"
          disabled={!emailVerified}
        >
          Continue &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default UserDetails;