"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/support/UserContext";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useBot } from "@/support/BotContext";
import {
  IconLoader,
  IconExclamationCircle,
  IconProgressCheck,
} from "@tabler/icons-react";

function Diary() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const { userDetails } = useUser();
  const { selectedBotId } = useBot();

  const handleSend = async () => {
    setStatus(
      <span className="flex flex-row gap-2 items-center">
        <IconLoader size={16} className="text-white" /> Sending...
      </span>
    );
    try {
      const payload = {
        email: userDetails.email,
        bot_id: selectedBotId,
        text: text,
      };
      const response = await fetch("https://novi.aigurukul.dev/cv/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setStatus(
        <span className="flex flex-row gap-2 items-center text-green-400">
          <IconProgressCheck size={16} className="text-white" /> Sent
        </span>
      );
    } catch (error) {
      setStatus(
        <span className="flex flex-row gap-2 items-center">
          <IconExclamationCircle size={16} className="text-white" /> Error in
          sending the text
        </span>
      );
      console.error(error);
    }
  };
  return (
    <div
      suppressHydrationWarning
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-4 md:p-5 shadow-lg"
    >
      <div className="w-full mt-0">
        <h2 className="font-bold text-xl text-center md:text-left text-gray-800 dark:text-white">
          Diary
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="w-full">
          <Textarea
            className="border border-gray-200 dark:border-gray-600 h-40 w-full max-w-[480px] mt-2 p-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter your diary here to personalize the bot further. After sending the diary, please wait a few minutes for the bot to process and personalize it for you."
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {status === "" ? (
          <Button
            className="mt-2 mx-auto w-full md:w-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={handleSend}
          >
            Send
          </Button>
        ) : (
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default Diary;
