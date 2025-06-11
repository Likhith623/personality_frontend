"use client";
import React, { Suspense } from "react";
import { SelectBot } from "@/components/SelectBot";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

// Create a separate component to handle the search parameters
function FilteredBotList({ color }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { theme } = useTheme();

  return (
    <SelectBot
      color={theme === "dark" ? "#E5E7EB" : "#1B1B1B"}
      initialFilter={filter}
    />
  );
}

const MainComponent = () => {
  const { theme } = useTheme();

  return (
    <div
      suppressHydrationWarning
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } items-center justify-center p-4 relative overflow-hidden font-[family-name:var(--font-garamond)]`}
    >
      <div className="absolute inset-0 -z-0">
        <div
          className={`absolute w-[500px] h-[500px] ${
            theme === "dark" ? "bg-pink-900" : "bg-pink-400"
          } rounded-full blur-[150px] top-10 left-20 opacity-50`}
        ></div>
        <div
          className={`absolute w-[500px] h-[500px] ${
            theme === "dark" ? "bg-orange-900" : "bg-orange-300"
          } rounded-full blur-[150px] bottom-10 left-20 opacity-50`}
        ></div>

        <div
          className={`absolute w-[500px] h-[500px] ${
            theme === "dark" ? "bg-pink-900" : "bg-pink-400"
          } rounded-full blur-[150px] top-10 right-20 opacity-50`}
        ></div>
        <div
          className={`absolute w-[500px] h-[500px] ${
            theme === "dark" ? "bg-orange-900" : "bg-orange-300"
          } rounded-full blur-[150px] bottom-10 right-20 opacity-50`}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <FilteredBotList />
        </Suspense>
      </div>
    </div>
  );
};

export default MainComponent;
