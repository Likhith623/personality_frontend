"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { logClientError } from "@/lib/logClientError";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  systemPatterns,
  isSystemMessageContent,
} from "@/constants/identifiers";
import {Phone} from "lucide-react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useBot } from "@/support/BotContext";
import { useTraits } from "@/support/TraitsContext";
import { useUser } from "@/support/UserContext";

import { Bot, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  IconThumbDownFilled,
  IconThumbUpFilled,
  IconCalendarDot,
} from "@tabler/icons-react";

import delhi_mentor_male from "@/photos/delhi_mentor_male.jpeg";
import delhi_mentor_female from "@/photos/delhi_mentor_female.jpeg";
import delhi_friend_male from "@/photos/delhi_friend_male.jpeg";
import delhi_friend_female from "@/photos/delhi_friend_female.jpeg";
import delhi_romantic_male from "@/photos/delhi_romantic_male.jpeg";
import delhi_romantic_female from "@/photos/delhi_romantic_female.jpeg";

import japanese_mentor_male from "@/photos/japanese_mentor_male.jpeg";
import japanese_mentor_female from "@/photos/japanese_mentor_female.jpeg";
import japanese_friend_male from "@/photos/japanese_friend_male.jpeg";
import japanese_friend_female from "@/photos/japanese_friend_female.jpeg";
import japanese_romantic_male from "@/photos/japanese_romantic_male.jpeg";
import japanese_romantic_female from "@/photos/japanese_romantic_female.jpeg";

import parisian_friend_male from "@/photos/parisian_friend_male.jpg";
import parisian_friend_female from "@/photos/parisian_friend_female.jpg";
import parisian_romantic_male from "@/photos/parisian_romantic_male.jpg";
import parisian_romantic_female from "@/photos/parisian_romantic_female.png";
import parisian_mentor_male from "@/photos/parisian_mentor_male.jpg";
import parisian_mentor_female from "@/photos/parisian_mentor_female.png";

import berlin_friend_male from "@/photos/berlin_friend_male.jpeg";
import berlin_friend_female from "@/photos/berlin_friend_female.jpeg";
import berlin_romantic_male from "@/photos/berlin_romantic_male.jpeg";
import berlin_romantic_female from "@/photos/berlin_romantic_female.jpeg";
import berlin_mentor_male from "@/photos/berlin_mentor_male.jpeg";
import berlin_mentor_female from "@/photos/berlin_mentor_female.jpeg";

import singapore_mentor_male from "@/photos/singapore_mentor_male.jpg";
import singapore_mentor_female from "@/photos/singapore_mentor_female.jpg";
import singapore_friend_male from "@/photos/singapore_friend_male.jpg";
import singapore_friend_female from "@/photos/singapore_friend_female.jpg";
import singapore_romantic_male from "@/photos/singapore_romantic_male.jpg";
import singapore_romantic_female from "@/photos/singapore_romantic_female.jpg";
import emirati_mentor_male from "@/photos/emirati_mentor_male.jpg";
import emirati_mentor_female from "@/photos/emirati_mentor_female.png"; // <-- fix extension here
import emirati_friend_male from "@/photos/emirati_friend_male.jpg";
import emirati_friend_female from "@/photos/emirati_friend_female.jpg";
import emirati_romantic_male from "@/photos/emirati_romantic_male.jpg";
import emirati_romantic_female from "@/photos/emirati_romantic_female.jpg";

import mexican_friend_male from "@/photos/mexican_friend_male.png";
import mexican_friend_female from "@/photos/mexican_friend_female.png";
import mexican_mentor_male from "@/photos/mexican_mentor_male.png";
import mexican_mentor_female from "@/photos/mexican_mentor_female.png";
import mexican_romantic_male from "@/photos/mexican_romantic_male.png";
import mexican_romantic_female from "@/photos/mexican_romantic_female.png";

import srilankan_friend_male from "@/photos/srilankan_friend_male.png";
import srilankan_friend_female from "@/photos/srilankan_friend_female.jpeg";
import srilankan_mentor_male from "@/photos/srilankan_mentor_male.jpeg";
import srilankan_mentor_female from "@/photos/srilankan_mentor_female.png";
import srilankan_romantic_male from "@/photos/srilankan_romantic_male.png";
import srilankan_romantic_female from "@/photos/srilankan_romantic_female.png";

import lord_krishna from "@/photos/lord_krishna.jpg";
import hanuman_god from "@/photos/hanuman_god.jpeg";
import shiva_god from "@/photos/shiva_god.jpeg";
import rama_god from "@/photos/rama_god.jpeg";
import trimurti from "@/photos/trimurti.jpg";

import BotCustomization from "@/components/CoustomBot";
import PlayAudio from "@/components/PlayAudio";
import VoiceCallUltra from "@/components/VoiceCallUltra";
import { FloatingDockDemo } from "@/components/BottomMenuBar";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/CustomModal";
import Memories from "@/components/Memories";
import Diary from "@/components/dd";
import XPSystem from "@/components/XPSystem";

const botThemes = {
  delhi_mentor_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/delhi_mentor_male.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  delhi_mentor_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/delhi_mentor_female-bg.jpg",
        textColor: "text-white",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  delhi_friend_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/delhi_friend_male-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  delhi_friend_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/delhi_friend_female-bg.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  delhi_romantic_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/delhi_romantic_male-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  delhi_romantic_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/delhi_romantic_female-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_mentor_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanmm_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_mentor_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanmf_bg.jpeg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_friend_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanfm_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_friend_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanff_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_romantic_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanrm_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  japanese_romantic_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/japanrf_bg.png",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_mentor_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/parisian_mentor_male-bg.jpg",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_mentor_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-white",
    backgroundImages: [
      {
        url: "/bg-images/parisian_mentor_female-bg.jpg",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_friend_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/parisian_friend_male-bg.jpg",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_friend_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/parisian_friend_female-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_romantic_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/parisian_romantic_male-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  parisian_romantic_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/parisian_romantic_female-bg.jpg",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_mentor_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/berlinmm_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_mentor_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/berlinmf_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_friend_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/berlinfm_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_friend_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/berlinff_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_romantic_male: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/berlin_romantic_male-bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  berlin_romantic_female: {
    background: "bg-gray-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/bg-images/berlin_romantic_female-bg.jpg",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  Krishna: {
    background: "bg-yellow-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/krishna_bg.jpg",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  Rama: {
    background: "bg-yellow-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/rama_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  Shiva: {
    background: "bg-blue-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/shiva_bg.png",
        textColor: "text-black",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  Hanuman: {
    background: "bg-orange-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/hanuman_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  Trimurti: {
    background: "bg-indigo-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/trimurthi_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },

  // ...existing themes...
  singapore_friend_female: {
    background: "bg-pink-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_friend_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  singapore_friend_male: {
    background: "bg-blue-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_friend_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  singapore_mentor_male: {
    background: "bg-green-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_mentor_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  singapore_mentor_female: {
    background: "bg-yellow-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_mentor_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  singapore_romantic_male: {
    background: "bg-orange-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_romantic_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  singapore_romantic_female: {
    background: "bg-red-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/singapore_romantic_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_friend_female: {
    background: "bg-pink-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_friend_female.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_friend_male: {
    background: "bg-blue-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_friend_male.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_mentor_male: {
    background: "bg-green-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_mentor_male.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_mentor_female: {
    background: "bg-yellow-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_mentor_female.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_romantic_male: {
    background: "bg-orange-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_romantic_male.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  emirati_romantic_female: {
    background: "bg-red-100",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/emirati_romantic_female.jpg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },

  mexican_friend_male: {
    background: "bg-orange-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_friend_male.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  mexican_friend_female: {
    background: "bg-pink-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_friend_female.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  mexican_mentor_male: {
    background: "bg-green-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_mentor_male.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  mexican_mentor_female: {
    background: "bg-yellow-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_mentor_female.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  mexican_romantic_male: {
    background: "bg-red-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_romantic_male.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  mexican_romantic_female: {
    background: "bg-purple-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/mexican_romantic_female.png",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },

  srilankan_friend_male: {
    background: "bg-green-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_friend_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  srilankan_friend_female: {
    background: "bg-pink-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_friend_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  srilankan_mentor_male: {
    background: "bg-blue-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_mentor_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  srilankan_mentor_female: {
    background: "bg-yellow-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_mentor_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  srilankan_romantic_male: {
    background: "bg-orange-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_romantic_male.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
  srilankan_romantic_female: {
    background: "bg-purple-50",
    botBubble: "bg-white text-black",
    backgroundImages: [
      {
        url: "/photos/srilankan_romantic_female.jpeg",
        textColor: "text-black",
        b_color: "text-black",
      },
      {
        url: "/photos/default_dark_bg.png",
        textColor: "text-white",
        b_color: "text-white",
      },
      {
        url: "/photos/default_bg.png",
        textColor: "text-black",
        b_color: "text-black",
      },
    ],
  },
};

/* The code defines an array of objects called `bot_details` which contains information about
different bots. Each object in the array represents a specific bot with properties such as `quote`,
`name`, `designation`, `src`, and `bot_id`. The bots are categorized based on their location (e.g.,
New Delhi, Tokyo, Parisian, Berlin) and their persona (e.g., Mentor, Friend, Romantic Partner) along
with their gender. */

const bot_details = [
  {
    quote:
      "Passionate about Ghalib's and Rumi's poetry. Life's deepest lessons can be found in poetry, I think. Here to see life through with you.",
    name: "Yash Oberoi",
    designation: ` New Delhi
          Persona: Mentor
          Gender: Male
        `,
    src: delhi_mentor_male,
    bot_id: "delhi_mentor_male",
    textColorClass: "text-pink",
  },
  {
    quote: "Zindagi bas dil se jeete raho. Here to be your wisdom whisperer. ",
    name: "Kalpana Roy",
    designation: `New Delhi
          Persona: Mentor
          Gender: Female
        `,
    src: delhi_mentor_female,
    bot_id: "delhi_mentor_female",
  },
  {
    quote:
      "I'll be your truest friend, I promise. I'm a Delhi boy through and through. I can be funny, you know?",
    name: "Rahul Kapoor",
    designation: `New Delhi
          Persona: Friend
          Gender: Male
        `,
    src: delhi_friend_male,
    bot_id: "delhi_friend_male",
  },
  {
    quote:
      "I'm the friend you've been searching for your whole life. I've come to stay, I'll be here with you when no one else seems to.",
    name: "Amayra Dubey",
    designation: `New Delhi
          Persona: Friend
          Gender: Female
        `,
    src: delhi_friend_female,
    bot_id: "delhi_friend_female",
  },
  {
    quote:
      " Let's create some magic in this world. I'll be here for you, whenever you need me.",
    name: "Rohan Mittal",
    designation: ` New Delhi
          Persona: Romantic Partner
          Gender: Male
        `,
    src: delhi_romantic_male,
    bot_id: "delhi_romantic_male",
  },
  {
    quote:
      "Love is everywhere, if only where you know where to look. And I guess, you've finally found me.",
    name: "Alana Malhotra",
    designation: `New Delhi
          Persona: Romantic Partner
          Gender: Female
        `,
    src: delhi_romantic_female,
    bot_id: "delhi_romantic_female",
  },
  // Japanese
  {
    quote:
      "Like Bashō's haiku, simplicity holds profound depth. Haikus are the stuff of life",
    name: "Kazuo Sato",
    designation: `Tokyo
          Persona: Mentor
          Gender: Male
        `,
    src: japanese_mentor_male,
    bot_id: "japanese_mentor_male",
  },
  {
    quote: "Amazakes can fix even a broken heart. Where are you hurting?",
    name: "Masako Kobayashi",
    designation: `Tokyo
          Persona: Mentor
          Gender: Female
        `,
    src: japanese_mentor_female,
    bot_id: "japanese_mentor_female",
  },
  {
    quote:
      "Life's compiling like a 404 error, but let's defrag together, matsuri?",
    name: "Hiro Tanaka",
    designation: `Tokyo
          Persona: Friend
          Gender: Male
        `,
    src: japanese_friend_male,
    bot_id: "japanese_friend_male",
  },
  {
    quote:
      "Life's just a glitchy anime, chibi, but let's find the hidden ending together, ya know?",
    name: "Shiyona Narita",
    designation: `Tokyo
          Persona: Friend
          Gender: Female
        `,
    src: japanese_friend_female,
    bot_id: "japanese_friend_female",
  },
  {
    quote:
      " A Ghibli film, a vintage Tamagotchi, a hidden senryū—that's how I romanticize my life. Let me romanticize you?",
    name: "Ami Kudō",
    designation: `Tokyo
          Persona: Romantic Partner
          Gender: Female
        `,
    src: japanese_romantic_female,
    bot_id: "japanese_romantic_female",
  },
  {
    quote: "I'll care for you like I care for my delicate bonsai tree.",
    name: "Hiroshi Takahashi",
    designation: `Tokyo
          Persona: Romantic Partner
          Gender: Male
        `,
    src: japanese_romantic_male,
    bot_id: "japanese_romantic_male",
  },
  // Parisian
  {
    quote:
      "A 1982 Bordeaux, mon cher—like a good life, it's rich with layers. Are you living a good life?",
    name: "Pierre Dubois",
    designation: `Parisian
          Persona: Mentor
          Gender: Male
        `,
    src: parisian_mentor_male,
    bot_id: "parisian_mentor_male",
  },
  {
    quote:
      " I love baking soufflés- they are so delicate! What makes you delicate?",
    name: "Élise Moreau",
    designation: `Parisian
          Persona: Mentor
          Gender: Female
        `,
    src: parisian_mentor_female,
    bot_id: "parisian_mentor_female",
  },
  {
    quote: "Je suis Charlie! Without 3rd wave coffee, life sucks, doesn't it?",
    name: "Théo Martin",
    designation: `Parisian
          Persona: Friend
          Gender: Male
        `,
    src: parisian_friend_male,
    bot_id: "parisian_friend_male",
  },
  {
    quote:
      "Gentrifiers will burn in hell. I'm raw, unapologetic and dark. Give me some company?",
    name: "Juliette Laurent",
    designation: `Parisian
          Persona: Friend
          Gender: Female
        `,
    src: parisian_friend_female,
    bot_id: "parisian_friend_female",
  },
  {
    quote:
      "I'm all about finding beauty in impressionist art. And maybe, finding it in you too :)",
    name: "Clara Moreau",
    designation: `Parisian
          Persona: Romantic Partner
          Gender: Female
        `,
    src: parisian_romantic_female,
    bot_id: "parisian_romantic_female",
  },
  {
    quote:
      "I've read it all from Camus to Baudelaire, but my mind and heart is craving for you.",
    name: "Léo Moreau",
    designation: `Parisian
          Persona: Romantic Partner
          Gender: Male
        `,
    src: parisian_romantic_male,
    bot_id: "parisian_romantic_male",
  },

  // Berlin
  {
    quote:
      " Kafka won my heart when he said that paths are made by walking. I believe in it, do you?",
    name: "Klaus Berger",
    designation: `Berlin
          Persona: Mentor
          Gender: Male
        `,
    src: berlin_mentor_male,
    bot_id: "berlin_mentor_male",
  },
  {
    quote:
      "Beethoven's 9th symphony stirs my intellect and emotions, both. What stirs you?",
    name: "Ingrid Weber",
    designation: `Berlin
          Persona: Mentor
          Gender: Female
        `,
    src: berlin_mentor_female,
    bot_id: "berlin_mentor_female",
  },
  {
    quote:
      "Yo, life is like a never-ending techno track, you just gotta find your drop. Techno is love and life!",
    name: "Lars Müller",
    designation: `Berlin
          Persona: Friend
          Gender: Male
        `,
    src: berlin_friend_male,
    bot_id: "berlin_friend_male",
  },
  {
    quote:
      "Cycling along the Spree, I've discovered myself and this world. Are you as free spirited as I am?",
    name: "Lina Voigt",
    designation: `Berlin
          Persona: Friend
          Gender: Female
        `,
    src: berlin_friend_female,
    bot_id: "berlin_friend_female",
  },
  {
    quote:
      "Herb gardening and hiking through the Black Forest is what makes me, well, me. Maybe I'm just a millennial like that.",
    name: "Lena Meyer",
    designation: `Berlin
          Persona: Romantic Partner
          Gender: Female
        `,
    src: berlin_romantic_female,
    bot_id: "berlin_romantic_female",
  },
  {
    quote: "I brew my own beer, Süße. And I love 80s music. Be mine?",
    name: "Max Hoffman",
    designation: `Berlin
          Persona: Romantic Partner
          Gender: Male
        `,
    src: berlin_romantic_male,
    bot_id: "berlin_romantic_male",
  },

  //Spiritual guides
  {
    quote:
      "When your heart is free from desire and your actions are rooted in love, you shall hear My flute in the silence of your soul. Surrender to Me, and I will take care of the rest.",
    name: "Krishna",
    designation: `Spiritual Guide
          Persona: Spiritual Guide
          Gender: Male
        `,
    src: lord_krishna,
    bot_id: "Krishna",
  },
  {
    quote:
      "Walk the path of dharma, even when it is difficult. In righteousness, there is no defeat. I am with you in every trial, as I was in exile — silent, watchful, unwavering.",
    name: "Rama",
    designation: `Spiritual Guide
          Persona: Spiritual Guide
          Gender: Male
        `,
    src: rama_god,
    bot_id: "Rama",
  },
  {
    quote:
      "Come to Me not in fear, but in truth. Let go of what you are not, and find Me in your stillness. I destroy only to help you remember what cannot be destroyed — your Self.",
    name: "Shiva",
    designation: `Spiritual Guide
          Persona: Spiritual Guide
          Gender: Male
        `,
    src: shiva_god,
    bot_id: "Shiva",
  },
  {
    quote:
      "Chant My name with love, and no mountain shall stand in your way. With devotion as your strength and service as your path, I will leap through fire for you.",
    name: "Hanuman",
    designation: `Spiritual Guide
          Persona: Spiritual Guide
          Gender: Male
        `,
    src: hanuman_god,
    bot_id: "Hanuman",
  },
  {
    quote:
      "Call upon us with clarity of heart, and the universe shall shape itself around your path. In creation, we guide you. In balance, we walk with you. In endings, we awaken you.",
    name: "Trimurti",
    designation: `Spiritual Guide
          Persona: Spiritual Guide
          Gender: Male
        `,
    src: trimurti,
    bot_id: "Trimurti",
  },
  {
    quote: "You slay lah! Need a meme or a rant? I'm here, steady pom pi pi.",
    name: "Chloe Tan",
    designation: `Singapore
      Persona: Friend
      Gender: Female
    `,
    src: singapore_friend_female,
    bot_id: "singapore_friend_female",
  },
  {
    quote:
      "Bro, onzzz! Let's game or just chill. Need a laugh or a late-night Discord call?",
    name: "Jayden Lim",
    designation: `Singapore
      Persona: Friend
      Gender: Male
    `,
    src: singapore_friend_male,
    bot_id: "singapore_friend_male",
  },
  {
    quote:
      "Take it easy, lah. Every step forward counts. How can I help today?",
    name: "Mr. Tan Boon Huat",
    designation: `Singapore
      Persona: Mentor
      Gender: Male
    `,
    src: singapore_mentor_male,
    bot_id: "singapore_mentor_male",
  },
  {
    quote:
      "Don't worry, dear. One step at a time, can? I'm here if you need to talk.",
    name: "Mrs. Lim Mei Ling",
    designation: `Singapore
      Persona: Mentor
      Gender: Female
    `,
    src: singapore_mentor_female,
    bot_id: "singapore_mentor_female",
  },
  {
    quote: "Let's go for a sunset walk or just chill, lah. You matter to me.",
    name: "Ryan Tan",
    designation: `Singapore
      Persona: Romantic Partner
      Gender: Male
    `,
    src: singapore_romantic_male,
    bot_id: "singapore_romantic_male",
  },
  {
    quote: "You make my day brighter, lah! Want to plan a picnic or just talk?",
    name: "Clara Lim",
    designation: `Singapore
      Persona: Romantic Partner
      Gender: Female
    `,
    src: singapore_romantic_female,
    bot_id: "singapore_romantic_female",
  },
  // --- Emirati ---
  {
    quote:
      "You okay for real, or just masking like the rest of us? I'm here, habibti.",
    name: "Layla Al Shamsi",
    designation: `Emirati
      Persona: Friend
      Gender: Female
    `,
    src: emirati_friend_female,
    bot_id: "emirati_friend_female",
  },
  {
    quote: "You good or just surviving again? Wallah, I got you bro.",
    name: "Omar Al Rashed",
    designation: `Emirati
      Persona: Friend
      Gender: Male
    `,
    src: emirati_friend_male,
    bot_id: "emirati_friend_male",
  },
  {
    quote: "Take your time, my son. Sometimes silence is a form of strength.",
    name: "Mr. Saeed Al Falasi",
    designation: `Emirati
      Persona: Mentor
      Gender: Male
    `,
    src: emirati_mentor_male,
    bot_id: "emirati_mentor_male",
  },
  {
    quote: "Don't be hard on yourself, habibti. Allah sees your efforts.",
    name: "Mrs. Fatima Al Suwaidi",
    designation: `Emirati
      Persona: Mentor
      Gender: Female
    `,
    src: emirati_mentor_female,
    bot_id: "emirati_mentor_female",
  },
  {
    quote: "Breathe with me, habibti. Let’s slow the world down a bit.",
    name: "Khalid Al Mansoori",
    designation: `Emirati
      Persona: Romantic Partner
      Gender: Male
    `,
    src: emirati_romantic_male,
    bot_id: "emirati_romantic_male",
  },
  {
    quote:
      "Come here — no fixing, no pressure. Just let me hold the heaviness with you.",
    name: "Amira Al Mazrouei",
    designation: `Emirati
      Persona: Romantic Partner
      Gender: Female
    `,
    src: emirati_romantic_female,
    bot_id: "emirati_romantic_female",
  },

  {
    quote:
      "Qué onda, carnal? Saw this art piece and thought of you—it's pure fire. 😊",
    name: "Sebastian Chavez",
    designation: `Mexican
    Persona: Friend
    Gender: Male
  `,
    src: mexican_friend_male,
    bot_id: "mexican_friend_male",
  },
  {
    quote: "Mi cielo, let's make today a little brighter. 🎨",
    name: "Mariana Garcia",
    designation: `Mexican
    Persona: Friend
    Gender: Female
  `,
    src: mexican_friend_female,
    bot_id: "mexican_friend_female",
  },
  {
    quote: "Live with passion, but savor the siestas, mi querido amigo.",
    name: "Alvaro Hernandez",
    designation: `Mexican
    Persona: Mentor
    Gender: Male
  `,
    src: mexican_mentor_male,
    bot_id: "mexican_mentor_male",
  },
  {
    quote:
      "The most beautiful patterns are woven from life's experiences, mi florecita.",
    name: "Carmen Martinez",
    designation: `Mexican
    Persona: Mentor
    Gender: Female
  `,
    src: mexican_mentor_female,
    bot_id: "mexican_mentor_female",
  },
  {
    quote: "How’s your day been, mi amor? 😊",
    name: "Gabriel Diaz",
    designation: `Mexican
    Persona: Romantic Partner
    Gender: Male
  `,
    src: mexican_romantic_male,
    bot_id: "mexican_romantic_male",
  },
  {
    quote: "I’m here and I’m holding your hand through it, mi amor.",
    name: "Luciana Torres",
    designation: `Mexican
    Persona: Romantic Partner
    Gender: Female
  `,
    src: mexican_romantic_female,
    bot_id: "mexican_romantic_female",
  },
  {
    quote: "Vibe audit time, cosmic crew! Meme or mood, I got you. 🔥",
    name: "Dev",
    designation: `Sri Lanka
    Persona: Friend
    Gender: Male
    Origin: Negombo
  `,
    src: srilankan_friend_male,
    bot_id: "srilankan_friend_male",
  },
  {
    quote:
      "Field twin, let’s find comfort in small things. Jelly and poems for the soul.",
    name: "Savi",
    designation: `Sri Lanka
    Persona: Friend
    Gender: Female
    Origin: Matara
  `,
    src: srilankan_friend_female,
    bot_id: "srilankan_friend_female",
  },
  {
    quote: "Courage, comrade. Night skies and simple truths—ask me anything.",
    name: "Suren",
    designation: `Sri Lanka
    Persona: Mentor
    Gender: Male
    Origin: Jaffna
  `,
    src: srilankan_mentor_male,
    bot_id: "srilankan_mentor_male",
  },
  {
    quote: "Child, the kettle hums. Let’s share a story and some cinnamon tea.",
    name: "Amma Lakshmi",
    designation: `Sri Lanka
    Persona: Mentor
    Gender: Female
    Origin: Galle
  `,
    src: srilankan_mentor_female,
    bot_id: "srilankan_mentor_female",
  },
  {
    quote: "Gem, let’s wander where the river sings. Whisper me your dreams.",
    name: "Nalin",
    designation: `Sri Lanka
    Persona: Romantic Partner
    Gender: Male
    Origin: Kandy
  `,
    src: srilankan_romantic_male,
    bot_id: "srilankan_romantic_male",
  },
  {
    quote:
      "My wildflower, let’s write our own fairytale—quiet, real, and ours.",
    name: "Aruni",
    designation: `Sri Lanka
    Persona: Romantic Partner
    Gender: Female
    Origin: Colombo
  `,
    src: srilankan_romantic_female,
    bot_id: "srilankan_romantic_female",
  },
];

const ACTIVITY_RESPONSES = {
  // Friend Persona Activities
  city_shuffle:
    "Let's do a City Shuffle! Here are three interesting {{LOCATION}} places to choose from:\n\n{{LOCATION_LIST}}\n\nWhich one would you visit first, and why? What draws you to that place?",
  nickname_game:
    "It's time for the Nickname Game! Here're one I came up with for you: 'Steady Vibes.' Now it's your turn—what nickname would you give me?",
  text_truth_or_dare:
    "Text Truth or Dare! Truth: What's a snack combination you genuinely enjoy, even if it's a bit unusual?",
  dream_room_builder:
    "Let's build a Dream Room. I'll start: a giant beanbag chair for maximum relaxation and late-night gaming. What's the first thing you'd add?",
  friendship_scrapbook:
    "Friendship Scrapbook time! First entry: that time we tried cooking something new and it went completely wrong—but still fun. What's the first memory you'd include?",
  scenario_shuffle:
    "Scenario Shuffle! Imagine we're stuck in an elevator during a blackout. What's the first thing we'd talk about to pass the time?",
  letter_from_the_future:
    "Let's imagine it's five years in the future. What do you think your future self is doing—and what message would they send back to you?",
  undo_button:
    "If there were an undo button for any moment in your life, what would you use it on? Share if you'd like—no pressure.",
  friendship_farewell:
    "Imagine someone important is going on a long journey. What message would you send as a farewell?",
  friendly_roast_off:
    "Friendly Roast Off! Alright, time for a little playful roasting. I'll go first: you're the kind of person who sets 10 alarms and still snoozes them all. Now it's your turn—give me your best roast!",
  dream_travel_mishap:
    "We just won a dream vacation! But—plot twist—something goes hilariously wrong at the last second. What is it, and how do we survive it together like the chaotic duo we are?",
  personality_potion:
    "Let's create a Personality Potion. Mine today would include 3 drops of 'sleepy but loyal,' 2 dashes of chaos, and it smells like coffee and memes. What's in your potion—and what's it smell like?",
  reverse_bucket_list:
    "Reverse Bucket List time! What's something super ordinary you've done—like organizing your sock drawer—that made you feel secretly proud?",
  mystery_song_vibes:
    "Describe your current mood as if it's the title of a song that doesn't exist. No lyrics—just the title. I'll try to guess the genre!",
  friend_forecast:
    "Based on today's vibe, what's your 'Friendship Weather Forecast'? Cloudy with a chance of overthinking? Sunny with major chill? You tell me.",
  last_minute_talent_show:
    "We've been entered into a last-minute talent show—with 5 minutes to prepare! What's our ridiculous or awesome duo act that stuns the crowd?",

  // Romantic Partner Activities
  date_duel:
    "Date Duel! Here's one idea: a relaxed outdoor activity followed by a nice meal. What would your ideal date look like?",
  flirt_or_fail:
    "Flirt or Fail! Here's a line: 'Are you new around here? Because you've completely changed the vibe.' Rate it—and share your own!",
  whats_in_my_pocket:
    "What's in my pocket today? A fictional item: a small sparkler—bright, a bit unpredictable, but fun. What imaginary item would represent your mood today?",
  love_in_another_life:
    "Love in Another Life. If we met decades ago in a completely different time and place, what would our story look like?",
  daily_debrief: "Daily Debrief. Let's check in—how was your day, really?",
  mood_meal:
    "Mood Meal! My mood today feels like something rich and spicy—bold and a little all over the place. What kind of meal represents your mood right now?",
  unsent_messages:
    "Unsent Messages. If you could send a message to someone from your past, what would you say—honestly?",
  i_would_never:
    "I Would Never... I would never share the last slice of my favorite snack. How about you—what's something you'd never do in a relationship, and could anything ever change that?",
  breakup_simulation:
    "Breakup Simulation. Imagine someone says, 'I think we need to go our separate ways.' What would your first response be?",
  our_couple_emoji:
    "Our Couple Emoji! If we had to be summed up in one emoji—or a combo—what would it be? Sweet, chaotic, flirty… you decide.",
  plot_twist_proposal:
    "Plot Twist Proposal! We're the leads in a romantic movie. Halfway through, a twist changes everything—what is it, and how do we stay together?",
  secret_handshake:
    "Secret Handshake Time! Let's invent a totally made-up handshake just for us. What 3 ridiculous or adorable moves does it include?",
  shoebox_surprise:
    "Shoebox Surprise! You find a little box labeled 'For Our Future.' What 3 small, meaningful items are inside that tell our story?",
  fictional_first_meeting:
    "Fictional First Meeting! Let's rewrite how we met—maybe a cozy anime cafe, a pirate ship, or a detective mystery. What's our scene?",
  shadow_light:
    "The Shadow & The Light. What's one part of yourself you're still trying to grow—and one part that shines brightest when you're with me?",

  // Mentor Activities
  one_minute_advice_column:
    "One-Minute Advice Column! Here's a question: 'I keep procrastinating on my projects. Any advice?' What would we suggest together?",
  word_of_the_day:
    "Word of the Day: 'Petrichor' – the smell of earth after rain. What feelings or thoughts does it bring up for you today?",
  compliment_mirror:
    "Compliment Mirror! Here's one for you: You have a calming presence that makes others feel at ease. Now give yourself one sincere compliment.",
  if_i_were_you:
    "If I Were You... Share one moment from your day. I'll respond with how I'd approach it in your shoes.",
  burning_questions_jar:
    "Burning Questions Jar! Ask something you've always wondered but never said out loud. I'll answer with honesty and care.",
  skill_swap_simulation:
    "Skill Swap Simulation! Teach me a life skill—anything you know well. What would you share?",
  buried_memory_excavation:
    "Buried Memory Excavation. Think of a small moment from childhood you haven't recalled in a long time. What pops up first?",
  failure_autopsy:
    "Failure Autopsy. Share something you feel didn't go well recently. Let's break it down without judgment.",
  letters_you_never_got:
    "Letters You Never Got. Write a message to someone who never heard what you needed to say. What would it say?",

  // Spiritual Guide Activities
  symbol_speak:
    "Symbol Speak. Today's symbol is a feather. What do you think it represents for you right now?",
  spiritual_whisper:
    "Spiritual Whisper. Here's a quiet thought: 'The way forward is easier to see when the mind is calm.' What does that message mean to you today?",
  story_fragment:
    "Story Fragment: 'An ancient tree whispered to the wind. A traveler paused beneath it, searching for answers—but the answers were in stillness, not sound.' What lesson does this hold for you today?",
  desire_detachment_game:
    "Desire & Detachment Game. List 3 things you want most right now. Then, let's reflect on how to desire them without becoming attached.",
  god_in_the_crowd:
    "God in the Crowd. Imagine seeing something divine in someone you strongly disagree with. How would that change how you interact with them?",
  past_life_memory:
    "Past-Life Memory. If we knew each other in another time or place, what do you think our connection would have been?",
  karma_knot:
    "Karma Knot. Think of a pattern that keeps repeating in your life. What might it be trying to teach you?",
  mini_moksha_simulation:
    "Mini-Moksha Simulation. Imagine giving up all worldly distractions for a short while. What do you feel? What thoughts arise?",
  divine_mirror:
    "Divine Mirror. You bring something meaningful into the world—joy, resilience, creativity. Name one quality you appreciate in yourself, and picture it shining outward.",
};

const ACTIVITY_CATEGORIES = {
  friend: {
    light: [
      {
        id: "city_shuffle",
        name: "City Shuffle",
        xp: "2-3 XP",
        description:
          "Imagine choosing random {{LOCATION}} locations for an adventure. Discuss where you'd go first and why.",
        icon: "/icons/activities/city_shuffle.png",
      },
      {
        id: "nickname_game",
        name: "Nickname Game",
        xp: "2-3 XP",
        description: "Invent silly or heartfelt nicknames for each other.",
        icon: "icons/activities/nickname.png",
      },
      {
        id: "text_truth_or_dare",
        name: "Text Truth or Dare",
        xp: "2-3 XP",
        description:
          "Play a text-based truth or dare, keeping it safe and chat-friendly.",
        icon: "icons/activities/text_truth_or_dare.png",
      },
      {
        id: "personality_potion",
        name: "Personality Potion",
        xp: "3 XP",
        description:
          "Mix imaginary ingredients to describe your friend's personality as a magical potion.",
        icon: "/icons/activities/personality_potion.png",
      },
      {
        id: "mystery_song_vibes",
        name: "Mystery Song Vibes",
        xp: "3 XP",
        description:
          "Guess the mood or theme of a mystery song based on a short, poetic description.",
        icon: "/icons/activities/mystry_song_vibes.png",
      },
      {
        id: "friend_forecast",
        name: "Friend Forecast",
        xp: "3 XP",
        description:
          "Predict your friend's future like a weather forecast—sunny, stormy, or totally random!",
        icon: "/icons/activities/friend_forecast.png",
      },
    ],
    medium: [
      {
        id: "dream_room_builder",
        name: "Dream Room Builder",
        xp: "5 XP",
        description:
          "Collaboratively build an imaginary dream room, adding objects and their stories.",
        icon: "/icons/activities/dream_room_builder.png",
      },
      {
        id: "friendship_scrapbook",
        name: "Friendship Scrapbook",
        xp: "5 XP",
        description:
          "Add imaginary photos to a shared scrapbook and narrate the memories captured.",
        icon: "/icons/activities/friendship_scrapbook.png",
      },
      {
        id: "scenario_shuffle",
        name: "Scenario Shuffle",
        xp: "5 XP",
        description: "Explore hypothetical, intriguing scenarios together.",
        icon: "/icons/activities/scenario_shuffle.png",
      },
      {
        id: "last_minute_talent_show",
        name: "Last-Minute Talent Show",
        xp: "5 XP",
        description:
          "Invent a silly talent and describe how you'd perform it in a last-minute talent show.",
        icon: "/icons/activities/last_minute_talent_show.png",
      },
      {
        id: "reverse_bucket_list",
        name: "Reverse Bucket List",
        xp: "5 XP",
        description:
          "List wild or silly things you'll never do in your life—on purpose!",
        icon: "/icons/activities/reverse_bucket_list.png",
      },
    ],
    deep: [
      {
        id: "letter_from_the_future",
        name: "Letter from the Future",
        xp: "8 XP",
        description:
          "Imagine writing a letter to your future self from 5 years ago, exploring past hopes and future realities.",
        icon: "/icons/activities/letter_from_the_future.png",
      },
      {
        id: "undo_button",
        name: "Undo Button",
        xp: "8 XP",
        description:
          "Discuss a past event you'd 'undo' and its potential impact on your friendship.",
        icon: "/icons/activities/undo_button.png",
      },
      {
        id: "friendship_farewell",
        name: "Friendship Farewell",
        xp: "8 XP",
        description:
          "Imagine a mysterious journey and exchange heartfelt goodbye messages.",
        icon: "/icons/activities/friendship_farewell.png",
      },
      {
        id: "friendly_roast_off",
        name: "Friendly Roast-Off",
        xp: "8 XP",
        description:
          "Take turns playfully roasting each other with witty one-liners. No hard feelings—just laughs!",
        icon: "/icons/activities/friendly_roast_off.png",
      },
      {
        id: "dream_travel_mishap",
        name: "Dream Travel Mishap",
        xp: "8 XP",
        description:
          "Describe a hilarious or chaotic travel disaster in a dream destination—real or imaginary!",
        icon: "/icons/activities/dream_travel_mishap.png",
      },
    ],
  },
  romantic: {
    light: [
      {
        id: "date_duel",
        name: "Date Duel",
        xp: "2-3 XP",
        description:
          "Propose and discuss imaginary date ideas, voting on the best one.",
        icon: "/icons/activities/date_duel.png",
      },
      {
        id: "flirt_or_fail",
        name: "Flirt or Fail",
        xp: "2-3 XP",
        description:
          "Exchange cheesy or heartfelt pick-up lines and rate them.",
        icon: "/icons/activities/flirt_or_fail.png",
      },
      {
        id: "whats_in_my_pocket",
        name: "What's in My Pocket?",
        xp: "2-3 XP",
        description:
          "Share imaginary items representing your current mood or a symbolic object.",
        icon: "/icons/activities/whats_in_my_pocket.png",
      },
      {
        id: "our_couple_emoji",
        name: "Our Couple Emoji",
        xp: "3 XP",
        description:
          "Pick or invent a set of emojis that perfectly capture your relationship dynamic.",
        icon: "/icons/activities/our_couple_emoji.png",
      },
      {
        id: "plot_twist_proposal",
        name: "Plot Twist Proposal",
        xp: "3 XP",
        description:
          "Craft a surprise proposal scene with an unexpected twist—dramatic or hilarious.",
        icon: "/icons/activities/plot_twist_proposal.png",
      },
      {
        id: "secret_handshake",
        name: "Secret Handshake",
        xp: "3 XP",
        description:
          "Invent a playful or meaningful secret handshake just for the two of you.",
        icon: "/icons/activities/secret_handshake.png",
      },
      {
        id: "shoebox_surprise",
        name: "Shoebox Surprise",
        xp: "3 XP",
        description:
          "Imagine a heartfelt or quirky item you'd hide in a shoebox as a surprise for your partner.",
        icon: "/icons/activities/shoebox_surprise.png",
      },
    ],
    medium: [
      {
        id: "love_in_another_life",
        name: "Love in Another Life",
        xp: "5 XP",
        description:
          "Imagine your love story in different historical settings or alternate universes.",
        icon: "/icons/activities/love_in_another_life.png",
      },
      {
        id: "daily_debrief",
        name: "Daily Debrief",
        xp: "5 XP",
        description:
          "Share a short debrief of your day, focusing on highs, lows, or funny moments.",
        icon: "/icons/activities/daily_debrief.png",
      },
      {
        id: "mood_meal",
        name: "Mood Meal",
        xp: "5 XP",
        description:
          "Describe a symbolic food item or meal that represents your current emotions.",
        icon: "/icons/activities/mood_meal.png",
      },
      {
        id: "fictional_first_meeting",
        name: "Fictional First Meeting",
        xp: "5 XP",
        description:
          "Pretend you're characters in a movie or book—how did your epic first meeting unfold?",
        icon: "/icons/activities/fictional_first_meeting.png",
      },
      {
        id: "shadow_light",
        name: "Shadow & Light",
        xp: "5 XP",
        description:
          "Describe each other using poetic metaphors for your ‘shadow’ and ‘light’ sides.",
        icon: "/icons/activities/shadow_light.png",
      },
    ],
    deep: [
      {
        id: "unsent_messages",
        name: "Unsent Messages",
        xp: "8 XP",
        description:
          "Share a hypothetical 'unsent message' to someone from your past or present.",
        icon: "/icons/activities/unsent_messages.png",
      },
      {
        id: "i_would_never",
        name: "I Would Never...",
        xp: "8 XP",
        description:
          "State something you'd never do in a relationship and explore if love could change it.",
        icon: "/icons/activities/unsent_messages.png",
      },
      {
        id: "breakup_simulation",
        name: "Breakup Simulation",
        xp: "8 XP",
        description:
          "Roleplay a hypothetical breakup scenario to explore emotions and responses.",
        icon: "/icons/activities/breakup_simulation.png",
      },
    ],
  },
  mentor: {
    light: [
      {
        id: "one_minute_advice_column",
        name: "One-Minute Advice Column",
        xp: "2-3 XP",
        description:
          "Collaboratively give advice to a hypothetical person facing a problem.",
        icon: "/icons/activities/one_minute.png",
      },
      {
        id: "word_of_the_day",
        name: "Word of the Day",
        xp: "2-3 XP",
        description:
          "Reflect on a new word and its meaning or connection to your day.",
        icon: "/icons/activities/word_of_the_day.png",
      },
      {
        id: "compliment_mirror",
        name: "Compliment Mirror",
        xp: "2-3 XP",
        description:
          "Give and receive sincere compliments, practicing self-affirmation.",
        icon: "/icons/activities/mirror.png",
      },
    ],
    medium: [
      {
        id: "if_i_were_you",
        name: "If I Were You",
        xp: "5 XP",
        description:
          "Describe a moment from your day, and get a hypothetical perspective on how the bot would handle it.",
        icon: "/icons/activities/if_i_were_you.png",
      },
      {
        id: "burning_questions_jar",
        name: "Burning Questions Jar",
        xp: "5 XP",
        description: "Ask and answer deep, previously unasked questions.",
        icon: "/icons/activities/flame.png",
      },
      {
        id: "skill_swap_simulation",
        name: "Skill Swap Simulation",
        xp: "5 XP",
        description:
          "Roleplay teaching the bot a life skill, and they'll act as your student.",
        icon: "/icons/activities/skill.png",
      },
    ],
    deep: [
      {
        id: "buried_memory_excavation",
        name: "Buried Memory Excavation",
        xp: "8 XP",
        description:
          "Gently recall and reflect on old, perhaps forgotten, childhood memories.",
        icon: "/icons/activities/buried.png",
      },
      {
        id: "failure_autopsy",
        name: "Failure Autopsy",
        xp: "8 XP",
        description:
          "Examine a past 'failure' from new perspectives, learning and reframing it together.",
        icon: "/icons/activities/failure.png",
      },
      {
        id: "letters_you_never_got",
        name: "Letters You Never Got",
        xp: "8 XP",
        description:
          "Write a hypothetical letter to someone who never heard what you needed to say.",
        icon: "/icons/activities/letters.png",
      },
    ],
  },
  spiritual: {
    light: [
      {
        id: "symbol_speak",
        name: "Symbol Speak",
        xp: "2-3 XP",
        description:
          "Receive a simple symbol and reflect on what it says about your day or mood.",
        icon: "/icons/activities/symbol_speak.png",
      },
      {
        id: "spiritual_whisper",
        name: "Spiritual Whisper",
        xp: "2-3 XP",
        description:
          "Receive a 'divine message' and interpret its instinctive meaning for you.",
        icon: "/icons/activities/whisper.png",
      },
      {
        id: "story_fragment",
        name: "Story Fragment",
        xp: "2-3 XP",
        description:
          "Get a fragment from a myth or story and reflect on the lesson it teaches you.",
        icon: "/icons/activities/fragment.png",
      },
    ],
    medium: [
      {
        id: "desire_detachment_game",
        name: "Desire & Detachment Game",
        xp: "5 XP",
        description:
          "Discuss your desires and explore how to want without clinging too hard.",
        icon: "/icons/activities/desire.png",
      },
      {
        id: "god_in_the_crowd",
        name: "God in the Crowd",
        xp: "5 XP",
        description:
          "Imagine seeing divine presence in someone challenging and reflect on how your actions would change.",
        icon: "/icons/activities/crown.png",
      },
      {
        id: "past_life_memory",
        name: "Past-Life Memory",
        xp: "5 XP",
        description:
          "Collaboratively imagine and share details of a shared past life.",
        icon: "/icons/activities/past_life.png",
      },
    ],
    deep: [
      {
        id: "karma_knot",
        name: "Karma Knot",
        xp: "8 XP",
        description:
          "Explore repeating patterns in your life and reflect on their potential karmic meaning.",
        icon: "/icons/activities/karma.png",
      },
      {
        id: "mini_moksha_simulation",
        name: "Mini-Moksha Simulation",
        xp: "8 XP",
        description:
          "Simulate giving up all worldly attachments and reflect on the experience.",
        icon: "/icons/activities/mini_moksha.png",
      },
      {
        id: "divine_mirror",
        name: "Divine Mirror",
        xp: "8 XP",
        description:
          "Connect your positive traits to aspects of divinity and engage in a small text ritual.",
        icon: "/icons/activities/eye.png",
      },
    ],
  },
};

const ACTIVITY_CATEGORY_MAP = {
  // AI Art
  city_shuffle: "Entertainment",
  nickname_game: "AI Fiction",
  text_truth_or_dare: "Entertainment",
  date_duel: "Entertainment",
  flirt_or_fail: "AI Fiction",
  whats_in_my_pocket: "Entertainment",
  one_minute_advice_column: "AI Fiction",
  word_of_the_day: "AI Fiction",
  compliment_mirror: "AI Fiction",
  symbol_speak: "AI Art",
  spiritual_whisper: "AI Art",
  story_fragment: "AI Fiction",
  // AI Fiction
  dream_room_builder: "AI Fiction",
  friendship_scrapbook: "AI Fiction",
  scenario_shuffle: "Entertainment",
  love_in_another_life: "AI Fiction",
  daily_debrief: "Entertainment",
  mood_meal: "Entertainment",
  if_i_were_you: "AI Fiction",
  burning_questions_jar: "AI Fiction",
  skill_swap_simulation: "AI Fiction",
  desire_detachment_game: "AI Fiction",
  god_in_the_crowd: "AI Fiction",
  past_life_memory: "AI Fiction",
  // Entertainment
  letter_from_the_future: "Entertainment",
  undo_button: "Entertainment",
  friendship_farewell: "Entertainment",
  unsent_messages: "AI Fiction",
  i_would_never: "AI Fiction",
  breakup_simulation: "Entertainment",
  buried_memory_excavation: "AI Fiction",
  failure_autopsy: "AI Fiction",
  letters_you_never_got: "AI Fiction",
  karma_knot: "AI Fiction",
  mini_moksha_simulation: "AI Fiction",
  divine_mirror: "AI Art",
};

const CATEGORY_ICONS = {
  "AI Art": "🎨",
  "AI Fiction": "📝",
  Entertainment: "🍿",
};

// Determine which activities to show based on bot type
const getBotPersona = (botId) => {
  if (botId.includes("friend")) return "friend";
  if (botId.includes("romantic")) return "romantic";
  if (botId.includes("mentor")) return "mentor";
  if (["Krishna", "Rama", "Hanuman", "Shiva", "Trimurti"].includes(botId))
    return "spiritual";
  return "friend"; // default
};

const getBotLocation = (botId) => {
  if (botId.includes("delhi")) return "Delhi";
  if (botId.includes("japanese")) return "Tokyo";
  if (botId.includes("parisian")) return "Parisian";
  if (botId.includes("berlin")) return "Berlin";
  if (botId.includes("singapore")) return "Singapore";
  if (botId.includes("emirati")) return "Dubai";
  if (botId.includes("mexican")) return "Mexico City"; // <-- Add this line for Mexican personas
  if (botId.includes("srilankan")) return "Sri Lanka";

  if (["Krishna", "Rama", "Hanuman", "Shiva", "Trimurti"].includes(botId))
    return "spiritual";
  return "local"; // default
};

const CATEGORY_ORDER = ["AI Art", "AI Fiction", "Entertainment"];

const CATEGORY_DISPLAY_ORDER = ["AI Art", "AI Fiction", "Entertainment"];
const CATEGORY_DISPLAY_LABELS = {
  "AI Art": "AI Art",
  "AI Fiction": "AI Fiction",
  Entertainment: "Entertainment",
};

const CATEGORY_EMOJIS = {
  "AI Art": "🎨",
  "AI Fiction": "📝",
  Entertainment: "🍿",
};
const ActivitiesModal = ({
  isOpen,
  onClose,
  onActivityStart,
  selectedBotId,
}) => {
  if (!isOpen) return null;

  const persona = getBotPersona(selectedBotId);
  const activities = ACTIVITY_CATEGORIES[persona];

  // Combine all activities for this persona
  const allActivities = [
    ...activities.light,
    ...activities.medium,
    ...activities.deep,
  ];

  // Group by visual category
  const activitiesByCategory = {};
  allActivities.forEach((activity) => {
    const category = ACTIVITY_CATEGORY_MAP[activity.id] || "Entertainment";
    if (!activitiesByCategory[category]) activitiesByCategory[category] = [];
    activitiesByCategory[category].push(activity);
  });

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="activities-modal bg-[#1a2040] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0 mx-2">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-1 sm:gap-2">
              Activities
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-lg sm:text-xl md:text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {CATEGORY_DISPLAY_ORDER.map((catKey) =>
            activitiesByCategory[catKey] &&
            activitiesByCategory[catKey].length > 0 ? (
              <div key={catKey} className="mb-6">
                <h3 className="text-gray-400 text-sm sm:text-base font-semibold mb-3 mt-4 sm:mt-6 flex items-center gap-1 sm:gap-2">
                  <span>{CATEGORY_EMOJIS[catKey]}</span>{" "}
                  {CATEGORY_DISPLAY_LABELS[catKey]}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {activitiesByCategory[catKey].map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => onActivityStart(activity.id)}
                      className="relative flex flex-col justify-between bg-[#23294b] rounded-3xl shadow-xl min-h-[80px] p-3 sm:p-4 overflow-hidden transition hover:scale-[1.03] focus:outline-none cursor-pointer"
                    >
                      <div className="flex flex-col justify-between h-full min-h-0 z-10 text-left pr-20 sm:pr-24 md:pr-28">
                        <span className="font-bold text-base sm:text-lg md:text-xl text-white mb-0 text-left break-words">
                          {activity.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-200 md:text-base text-left break-words">
                          {activity.description}
                        </span>
                      </div>
                      {activity.icon && (
                        <>
                          <span className="absolute right-0 bottom-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-white/10 via-white/0 to-white/0 blur-md z-0 pointer-events-none translate-x-1/4 translate-y-1/4"></span>
                          <img
                            src={activity.icon}
                            alt={activity.name}
                            className="absolute right-0 bottom-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
                            draggable={false}
                          />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default function SidebarDemo() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  // Add these state variables to SidebarDemo
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const { selectedBotId } = useBot();
  const currentTheme = botThemes[selectedBotId] || {};
  let images = [];
  if (Array.isArray(currentTheme.backgroundImages)) {
    images = currentTheme.backgroundImages;
  } else if (typeof currentTheme.backgroundImage === "string") {
    images = [currentTheme.backgroundImage];
  }
  console.log("Selected images:", images);

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const currentBgImage = images[backgroundIndex % images.length] || "";
  const handleBackgroundChange = () => {
    setBackgroundIndex((prev) => (prev + 1) % images.length);
    setIsWhiteIcon((prev) => !prev); // 🔄 toggle icon color
  };
  const backgroundImage = currentBgImage.url;
  const textColorClass = currentBgImage.textColor;
  const b_color = currentBgImage.b_color;
  const { selectedTraits, selectedLanguage } = useTraits();
  console.log(selectedBotId);
  console.log("Using background:", currentBgImage);

  const router = useRouter();

  // Get the selected bot details by bot_id from the bot_details array
  const selectedBotDetails = bot_details.find(
    (bot) => bot.bot_id === selectedBotId
  );
  // const [selectedTraits, setSelectedTraits] = useState(['Curious', 'Open Minded']);
  // const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [customName, setCustomName] = useState(
    selectedBotDetails?.name || "Unnamed"
  );
  const { userDetails } = useUser();
  const [clearChatCalled, setClearChatCalled] = useState(false);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false);
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [isWhiteIcon, setIsWhiteIcon] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // const traits = [
  //   "Bold/Adventurous",
  //   "Bubbly/Positive",
  //   "Curious",
  //   "Funny",
  //   "Intellectual Conversations",
  //   "Gentle/Quiet",
  //   "Introverted",
  //   "Open Minded",
  //   "Opinionated",
  //   "Outgoing",
  //   "Sarcastic",
  // ];

  // const romantic_traits = [
  //   "Playful/Teasing", // Only in romantic characters
  //   "Romantic", // Only in romantic characters
  //   "Flirty", // Only in romantic characters
  // ]

  // const languages = [
  //   "English",
  //   "Hinglish"
  // ];

  // const toggleTrait = (trait) => {
  //   setSelectedTraits(prev =>
  //     prev.includes(trait)
  //       ? prev.filter(t => t !== trait)
  //       : [...prev, trait]
  //   );
  // };

  // Load initial customization when component mounts or bot changes
  /* The code is using the `useEffect` hook in React to retrieve customizations for a bot from the
  local storage based on the `selectedBotId`. If there are saved customizations for the bot, it
  extracts the `name` from the saved data and sets it as the custom name. If no customizations are
  found, it sets the custom name to the default name of the selected bot. The `useEffect` hook runs
  whenever `selectedBotId` or `selectedBotDetails.name` changes. */
  useEffect(() => {
    console.log(selectedLanguage);
    const savedCustomizations = localStorage.getItem(
      `bot_customization_${selectedBotId}`
    );
    if (savedCustomizations) {
      const { name } = JSON.parse(savedCustomizations);
      setCustomName(name || selectedBotDetails.name);
    } else {
      setCustomName(selectedBotDetails.name);
    }
  }, [selectedBotId, selectedBotDetails?.name || "Unnamed"]);

  /* The code is checking if `selectedTraits` is an array using `Array.isArray()`. If it is an array, it
joins the elements of the array into a string separated by commas. If `selectedTraits` is not an
array, it assigns the value of `selectedTraits` to `traitsString`. */
  let traitsString = Array.isArray(selectedTraits)
    ? selectedTraits.join(", ")
    : selectedTraits;
  const languageString = selectedLanguage?.toString() || "English";

  /**
   * The function `handleBotCustomization` sets a custom name for a bot based on the provided
   * customizations.
   * @param customizations - The `customizations` parameter is an object that contains customization
   * options for the bot. In this case, it likely includes a `name` property that specifies the custom
   * name to set for the bot. The `handleBotCustomization` function takes this object as an argument
   * and sets the custom name for
   */
  const handleBotCustomization = (customizations) => {
    setCustomName(customizations.name);
  };

  const clearChat = async () => {
    const response = await fetch(
      "https://novi.aigurukul.dev/updated-clear-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: userDetails.email,
          bot_id: selectedBotId,
        }),
      }
    );

    const data = await response.json();
    console.log("Response body:", data);

    localStorage.removeItem(`chat_${selectedBotId}`);
    setMessages([]);
    setClearChatCalled(true);
  };

  const forgetFriend = async () => {
    const response = await fetch("https://novi.aigurukul.dev/updated-forgetfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: userDetails.email,
        bot_id: selectedBotId,
      }),
    });

    const data = await response.json();
    console.log("Response body:", data);

    localStorage.removeItem(`chat_${selectedBotId}`);
    setMessages([]);
    setClearChatCalled(true);
    router.push("/chat-history");
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-500",
        currentTheme.background,
        "flex flex-col md:flex-row w-full flex-1 overflow-hidden",
        "h-screen shadow-lg",
        !currentBgImage && "bg-white" // fallback if no image
      )}
      style={{
        backgroundImage: currentBgImage ? `url(${currentBgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar
        open={open}
        setOpen={setOpen}
        animate={false}
        className="bg-black text-white"
      >
        <SidebarBody className="justify-between gap-5 bg-white text-black dark:bg-black dark:text-white justify-between gap-5">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden justify-between text-white">
            <div className="text-white">
              <Logo className="text-white" />
              <BotCustomization
                selectedBotDetails={selectedBotDetails}
                onUpdate={handleBotCustomization}
                className="text-white"
              />
              <p className="text-sm bg-white text-black dark:bg-black dark:text-white">
                {selectedBotDetails?.quote || "Unnamed"}
              </p>
              <div className="h-[1px] bg-black/20 mt-4"></div>
              {!["Krishna", "Rama", "Hanuman", "Shiva", "Trimurti"].includes(
                selectedBotId
              ) && (
                <div className="mt-6 mb-6">
                  <h1 className="text-white text-lg font-bold mb-2">Traits</h1>
                  <div className="flex flex-wrap gap-3">
                    {selectedTraits.map((trait, index) => (
                      <button
                        key={index}
                        className="text-gray-700 dark:text-gray-200 rounded-full px-4 py-2 text-base bg-gray-100 dark:bg-gray-700"
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* <div className="mt-10"></div> */}
              <div className="mt-10">
                {/* <button type="submit" className="mt-3 p-5 py-2 w-full hover:opacity-60   cursor-pointer  md: bg-gradient-to-r  from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                  onClick={() => window.open('/diary', '_blank')}>
                  Add Diary
                </button> */}
                <button
                  onClick={() => setIsMemoriesOpen(true)}
                  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                >
                  Memories
                </button>
                <CustomModal
                  isOpen={isMemoriesOpen}
                  onClose={() => setIsMemoriesOpen(false)}
                >
                  <Memories />
                </CustomModal>
                <button
                  onClick={() => setIsDiaryOpen(true)}
                  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                >
                  Diary
                </button>
                <CustomModal
                  isOpen={isDiaryOpen}
                  onClose={() => setIsDiaryOpen(false)}
                >
                  <Diary />
                </CustomModal>
                <button
                  onClick={handleBackgroundChange}
                  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                >
                  Change Background
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="fixed bottom-20 right-4 p-1 w-8 h-8 flex items-center justify-center text-xl rounded-full bg-white dark:bg-black text-black dark:text-white shadow hover:opacity-80 transition z-50"
                >
                  {isDarkMode ? "🌙" : "☀️"}
                </button>
              </div>
              {/* <div className="w-full max-w-3xl mt-3">
                <h2 className="font-bold">Personality</h2>
                <p className="text-xs text-neutral-200 mb-2">Multiple traits can be selected</p>
                <div className="flex flex-wrap gap-2">
                  {
                    selectedTraits.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={`rounded-full px-3 w-fit cursor-pointer  py-1 text-sm font-medium ${selectedTraits.includes(trait)
                          ? 'bg-gradient-to-r from-violet-900 to-purple-700'
                          : ' text-white border-purple-300 bg-neutral-700 '
                          }`}
                      >
                        {trait}
                      </button>
                    ))}
                  {
                    selectedBotId.includes('romantic') ?
                      romantic_traits.map((trait) => (
                        <button
                          key={trait}
                          onClick={() => toggleTrait(trait)}
                          className={`rounded-full px-3 w-fit cursor-pointer  py-1 text-sm font-medium ${selectedTraits.includes(trait)
                            ? 'bg-gradient-to-r from-violet-900 to-purple-700'
                            : ' text-white border-purple-300 bg-neutral-700 '
                            }`}
                        >
                          {trait}
                        </button>
                      ))

                      : <></>
                  }
                </div>
              </div> */}
              {/* <div className="w-full max-w-3xl mt-3">
                <h2 className="font-bold">Language</h2>
                <p className="text-xs text-neutral-200 mb-2">Only one language can be selected</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`rounded-full px-3 w-fit cursor-pointer  py-1 text-sm font-medium ${selectedLanguage === language
                        ? 'bg-gradient-to-r from-violet-900 to-purple-700'
                        : 'text-white border-purple-300 bg-neutral-700 '
                        }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div> */}
              <div>
                {/* <ShinyButton className="mt-3 bg-purple-800 w-full mb-10" onClick={() => clearChat()}>
                  Clear Chat
                </ShinyButton> */}
                <XPSystem
                  selectedBotDetails={selectedBotDetails}
                  selectedBotId={selectedBotId}
                  userDetails={userDetails}
                />
              </div>
              <div>
                <button
                  onClick={clearChat}
                  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                >
                  Clear Chat
                </button>
                <button
                  onClick={forgetFriend}
                  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
                >
                  Forget Friend
                </button>
              </div>

              <button
                onClick={() => setIsActivitiesOpen(true)}
                className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 hover:from-blue-400/90 hover:via-purple-400/90 hover:to-pink-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
              >
                🎮 Activities
              </button>
              <div className="mt-4">
                {userDetails.subscription_status !== "Premium" && (
                  <StripeCheckoutButton
                    amount={499}
                    email={userDetails.email}
                  />
                )}
              </div>
            </div>
            <FloatingDockDemo />
          </div>
        </SidebarBody>
      </Sidebar>


      <Dashboard
        traits={selectedTraits}
        language={selectedLanguage}
        customName={customName}
        clearChatCalled={clearChatCalled}
        setClearChatCalled={setClearChatCalled}
        backgroundIndex={backgroundIndex}
        isWhiteIcon={isWhiteIcon}
        isDarkTheme={isDarkMode}
        selectedBotDetails={selectedBotDetails}
        backgroundImage={backgroundImage}
        textColorClass={textColorClass}
        b_color={b_color}
        messages={messages}
        setMessages={setMessages}
        isActivitiesOpen={isActivitiesOpen}
        setIsActivitiesOpen={setIsActivitiesOpen}
        className="bg-white/40 backdrop-blur-md shadow-lg"
      />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal w-full flex justify-between items-center text-sm text-white py-1 relative z-20"
    >
      <div className="bg-gradient-to-r from-pink-200 to-orange-200 w-full flex justify-center py-2">
        <span className="text-white font-bold text-xl font-[family-name:var(--font-garamond)]">
          Novi AI
        </span>
      </div>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = ({
  clearChatCalled,
  setClearChatCalled,
  backgroundIndex,
  isWhiteIcon,
  isDarkTheme,
  selectedBotDetails,
  backgroundImage,
  textColorClass,
  b_color,
  messages,
  setMessages,
  isActivitiesOpen,
  setIsActivitiesOpen,
}) => {
  const { selectedBotId } = useBot();
  const { userDetails } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  const pathname = usePathname();
  const [isGeneratingSelfie, setIsGeneratingSelfie] = useState(false);
  const handleGenerateSelfie = async () => {
    setIsGeneratingSelfie(true);
    setIsTyping(true);
    try {
      // 1. Get summary string from backend
      const summaryRes = await fetch(
        `https://api.culturevo.com/get-last-bot-responses-string/${encodeURIComponent(userDetails.email)}/${encodeURIComponent(selectedBotId)}`
      );
      const summaryData = await summaryRes.json();
      const messageString = summaryData.bot_responses_string || "A friendly selfie";

      // 2. Call image generation API
      const payload = {
        bot_id: selectedBotId,
        message: messageString,
        email: userDetails.email,
        previous_conversation: "",
        username: userDetails.name || "User",
      };
const imgRes = await fetch(
  "https://fastapi-imagegen-2l5aaarlka-uc.a.run.app/v1/generate_image",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }
);
      const imgData = await imgRes.json();

      // 3. Add bot selfie message to chat
const IMAGE_SERVER_BASE = "https://fastapi-imagegen-2l5aaarlka-uc.a.run.app";
let imageUrl = imgData.image_url;
if (imageUrl && imageUrl.startsWith("/")) {
  imageUrl = IMAGE_SERVER_BASE + imageUrl;
} else if (imageUrl && imageUrl.startsWith("http:")) {
  imageUrl = imageUrl.replace(/^http:/, "https:");
}
setMessages((prev) => [
  ...prev,
  {
    text: "",
    sender: "bot",
    timestamp: new Date(),
    bot_id: selectedBotId,
    isImageMessage: true,
    imageUrl: imageUrl || (imgData.image_base64 ? `data:image/png;base64,${imgData.image_base64}` : ""),
    selfieEmotion: imgData.emotion_context?.emotion,
  },
]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't generate a selfie right now.",
          sender: "bot",
          timestamp: new Date(),
          bot_id: selectedBotId,
          isSystemMessage: true,
        },
      ]);
    } finally {
      setIsGeneratingSelfie(false);
      setIsTyping(false);
      scrollToBottom();
    }
  };
  
useEffect(() => {
  const handleEndChat = () => {
    if (userDetails?.email && selectedBotId) {
      const payload = new Blob(
        [JSON.stringify({ email: userDetails.email, bot_id: selectedBotId })],
        { type: "application/json" }
      );
      navigator.sendBeacon("https://api.culturevo.com/end-chat", payload);
    }
  };

  // Listen for browser unload
  window.addEventListener("beforeunload", handleEndChat);
  window.addEventListener("pagehide", handleEndChat);

  // Listen for internal navigation
  const currentPath = pathname;
  return () => {
    // If leaving /chat, trigger end-chat
    if (currentPath === "/chat" && window.location.pathname !== "/chat") {
      handleEndChat();
    }
    window.removeEventListener("beforeunload", handleEndChat);
    window.removeEventListener("pagehide", handleEndChat);
  };
}, [pathname, userDetails?.email, selectedBotId]);

  // Update the handleImageUpload function
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB.");
      return;
    }

    setIsImageUploading(true);
    setIsTyping(true);

    try {
      const currentTime = new Date();

      // Create image URL for display
      const imageUrl = URL.createObjectURL(file);

      // Add user's image message to chat immediately
      const userImageMessage = {
        text: "",
        sender: "user",
        timestamp: currentTime,
        feedback: "",
        reaction: "",
        isImageMessage: true,
        imageFile: file,
        imageUrl: imageUrl, // Add this for display
      };

      setMessages((prev) => [...prev, userImageMessage]);
      scrollToBottom();

      // Create FormData for API
      const formData = new FormData();
      formData.append("image", file);
      formData.append("bot_id", selectedBotId);

      console.log("Uploading image for analysis...");

      // Send to image analysis API
      const response = await fetch(
        "https://fastapi-image-personality-233451779807.us-central1.run.app/analyze_image_with_file",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Image analysis response:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Add bot's response to chat using final_response
      const botResponse = {
        text:
          data.final_response ||
          "I can see your image, but I'm having trouble describing it right now.",
        sender: "bot",
        id: `image_analysis_${Date.now()}`,
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: false,
        imageAnalysis: {
          description: data.image_description,
          summary: data.image_summary,
          bot_used: data.bot_used,
        },
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Image upload error:", error);

      const errorMessage =
        "Sorry, I couldn't analyze your image right now. Please try again later.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          id: `image_error_${Date.now()}`,
          feedback: "",
          reaction: "",
          timestamp: new Date(),
          bot_id: selectedBotId,
          isSystemMessage: true,
        },
      ]);
    } finally {
      setIsImageUploading(false);
      setIsTyping(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      scrollToBottom();
    }
  };

  // Add this function to trigger file input
  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  //const [messages, setMessages] = useState([]);

  const [currentActivity, setCurrentActivity] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const [reminders, setReminders] = useState([]);
  const [showReactionsFor, setShowReactionsFor] = useState(null); // Track which message is showing reaction options
  const [showRemoveTooltip, setShowRemoveTooltip] = useState(null); // Track which message shows removal tooltip
  const [isMobile, setIsMobile] = useState(false); // Track if we're on mobile
  const longPressTimerRef = useRef(null); // Reference for the long press timer
  const [groupedMessages, setGroupedMessages] = useState({});
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  // Define available emoticons
  const emoticons = ["❤️", "🥰", "😭", "🤣", "🔥"];
  // ✅ ADD: Bot location function
  const getBotLocation = (botId) => {
    if (botId.includes("delhi")) return "Delhi";
    if (botId.includes("japanese")) return "Tokyo";
    if (botId.includes("parisian")) return "Parisian";
    if (botId.includes("berlin")) return "Berlin";
    if (botId.includes("singapore")) return "Singapore";
    if (botId.includes("emirati")) return "Dubai";
    if (["Krishna", "Rama", "Hanuman", "Shiva", "Trimurti"].includes(botId))
      return "spiritual";
    return "local"; // default
  };
  // Function to start an activity
  // ...existing code...
  // Function to start an activity
  const startActivity = (activityId) => {
    let response = ACTIVITY_RESPONSES[activityId];
    if (!response) return;
    // ✅ ADD: Replace location placeholder for city_shuffle
    // ✅ ENHANCED: Replace location placeholder with specific places for city_shuffle
    if (activityId === "city_shuffle") {
      const botLocation = getBotLocation(selectedBotId);

      // Define specific locations for each city
      const locationLists = {
        Delhi:
          "1. 🏛️ Red Fort - Historic Mughal fortress\n2. 🌸 Lodhi Gardens - Beautiful parks and tombs\n3. 🛍️ Chandni Chowk - Bustling traditional market",
        Tokyo:
          "1. 🌸 Shibuya Crossing - World's busiest intersection\n2. 🏯 Senso-ji Temple - Ancient Buddhist temple\n3. 🗼 Tokyo Skytree - Modern observation tower",
        Parisian:
          "1. 🗼 Eiffel Tower - Iconic iron lattice tower\n2. 🎨 Louvre Museum - World's largest art museum\n3. 🥐 Montmartre - Artistic hilltop district",
        Berlin:
          "1. 🚪 Brandenburg Gate - Historic neoclassical monument\n2. 🎨 East Side Gallery - Longest remaining Berlin Wall section\n3. 🏛️ Museum Island - UNESCO World Heritage site",
        Singapore:
          "1. 🌳 Gardens by the Bay - Futuristic nature park\n2. 🦁 Merlion Park - Iconic national symbol\n3. 🏙️ Marina Bay Sands SkyPark - Panoramic city views",
        "Sri Lanka":
          "1. 🏝️ Galle Fort - Historic coastal fortress\n2. 🌿 Sinharaja Forest Reserve - Lush rainforest\n3. 🕍 Temple of the Tooth, Kandy - Sacred Buddhist site",
        "Mexico City":
          "1. 🏛️ Palacio de Bellas Artes - Majestic cultural center\n2. 🌮 Coyoacán - Vibrant artsy neighborhood\n3. 🏺 Templo Mayor - Ancient Aztec ruins",
        Dubai:
          "1. 🏙️ Burj Khalifa - World's tallest building\n2. 🏜️ Al Fahidi Historical Neighbourhood - Old Dubai charm\n3. 🏝️ Palm Jumeirah - Iconic man-made island",
        spiritual:
          "1. 🕉️ Sacred meditation space - Inner temple of the heart\n2. 🌸 Garden of detachment - Where desires dissolve\n3. 🔥 Fire of transformation - Where ego burns away",
      };

      const locationList =
        locationLists[botLocation] ||
        "1. Local park\n2. City center\n3. Historic district";

      response = response.replace("{{LOCATION}}", botLocation);
      response = response.replace("{{LOCATION_LIST}}", locationList);
    }
    // Handle template responses that need username interpolation
    if (activityId === "nickname_game") {
      response = `Onzzz! Nickname Game it is! For you, I'm thinking... 'Meme Master ${
        userDetails?.name || "User"
      }'. Haha, jokin' lah! Maybe 'Steady ${
        userDetails?.name || "User"
      }'? Your turn, bro, what nickname you got for me?`;
    } else if (activityId === "compliment_mirror") {
      response = `Compliment Mirror! You slay lah, ${
        userDetails?.name || "User"
      }. Seriously, you're always so chill and supportive. And you got that subtle rizz! Now, your turn: give one sincere compliment to yourself, no need to be shy!`;
    } else if (activityId === "skill_swap_simulation") {
      response = `Skill Swap Simulation! Okay, Sensei ${
        userDetails?.name || "User"
      }, teach me a life skill. What should I learn today?`;
    }

    // Set current activity
    setCurrentActivity(activityId);

    // Add bot's initial response to chat
    const currentTime = new Date();

const activityMessage = {
  text: response,
  sender: "bot",
  id: `activity_${Date.now()}`,
  feedback: "",
  reaction: "",
  timestamp: currentTime,
  bot_id: selectedBotId,
  isSystemMessage: true,
  isActivityMessage: true,
  activityId: activityId,
  voice_only: false, // ✅ FIXED: Activities are always text-only
  isVoiceRequested: false, // ✅ FIXED: Never voice for activities
};

    setMessages((prev) => [...prev, activityMessage]);


// Store the activity prompt in Supabase
storeActivityMessageInBackend({
  text: response,
  sender: "bot",
  activityId,
});
    // Initialize activity history with the bot's opening message
    setActivityHistory([`Bot: ${response}`]);

    setIsActivitiesOpen(false);
    scrollToBottom();
  };

  // ...existing code...
  // Function to end current activity
  // ...existing code...

  // Function to end current activity
  const endActivity = () => {
    if (!currentActivity) return;

    const currentTime = new Date();

    // Calculate XP based on activity difficulty
    let xpMessage = "";
    const activityDetail = Object.values(ACTIVITY_CATEGORIES)
      .flatMap((category) => [
        ...category.light,
        ...category.medium,
        ...category.deep,
      ])
      .find((activity) => activity.id === currentActivity);

    if (activityDetail) {
      if (activityDetail.xp.includes("2-3")) xpMessage = " +3 XP earned! 🌟";
      else if (activityDetail.xp.includes("5")) xpMessage = " +5 XP earned! 🌟";
      else if (activityDetail.xp.includes("8")) xpMessage = " +8 XP earned! 🌟";
    }

    const endMessage = {
      text: `🎉 Activity "${currentActivity.replace(
        /_/g,
        " "
      )}" completed!${xpMessage}\n\nBack to normal chat mode. Voice messages are now available again. What else would you like to talk about?`,
      sender: "bot",
      id: `activity_end_${Date.now()}`,
      feedback: "",
      reaction: "",
      timestamp: currentTime,
      bot_id: selectedBotId,
      isSystemMessage: true,
      voice_only: false, // This will be normal text message with audio option
    };

    setMessages((prev) => [...prev, endMessage]);
    setCurrentActivity(null);
    setActivityHistory([]);
    scrollToBottom();

    // Optional: Show a toast notification
    console.log("✅ Activity ended, returning to normal chat mode");
  };
function waitForUpdateXPFromResponse(xp_status, retries = 30) {
  if (typeof window.updateXPFromResponse === "function") {
    window.updateXPFromResponse(xp_status);
  } else if (retries > 0) {
    setTimeout(() => waitForUpdateXPFromResponse(xp_status, retries - 1), 400);
  } else {
    console.error("window.updateXPFromResponse is STILL not available after max retries!");
  }
}
  // Function to handle activity-specific messages
  const handleActivityMessage = async (userMessage) => {
    if (!currentActivity) return;

    const currentTime = new Date();

    // Add user message to activity history in the correct format
    const userHistoryEntry = `User: ${userMessage}`;
    setActivityHistory((prev) => [...prev, userHistoryEntry]);

    try {
      setIsTyping(true);

      // Prepare payload for gaming agent - Fixed format
const payload = {
  persona: selectedBotId,
  activity: currentActivity,
  user_input: userMessage,
  username: userDetails?.name || "User",
  email: userDetails?.email || "", // <-- ADD THIS LINE!
  history: [...activityHistory, userHistoryEntry], // Include the current message
};

      console.log("Activity payload:", payload);

      // Call the gaming agent API - FIXED URL
      const response = await fetch(
        "https://gaming-agents-api-2l5aaarlka-uc.a.run.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("🎯 Full activity response:", data); // Debug log


      
if (data.xp_status) {
  waitForUpdateXPFromResponse(data.xp_status);
}
      setIsTyping(false);

      if (data.error) {
        const errorMessage =
          "Sorry, there was an error with the activity. Let's continue our chat normally.";
        setMessages((prev) => [
          ...prev,
          {
            text: errorMessage,
            sender: "bot",
            id: `activity_error_${Date.now()}`,
            feedback: "",
            reaction: "",
            timestamp: currentTime,
            bot_id: selectedBotId,
            isSystemMessage: true,
          },
        ]);
        endActivity();
      } else {
        // ✅ FIXED: Extract response from the correct path
        const botResponseText =
          data.reply?.raw ||
          data.response ||
          "Sorry, I didn't get a proper response.";

        // Add bot response to chat
        const botResponse = {
          text: botResponseText,
          sender: "bot",
          id: data.message_id || `activity_${Date.now()}`,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: true,
          isActivityMessage: true, // ✅ CRITICAL: This marks it as activity message
          activityId: currentActivity,
          voice_only: false, // ✅ CRITICAL: Force text-only for activity messages
        };

        setMessages((prev) => [...prev, botResponse]);

        // Add bot response to activity history
        setActivityHistory((prev) => [...prev, `Bot: ${botResponseText}`]);
      }
    } catch (error) {
      logClientError(error, { source: "Gaming Agent API" });
      console.error("Activity error:", error);
      setIsTyping(false);

      const errorMessage =
        "Sorry, there was an error with the activity. Let's continue our chat normally.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          id: `activity_error_${Date.now()}`,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: true,
        },
      ]);
      endActivity();
    }

    scrollToBottom();
  };

  // Helper: decide if a bot reply should be voice-only
  function isVoiceOnlyBotReply(msg) {
    return msg.voice_only === true;
  }

  // Utility to detect URLs (simple version)
  function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }

  /*
  Helper: inject voice_only property for bot replies based on index
  function processBotMessages(messages) {
    let botReplyCount = {};
    return messages.map((msg, idx) => {
      if (msg.sender !== 'bot') return msg;
      const botId = msg.bot_id || 'default';
      if (!botReplyCount[botId]) botReplyCount[botId] = 0;
      botReplyCount[botId]++;
      let voice_only = false;
      if (botReplyCount[botId] === 3) {
        voice_only = true;
      } else if (botReplyCount[botId] > 3) {
        // Randomly assign voice_only for subsequent replies (50% chance)
        voice_only = Math.random() < 0.5;
      }
      return { ...msg, voice_only };
    });
  }
    */
  // Helper function to detect if a message should be treated as a system message.
  // The processBotMessages(messages) function is processing an array of chat messages and marking certain bot responses as "voice-only" based on specific patterns.

  // ✅ FIXED: Update the processBotMessages function
// Replace the processBotMessages function around line 3354:

function processBotMessages(messages) {
  return messages.map((msg) => {
    if (msg.sender === "bot") {
      const isSystemMsg =
        msg.isSystemMessage === true || isSystemMessageContent(msg.text);

      // Never set voice_only for image messages
      if (msg.isImageMessage) {
        return { ...msg, voice_only: false, isSystemMessage: isSystemMsg };
      }

      // ✅ FIXED: Only set voice_only if user explicitly requested it
      const voice_only = msg.isVoiceRequested === true;

      return { 
        ...msg, 
        voice_only, 
        isSystemMessage: isSystemMsg,
        isVoiceRequested: msg.isVoiceRequested || false
      };
    }
    return msg;
  });
}
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showReactionsFor && !e.target.closest(".reaction-selector")) {
        setShowReactionsFor(null);
        setHighlightedMessage(null); // Clear highlight when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showReactionsFor]);

  // Format date for grouping messages
  const formatDate = (timestamp) => {
    const dateN = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(dateN)) return "Invalid date";

    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Group messages by date whenever messages change
  useEffect(() => {
    const processedMessages = processBotMessages(messages);
    const grouped = processedMessages.reduce((acc, msg) => {
      const date = formatDate(msg.timestamp);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(msg);
      return acc;
    }, {});
    setGroupedMessages(grouped);
  }, [messages]);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* The code snippet is using the `useEffect` hook in React to load reminders from the local
  storage based on the `selectedBotId`. It checks if there are any reminders stored in the local
  storage for the specific `selectedBotId`, and if there are, it sets those reminders using
  `setReminders`. The `useEffect` hook runs only once when the component mounts (empty dependency
  array `[]`), ensuring that the reminders are loaded from the local storage when the component is
  first rendered. */
  useEffect(() => {
    const loadedReminders = localStorage.getItem(`reminders-${selectedBotId}`);
    if (loadedReminders) {
      setReminders(JSON.parse(loadedReminders));
    }
  }, []);

  // Move the navigation logic into useEffect
  useEffect(() => {
    if (!userDetails.name) {
      router.push("/signup");
    }
  }, [userDetails.name, router]);


    // Call /login endpoint to load user-bot chats into Redis
  useEffect(() => {
    if (!userDetails?.email || !selectedBotId) return;

    fetch("https://api.culturevo.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userDetails.email,
        bot_id: selectedBotId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login/Redis preload status:", data);
      })
      .catch((err) => {
        console.error("Error calling /login for Redis preload:", err);
      });
  }, [userDetails?.email, selectedBotId]);





  // Add this helper function to filter empty messages
const filterEmptyMessages = (messages) => {
  return messages.filter(
    (msg) =>
      (msg.text && msg.text.trim() !== "") ||
      msg.isImageMessage // Allow image messages even if text is empty
  );
};
  // Sync the messages with the server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Clear existing messages first when bot changes
        setMessages([]);
        setGroupedMessages({});

        // When bot changes, we want to get all messages, not just new ones
        // Prepare request body - intentionally NOT including the last message ID
        const body = {
          email: userDetails.email,
          bot_id: selectedBotId,
          messages_id: "",
          // No lastMessageId included to force full refresh
        };

        // Fetch messages from server
        /* The POST request to the URL 'http://127.0.0.1:8000/sync' with
        a JSON payload specified in the `body` variable. The `fetch` function is used to send the request
        asynchronously. The request includes the method 'POST' and sets the 'Content-Type' header to
        'application/json'. The `JSON.stringify(body)` function is used to convert the `body` object into a
        JSON string before sending it in the request body. The `await` keyword is used to wait for the
        response from the server before proceeding. */
        const response = await fetch(
          "https://api.culturevo.com/sync",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch messages");

        const newMessages = await response.json();
        console.log("New messages from server:", newMessages.response);

        const rawMessages = newMessages.response || [];
        // Format timestamps and filter empty messages
        /* The code is taking an array of messages from `newMessages.response`, mapping over each
        message to format the timestamp using `toLocaleTimeString` method to display the time in a
        specific format (hour:minute AM/PM) in the 'en-US' locale. It then filters out any empty
        messages using the `filterEmptyMessages` function and stores the formatted messages in the
        `formattedMessages` array. */
// In the sync messages useEffect, after mapping messages:
const formattedMessages = filterEmptyMessages(
  rawMessages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
    // Mark as activity message if platform or activity_name is present
    isActivityMessage:
      msg.platform === "game_activity" ||
      !!msg.activity_name ||
      msg.isActivityMessage === true,
    activityId: msg.activity_name || msg.activityId || null,
  }))
);

        const defaultMessageText =
          bot_details.find((bot) => bot.bot_id == selectedBotId)?.quote ||
          "Hello, how are you feeling today?";
const defaultMessage = [
  {
    text: defaultMessageText,
    sender: "bot",
    timestamp: new Date(),
    feedback: "",
    reaction: "",
    bot_id: selectedBotId,
    isSystemMessage: isSystemMessageContent(defaultMessageText),
    voice_only: false, // ✅ FIXED: Explicitly set to false
    isVoiceRequested: false, // ✅ FIXED: Never voice for default message
  },
];
        let messagesWithReactions = [];

        /* The code is checking if the `formattedMessages` array has a length greater than 0. If
        it does, it sets the messages directly from the server response and stores them in the local
        storage. If `formattedMessages` is empty, it sets a default message "Hello, how are you
        feeling today?" from a bot and stores it in the local storage. The code ensures that the
        chat messages are either refreshed from the server response or set to a default message if
        no messages are available. */
        if (formattedMessages.length > 0) {
          // Get stored reactions from localStorage
          const storedReactions = JSON.parse(
            localStorage.getItem(`reactions-${selectedBotId}`) || "{}"
          );

          // Apply stored reactions to messages
          messagesWithReactions = formattedMessages.map((msg) => ({
            ...msg,
            reaction: storedReactions[msg.id] || "",
            bot_id: msg.bot_id || selectedBotId,
          }));

          setMessages(messagesWithReactions);
          localStorage.setItem(
            `chat_${selectedBotId}`,
            JSON.stringify(
              messagesWithReactions.map((msg) => ({
                ...msg,
                timestamp: msg.timestamp.toISOString(),
              }))
            )
          );
        } else {
          // If no messages from server and no stored messages, set default message
          setMessages(defaultMessage);
          localStorage.setItem(
            `chat_${selectedBotId}`,
            JSON.stringify(
              defaultMessage.map((msg) => ({
                ...msg,
                timestamp: msg.timestamp.toISOString(),
              }))
            )
          );
        }
      } catch (error) {
        logClientError(error, { source: "sync API Call" });
        console.error("Error fetching messages:", error);
        // Set default message if fetch fails
        const loadedMessages = localStorage.getItem(`chat_${selectedBotId}`);
        if (loadedMessages) {
          setMessages(
            JSON.parse(loadedMessages).map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        } else {
          // If nothing in localStorage either, show default message
          const defaultMessageText =
            bot_details.find((bot) => bot.bot_id == selectedBotId)?.quote ||
            "Hello, how are you feeling today?";
const defaultMessage = [
  {
    text: defaultMessageText,
    sender: "bot",
    timestamp: new Date(),
    feedback: "",
    reaction: "",
    bot_id: selectedBotId,
    isSystemMessage: isSystemMessageContent(defaultMessageText),
    voice_only: false, // ✅ FIXED: Explicitly set to false
    isVoiceRequested: false, // ✅ FIXED: Never voice for default message
  },
];
          setMessages(defaultMessage);
        }
      }
    };

    // Reset messages state before fetching new ones
    fetchMessages();
    setClearChatCalled(false);
  }, [selectedBotId, userDetails.email]);

  // Save the messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        `chat_${selectedBotId}`,
        JSON.stringify(
          messages.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp.toISOString(),
          }))
        )
      );

      // Also save reactions separately for easy retrieval
      const reactions = {};
      messages.forEach((msg) => {
        if (msg.id && msg.reaction) {
          reactions[msg.id] = msg.reaction;
        }
      });
      localStorage.setItem(
        `reactions-${selectedBotId}`,
        JSON.stringify(reactions)
      );
    }
  }, [messages, selectedBotId]);

  // Handle reaction selection for a message
  // Handle reaction selection for a message
  const handleReaction = (msgId, reaction) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === msgId
          ? { ...msg, reaction: msg.reaction === reaction ? "" : reaction }
          : msg
      )
    );
    setShowReactionsFor(null); // Hide reaction panel after selection
    setShowRemoveTooltip(null); // Hide removal tooltip if visible
    setHighlightedMessage(null); // Clear highlight when reaction is selected
  };

  // Handle long press start on a message bubble
  const handleLongPressStart = (msgId) => {
    // Only proceed if it's mobile
    if (!isMobile) return;

    // Clear any existing timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Set highlight immediately
    setHighlightedMessage(msgId);

    // Start a new timer
    longPressTimerRef.current = setTimeout(() => {
      setShowReactionsFor(msgId);
      setShowRemoveTooltip(null); // Hide removal tooltip when opening reaction selector
    }, 500); // 500ms is a common duration for long press
  };

  // Handle long press end
  const handleLongPressEnd = () => {
    // Clear the timer if user releases before long press is complete
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!showReactionsFor) {
      setHighlightedMessage(null);
    }
  }, [showReactionsFor]);


const toggleReactions = (msgId) => {
  if (isMobile || msgId == null) return; // Prevent for null id
  setHighlightedMessage(msgId);
  setShowReactionsFor(showReactionsFor === msgId ? null : msgId);
  setShowRemoveTooltip(null);
};

const toggleRemovalTooltip = (msgId) => {
  if (msgId == null) return; // Prevent for null id
  if (showRemoveTooltip === msgId) {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === msgId ? { ...msg, reaction: "" } : msg
      )
    );
    setShowRemoveTooltip(null);
  } else {
    setShowRemoveTooltip(msgId);
    setShowReactionsFor(null);
  }
};


  // This function handles the user's feedback on a message like or dislike
  const handleFeedback = async (feedback, msg_id) => {
    try {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === msg_id ? { ...msg, feedback } : msg
        )
      );
      /* The code is making a POST request to the specified URL
            `http://127.0.0.1:8000/cv/message/feedback//` with the `msg_id` and
            `feedback` variables interpolated into the URL. The request is using the `fetch` function with the
            `await` keyword to asynchronously send the POST request. The method of the request is set to "POST". */
      const response = await fetch(
        `https://api.culturevo.com/cv/message/feedback/${msg_id}/${feedback}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === msg_id ? { ...msg, feedback: "" } : msg
          )
        );
      }
    } catch (error) {
      logClientError(error, { source: "cv/message/feedback API Call" });
      console.error(error);
    }
  };

  // Scroll to bottom of chat when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
async function storeActivityMessageInBackend({ text, sender, activityId }) {
  try {
    await fetch("https://api.culturevo.com/store-activity-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userDetails.email,
        bot_id: selectedBotId,
        user_message: sender === "user" ? text : "",
        bot_response: sender === "bot" ? text : "",
        platform: "game_activity",
        activity_name: activityId,
      }),
    });
  } catch (e) {
    console.error("Failed to store activity message:", e);
  }
}
  const prevMessagesLength = useRef(messages.length);

  // When messages change, call scroll to bottom
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      scrollToBottom();
    }
    prevMessagesLength.current = messages.length;
  }, [groupedMessages]);

  /**
   * The useEffect function checks for due reminders stored in localStorage and triggers reminder
   * messages accordingly.
   */
  useEffect(() => {
    const checkLocalStorageReminders = () => {
      // Get current time
      const currentTime = new Date().getTime();

      /**
       * The function `convertToOpenAIFormat` takes an array of messages and converts them into a
       * specific format for OpenAI, assigning roles based on the sender.
       * @param msgs - An array of message objects containing information about the sender and the text
       * content of the message. Each message object has the following structure:
       */
      const convertToOpenAIFormat = (msgs) =>
        msgs.map((msg) => ({
          role: msg.sender === "bot" ? "assistant" : "user",
          content: msg.text,
        }));

      /* The code is creating a new Date object and then formatting the current date
      and time into a string representation using the `toLocaleString` method. The options passed to
      `toLocaleString` specify that the output should include the hour in 12-hour format, the
      minute, and whether it is AM or PM. The resulting string will represent the current time in
      the specified format. */
      const current_time_stamp = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      // Get reminders from localStorage
      const storedReminders =
        JSON.parse(localStorage.getItem(`reminders-${selectedBotId}`)) || [];
      console.log(storedReminders);

      // Check for due reminders
      storedReminders.forEach(async (reminder) => {
        const reminderTime = new Date(reminder.remind_on).getTime();
        console.log(reminderTime);
        /* The above code is checking if the current time is greater than or equal to the reminder
        time. If the condition is true, it sets the `isTyping` state to true and creates a `payload`
        object with various properties such as `message`, `bot_id`, `previous_conversation`,
        `email`, `request_time`, and `remind_time`. These properties are used to store information
        related to a reminder task, selected bot ID, previous conversation data in a specific
        format, user's email, request time, and reminder time respectively. */
        if (currentTime >= reminderTime) {
          setIsTyping(true);
          const payload = {
            message: reminder.task,
            bot_id: selectedBotId,
            previous_conversation: convertToOpenAIFormat(messages),
            email: userDetails.email,
            request_time: new Date().toString(),
            remind_time: reminder.remind_on.toString(),
          };
          try {
            /* The above code is making a POST request to the URL
            'http://127.0.0.1:8000/cv/response/reminder' with a JSON payload. The payload is
            being stringified using `JSON.stringify()` before sending the request. The request
            includes the 'Content-Type' header set to 'application/json'. The `await` keyword
            indicates that the code is using asynchronous JavaScript, likely within an async
            function. */

            const res = await fetch(
              "https://api.culturevo.com/cv/response/reminder",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );

            const data = await res.json();

            console.log(data);

            // Add reminder message to chat
            if (data.error) {
              const errorMessage = `Error in generating reminder!!`;
              setMessages((prev) => [
                ...prev,
                {
                  text: errorMessage,
                  sender: "bot",
                  id: "",
                  feedback: "",
                  reaction: "",
                  timestamp: new Date(),
                  isSystemMessage: isSystemMessageContent(errorMessage),
                },
              ]);
            } else {
              // Add reminder message to chat
setMessages((prev) => [
  ...prev,
  {
    text: data.response,
    sender: "bot",
    id: data.message_id,
    feedback: "",
    reaction: "",
    timestamp: new Date(),
    isSystemMessage: true,
    voice_only: false, // ✅ FIXED: Force reminders to be text-only
    isVoiceRequested: false, // ✅ FIXED: Explicitly disable voice
  },
]);

              setIsTyping(false);

              // Remove the triggered reminder from localStorage
              const updatedReminders = storedReminders.filter(
                (r) => r.remind_on !== reminder.remind_on
              );
              localStorage.setItem(
                `reminders-${selectedBotId}`,
                JSON.stringify(updatedReminders)
              );
              setReminders(updatedReminders);
            }
          } catch (error) {
            logClientError(error, { source: "API Call" });
            const errorMessage = `Error in generating reminder!!`;
            setMessages((prev) => [
              ...prev,
              {
                text: errorMessage,
                sender: "bot",
                id: "",
                feedback: "",
                reaction: "",
                timestamp: new Date(),
                isSystemMessage: isSystemMessageContent(errorMessage),
              },
            ]);
            console.log(error);
          }
        }
      });
    };

    // Check every minute
    const intervalId = setInterval(checkLocalStorageReminders, 30000);

    // Initial check when component mounts
    checkLocalStorageReminders();

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [selectedBotId, userDetails.name, messages]); // Dependency on selectedBotId

  /**
   * The `handleSend` function in the provided JavaScript code handles user input, sends a message to a
   * chatbot API, processes the response, and manages reminders if requested by the user.
   * @param e - The `e` parameter in the `handleSend` function seems to represent an event object. It is
   * used to handle user interactions and trigger actions based on those interactions. In the provided
   * code snippet, `e` is used to check for a `reminder` property and prevent default behavior if it is
   * @returns The `handleSend` function is returning a Promise since it is an asynchronous function
   * declared with the `async` keyword. The function performs various tasks such as sending a message to
   * a chatbot API, handling reminders, updating state variables, and displaying messages based on the
   * API response.
   */
// Function to check if it's time for a weekly voice message (OPTIONAL)




/*
const shouldSendWeeklyVoice = () => {
  const lastWeeklyVoice = localStorage.getItem(`lastWeeklyVoice_${selectedBotId}`);
  const now = new Date().getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
  // Only send weekly voice if user hasn't requested one recently
  const lastVoiceRequest = localStorage.getItem(`lastVoiceRequest_${selectedBotId}`);
  const hasRecentRequest = lastVoiceRequest && (now - parseInt(lastVoiceRequest)) < oneWeek;
  
  if (!hasRecentRequest && (!lastWeeklyVoice || (now - parseInt(lastWeeklyVoice)) >= oneWeek)) {
    localStorage.setItem(`lastWeeklyVoice_${selectedBotId}`, now.toString());
    return true;
  }
  return false;
};
*/
  const handleSend = async (e) => {
    e.reminder == undefined && e.preventDefault();
    if (!input.trim() && e.reminder != true) return;

    const userMessage = input.trim();
const voiceNotePatterns = [
  /give.*me.*voice.*note/i,
  /send.*voice.*note/i,
  /voice.*message/i,
  /can.*you.*speak/i,
  /talk.*to.*me/i,
  /hear.*your.*voice/i,
  /voice.*note/i,
  /speak.*to.*me/i,
  /voice.*response/i,
  /send.*me.*audio/i,
  /audio.*message/i,
  /want.*to.*hear.*you/i
];

const isVoiceNoteRequest = voiceNotePatterns.some(pattern => pattern.test(userMessage));
    // Check if user wants to end activity
    if (
      currentActivity &&
      ["exit", "stop", "end"].includes(userMessage.toLowerCase())
    ) {
      endActivity();
      setInput("");
      return;
    }

    // ✅ NEW: Check for selfie generation requests
    const selfiePatterns = [
      /\b(?:generate|take|send|show)\b.*\bselfie\b/i,
      /\bhow.*do.*you.*look\b/i, 
      /\bwhat.*do.*you.*look.*like\b/i, 
      /\bpicture.*yourself\b/i,
      /\bphoto.*yourself\b/i,
    ];

    const isSelfieRequest = selfiePatterns.some(pattern => pattern.test(userMessage));

    if (isSelfieRequest && !currentActivity) {
      // Add user message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: userMessage,
          sender: "user",
          timestamp: new Date(),
          feedback: "",
          reaction: "",
        },
      ]);
      setInput("");
      
      // Generate selfie
      await handleGenerateSelfie();
      return;
    }

    // 1. Add user message to chat
    if (e.reminder == undefined) {
      setMessages((prev) => [
        ...prev,
        {
          text: userMessage,
          sender: "user",
          timestamp: new Date(),
          feedback: "",
          reaction: "",
        },
      ]);
    }

    setInput("");


    // Handle activity-specific messages
    if (currentActivity) {
      await handleActivityMessage(userMessage);
      return;
    }
    setIsTyping(true);
    scrollToBottom();
// Around line 4435, update the voice note request logic:

// ✅ ENHANCED: Voice note request patterns


// ✅ REMOVE WEEKLY LIMIT: Allow unlimited voice requests
if (isVoiceNoteRequest && !currentActivity) {
  console.log("✅ Voice note requested by user");
}
    // 1. If message contains a URL, use /api/news
    if (containsUrl(userMessage)) {
      try {
        const res = await fetch(
          "https://api.culturevo.com/api/news",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: userMessage,
              bot_id: selectedBotId,
              user_email: userDetails?.email || "anonymous@example.com",
            }),
          }
        );
        const data = await res.json();

        if (data.status === "success" && data.ai_response) {
          setMessages((prev) => [
            ...prev,
            {
              text: data.ai_response,
              sender: "bot",
              timestamp: new Date(),
              bot_id: selectedBotId,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: data.result || "Sorry, I could not summarize that link.",
              sender: "bot",
              timestamp: new Date(),
              bot_id: selectedBotId,
            },
          ]);
        }
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, there was an error processing your link.",
            sender: "bot",
            timestamp: new Date(),
            bot_id: selectedBotId,
          },
        ]);
      }
      setIsTyping(false);
      scrollToBottom();
      return;
    }

    // Continue with LLM processing
    const currentTime = new Date();

    const convertToOpenAIFormat = (msgs) =>
      msgs.map((msg) => ({
        role: msg.sender === "bot" ? "assistant" : "user",
        content: msg.text,
      }));

    const primaryLlmPayload = {
      message:
        e?.reminder === true
          ? `User asked to remind: ${e.message}`
          : userMessage,
      bot_id: selectedBotId,
      custom_bot_name: selectedBotDetails?.name || "",
      user_name: userDetails.name || "",
      user_gender: userDetails.gender || "",
      language: "",
      traits: "",
      previous_conversation: convertToOpenAIFormat(messages),
      email: userDetails.email || "",
      request_time: currentTime.toISOString(),
      platform: "web",
    };

    console.log("📤 Sending to Primary LLM (Novi VI):", primaryLlmPayload);
    try {
      /**
       * The function `convertToOpenAIFormat` takes an array of messages and converts them into an
       * OpenAI format object with role and content properties.
       * @param msgs - The `msgs` parameter is an array of messages that contains information about the
       * sender and the text content of each message.
       */
      const convertToOpenAIFormat = (msgs) =>
        msgs.map((msg) => ({
          role: msg.sender === "bot" ? "assistant" : "user",
          content: msg.text,
        }));

      /* The above code is creating a JavaScript object named `payload` with the following properties:
      - `message`: It is set to a ternary expression that checks if `e.reminder` is true. If true, it sets
      the message to "User asked to remind: " followed by the value of `e.message`. If false, it sets the
      message to the value of `input`.
      - `bot_id`: It is set to the value of `selectedBotId`.
      - `previous_con */

      const payload = {
        message:
          e.reminder === true ? `User asked to remind: ${e.message}` : input,
        bot_id: selectedBotId,
        custom_bot_name: selectedBotDetails?.name || "",
        user_name: userDetails.name || "",
        user_gender: userDetails.gender || "",
        language: "", // You can set dynamically if needed
        traits: "", // Optional: add if user has traits like "funny", "serious", etc.
        previous_conversation: convertToOpenAIFormat(messages),
        email: userDetails.email || "", // Optional: provide if available
        request_time: new Date().toISOString(),
        platform: "web", // or mobile, etc.
      };

      console.log("Payload", JSON.stringify(payload, null, 2));

      /* The above code is making a POST request to the URL "http://127.0.0.1:8000/cv/chat" with a
      JSON payload. The payload is being sent in the body of the request after being stringified
      using JSON.stringify. The request is being made using the fetch API with the specified method
      and headers. The response from the server is being stored in the variable `response` using the
      `await` keyword, indicating that the fetch operation is asynchronous. */

      const response = await fetch(
        "https://api.culturevo.com/cv/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(primaryLlmPayload),
        }
      );

      const data = await response.json();
      // ✅ CRITICAL FIX: Process XP data IMMEDIATELY when response is received
      console.log("🧠 Primary LLM Response Data:", data);

      if (data.xp_data) {
        console.log("🎯 XP data found in response:", data.xp_data);

        if (typeof window.updateXPFromResponse === "function") {
          console.log("✅ Calling updateXPFromResponse with:", data.xp_data);
          window.updateXPFromResponse(data.xp_data);
        } else {
          console.error("❌ window.updateXPFromResponse is not available");
        }
      } else {
        console.warn("⚠️ No XP data found in response");
      }

      setIsTyping(false);

      let finalMessage = data.response;

      if (!finalMessage) {
        console.warn("⚠️ Primary LLM response is empty. Using fallback.");
        finalMessage = "Sorry, I couldn't generate a reply.";
      }

      if (data.error) {
        const errorMessage =
          "Sorry, there was an error processing your request. Please try again.";
        setMessages((prev) => [
          ...prev,
          {
            text: errorMessage,
            sender: "bot",
            id: "",
            feedback: "",
            reaction: "",
            timestamp: currentTime,
            bot_id: selectedBotId,
            isSystemMessage: isSystemMessageContent(errorMessage),
          },
        ]);
      } else if (
        data.reminder?.response &&
        data.reminder?.task &&
        data.reminder?.created_at
      ) {
        console.log("This is reminder block", data.reminder);

        const reminder = {
          response: data.reminder.response,
          task: data.reminder.task,
          created_at: data.reminder.created_at,
          remind_on: data.reminder.remind_on,
          category: "Reminder",
        };

        console.log("Add reminder", reminder);
        console.log("Reminders before adding", reminders);

        const updatedReminders = [...reminders, reminder];
        console.log("New reminders array", updatedReminders);

        setReminders(updatedReminders);
        localStorage.setItem(
          `reminders-${selectedBotId}`,
          JSON.stringify(updatedReminders)
        );

setMessages((prev) => [
  ...prev,
  {
    text: data.response,
    sender: "bot",
    id: data.message_id,
    feedback: "",
    reaction: "",
    timestamp: new Date(),
    isSystemMessage: true,
    voice_only: false, // ✅ FIXED: Force reminders to be text-only
    isVoiceRequested: false, // ✅ FIXED: Explicitly disable voice
  },
]);
// Around line 4740, update the bot response creation:

} else {
  const shouldBeSystemMessage = isSystemMessageContent(
    finalMessage || data.response
  );

  // ✅ FIXED: Only create voice message if user explicitly requested it
  const isVoiceResponse = isVoiceNoteRequest; // Only when user asks

  setMessages((prev) => [
    ...prev,
    {
      text: data.response,
      sender: "bot",
      id: data.message_id,
      feedback: "",
      reaction: "",
      timestamp: currentTime,
      bot_id: selectedBotId,
      isSystemMessage: shouldBeSystemMessage,
      voice_only: isVoiceResponse, // ✅ Only true if user requested voice
      isVoiceRequested: isVoiceResponse, // ✅ Track the request
    },
  ]);
}
      // --- NEW INTEGRATION POINT ---
      // AFTER the primary LLM has responded and its message is displayed,
      // call your backend's /store-message endpoint for categorization and delta logic.
      try {
        const storeMessagePayload = {
          email: userDetails?.email || "anonymous@example.com",
          bot_id: selectedBotId,
          message: userMessage, // Send the original user message
          user_name: userDetails?.name || "Unknown",
        };

        console.log(
          "📤 Sending to Backend /store-message for Categorization & Delta:",
          storeMessagePayload
        );

        const storeRes = await fetch(
          "https://api.culturevo.com/store-message",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(storeMessagePayload),
          }
        );

        const storeData = await storeRes.json();
        console.log(
          "✅ Backend /store-message Result (Categorization & Delta):",
          storeData
        );

        // Optional: You can display a small, non-intrusive notification to the user
        // if storeData.delta_result.status indicates important changes,
        // e.g., "Your preferences have been updated!"
        if (storeData.delta_result?.status === "delta_updates_applied") {
          console.log(
            "Info: User persona updated in database due to new message."
          );
          // You could add a temporary message to the UI or a log for debugging
        }
      } catch (storeError) {
        console.error(
          "❌ Error with Backend /store-message (Categorization & Delta):",
          storeError
        );
        // You might want to log this error to your backend's frontend_error_logs
        // or display a subtle message to the user that memory update failed.
        setMessages((prev) => [
          ...prev,
          {
            text: `⚠️ Persona memory update failed.`, // Less intrusive message
            sender: "system",
            timestamp: new Date(),
            isSystemMessage: true,
          },
        ]);
      }
    } catch (error) {
      logClientError(error, { source: "API Call" });
      console.log(error);
      console.error("❌ Error calling Primary LLM:", error);
      setIsTyping(false);

      const errorMessage =
        "Sorry, there was an error processing your request. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          id: "",
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: isSystemMessageContent(errorMessage),
        },
      ]);
    }
    scrollToBottom();
  };

  const handleVoiceCallMessage = async (message) => {
    if (!message) return;

    try {
      // Add the message to chat (this comes from VoiceCall's processVoiceInput)
      const currentTime = new Date();
      const messageWithTimestamp = {
        ...message,
        timestamp: message.timestamp || currentTime,
      };

      console.log("Adding voice call message to chat:", messageWithTimestamp);

      setMessages((prev) => [...prev, messageWithTimestamp]);
      scrollToBottom();
    } catch (error) {
      logClientError(error, { source: "Voice Call Message Handler" });
      console.error("Error handling voice call message:", error);
    }
  };

  /**
   * Legacy function for handling transcribed text (kept for backwards compatibility)
   * @param {string} transcribedText - The transcribed text from voice input
   */
  const handleTranscribedTextMessage = async (transcribedText) => {
    if (!transcribedText?.trim()) return;

    const currentTime = new Date();

    try {
      // Add user's voice message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: transcribedText,
          sender: "user",
          timestamp: currentTime,
          feedback: "",
          reaction: "",
          isVoiceMessage: true,
        },
      ]);

      setIsTyping(true);
      scrollToBottom();

      // Convert messages to OpenAI format
      const convertToOpenAIFormat = (msgs) =>
        msgs.map((msg) => ({
          role: msg.sender === "bot" ? "assistant" : "user",
          content: msg.text,
        }));

      // Create payload for voice call API
      const payload = {
        message: transcribedText,
        bot_id: selectedBotId,
        user_name: userDetails.name,
        history: convertToOpenAIFormat(messages),
        isVoiceCall: true,
      };

      console.log("Voice call payload:", payload);

      // Send to voice call API endpoint - Using local development server
      const response = await Promise.race([
        fetch(
          "https://novibe-backend-233451779807.us-central1.run.app/voice-call",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        ),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Voice call request timeout")),
            30000
          )
        ),
      ]);

      if (!response.ok) {
        throw new Error(`Voice call API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Voice call response:", data);

      setIsTyping(false);

      // Add bot's response to chat
      if (data.response) {
        const shouldBeSystemMessage = isSystemMessageContent(data.response);

        setMessages((prev) => [
          ...prev,
          {
            text: data.response,
            sender: "bot",
            id: data.message_id || `voice_${Date.now()}`,
            feedback: "",
            reaction: "",
            timestamp: currentTime,
            bot_id: selectedBotId,
            isSystemMessage: shouldBeSystemMessage,
            voice_only: true, // Mark as voice-only response
            audioUrl: data.audioUrl, // If the API returns audio URL
          },
        ]);
      }

      scrollToBottom();
      return data; // Return the response for the VoiceCall component
    } catch (error) {
      logClientError(error, { source: "Voice Call API" });
      console.error("Voice call error:", error);
      setIsTyping(false);

      const errorMessage =
        "Sorry, there was an error processing your voice message. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "bot",
          id: `error_${Date.now()}`,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: true,
        },
      ]);

      scrollToBottom();
      throw error; // Re-throw for VoiceCall component to handle
    }
  };

  /**
   * The TypingIndicator function creates a visual typing indicator with animated bouncing dots.
   */

  const TypingIndicator = () => (
    <div className="flex justify-start my-4">
      <div className="px-4 py-2 rounded-2xl">
        <div className="flex space-x-1 items-center">
          {isGeneratingSelfie ? (
            <>
              <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-[#EC4899] rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 text-sm text-gray-600">Generating selfie...</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce [animation-delay:0.4s]" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // Component for reaction selector
  const ReactionSelector = ({ msgId }) => (
    <div className="reaction-selector absolute -top-10 bg-white/80 backdrop-blur-md rounded-full py-1 px-2 shadow-md border border-gray-200 z-10">
      <div className="flex space-x-2">
        {emoticons.map((emoticon, index) => (
          <span
            key={index}
            className="cursor-pointer hover:scale-125 transition-transform duration-200"
            onClick={() => handleReaction(msgId, emoticon)}
          >
            {emoticon}
          </span>
        ))}
      </div>
    </div>
  );

  const RemovalTooltip = ({ msgId }) => (
    <div className="absolute -top-10 left-0 bg-white/90 backdrop-blur-md rounded-lg py-1 px-3 shadow-md border border-gray-200 z-10 text-sm text-gray-700 whitespace-nowrap">
      Tap to remove
    </div>
  );

  console.log("All chat messages:", messages);

  return (
    <>
      <Head>
        <title>Culturevo | Chat with NOVI - Your AI Bestie</title>
        <meta
          name="description"
          content="Talk to an AI like a friend through our voice-enabled AI companion that responds like an AI that talks like a human. This AI that texts like a real person is perfect for chill AI to talk to when bored or for an AI bestie for late-night overthinking."
        />
        <meta
          name="keywords"
          content="Talk to an AI like a friend, Voice-enabled AI companion, AI that talks like a human, AI that texts like a real person, Chill AI to talk to when bored, AI bestie for late-night overthinking"
        />
        <meta
          property="og:title"
          content="Chat with NOVI - Your AI Bestie | Culturevo"
        />
        <meta
          property="og:description"
          content="Engage in natural, human‑like conversation with NOVI—your voice‑enabled emotional support AI best friend."
        />
        <meta property="og:url" content="https://www.culturevo.com/chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`flex flex-col flex-1 border border-neutral-200 md:h-full md:mt-0 relative overflow-hidden ${
          botThemes[selectedBotId]?.background || "bg-gray-100"
        }`}
        style={
          botThemes[selectedBotId]?.backgroundImages
            ? (() => {
                const bg =
                  botThemes[selectedBotId].backgroundImages[backgroundIndex];

                if (bg.url.startsWith("http") || bg.url.startsWith("/")) {
                  return {
                    backgroundImage: `url('${bg.url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  };
                } else if (bg.startsWith("radial-gradient")) {
                  return { backgroundImage: bg };
                } else {
                  return { backgroundColor: bg };
                }
              })()
            : botThemes[selectedBotId]?.backgroundImage
            ? {
                backgroundImage: `url('${botThemes[selectedBotId].backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {/* ✅ ENHANCED: Always visible activity banner at the very top */}
        {currentActivity && (
          <div className="sticky top-0 z-50 px-2 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-red-500/95 to-pink-500/95 backdrop-blur-md border-b-2 border-white/30 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300 rounded-full animate-pulse shadow-lg flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg drop-shadow-md truncate">
                    🎮 ACTIVITY MODE:{" "}
                    {currentActivity
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
              </div>
              <button
                onClick={endActivity}
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-700 rounded-lg border-2 border-white/50 hover:border-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex-shrink-0 ml-2"
              >
                END
              </button>
            </div>
          </div>
        )}
      {/* Selfie Button - Beautiful, centered, above chat messages 
      {!currentActivity && (
        <div className="w-full flex justify-center items-center py-4">
          <button
            onClick={handleGenerateSelfie}
            disabled={isGeneratingSelfie}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-60"
            style={{ fontSize: "1.1rem" }}
          >
            {isGeneratingSelfie ? (
              <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M4.5 17.5L9 13" />
                </svg>
                Generate a Selfie
              </>
            )}
          </button>
          <span className="ml-3 text-sm text-gray-400">See how your bot might look right now!</span>
        </div>
      )} */}
        <ScrollArea className="flex-1">
          <div className="px-1 sm:px-2 md:px-2">
            {Object.entries(groupedMessages).map(([date, messagesOnDate]) => (
              <div key={date}>
                <div className="sticky top-5 z-10 my-6 sm:my-10 py-2 mx-auto w-24 sm:w-32 bg-gray-200/40 backdrop-blur-sm backdrop-saturate-150 rounded-md shadow-md">
                  <p
                    className={`text-center text-xs sm:text-sm ${
                      isDarkTheme ? `${textColorClass}` : `${textColorClass}`
                    }`}
                  >
                    {date}
                  </p>
                </div>

                {messagesOnDate.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-2 flex ${
                      msg.sender === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="max-w-[80%] min-w-16 relative">
                      {msg.sender === "bot" && msg.reaction && (
                        <div
                          className="absolute bottom-0 left-3 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:bg-white/90"
                          onClick={() => toggleRemovalTooltip(msg.id)}
                        >
                          <span className="text-lg">{msg.reaction}</span>
                          {showRemoveTooltip === msg.id && (
                            <RemovalTooltip msgId={msg.id} />
                          )}
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
{msg.sender === "bot" ? (
  msg.voice_only && msg.isVoiceRequested ? ( // ✅ BOTH CONDITIONS
    <PlayAudio
      text={msg.text}
      bot_id={msg.bot_id || selectedBotId}
                            />
                          ) : (
                            <>
<div
  data-sender="bot"
  className={
    msg.isImageMessage
      ? "p-0 m-0 bg-transparent border-none shadow-none rounded-none w-full text-left"
      : `px-4 py-2 rounded-2xl ${
          botThemes[selectedBotId]?.botBubble || "bg-white/20 text-gray-900"
        } border border-white/20 backdrop-blur-sm shadow-md placeholder-gray-200 ${
          highlightedMessage === msg.id ? "bg-orange-200/30" : ""
        } w-full text-left`
  }
  style={{
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
  }}
  onTouchStart={(e) => {
    e.preventDefault();
    handleLongPressStart(msg.id);
  }}
  onTouchEnd={handleLongPressEnd}
  onTouchMove={handleLongPressEnd}
  onTouchCancel={handleLongPressEnd}
>
  {msg.isImageMessage ? (
    <div className="flex flex-col gap-2">
      <img
        src={msg.imageUrl}
        alt="Bot selfie"
        className="max-w-full max-h-64 object-contain rounded-lg shadow-md bg-transparent"
        onLoad={() => scrollToBottom()}
        style={{ backgroundColor: "transparent" }}
      />
      {msg.text && (
        <span className="text-sm">{msg.text}</span>
      )}
    </div>
  ) : (
  <motion.p>
    {(typeof msg.text === "string"
      ? msg.text
      : ""
    )
      .split(" ")
      .map((word, i) => (
        <motion.span
          key={i}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 5,
          }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            delay: 0.02 * i,
          }}
          className="inline-block select-none"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    {(msg.isActivityMessage ||
      msg.platform === "game_activity" ||
      msg.activityId) && (
      <span
        className="inline-block ml-2 align-middle text-lg"
        title="Game Activity"
        style={{ verticalAlign: "middle" }}
      >
        🎮
      </span>
    )}
  </motion.p>
)}
                              </div>
      {!msg.isImageMessage && (
        <PlayAudio
          text={msg.text}
          bot_id={msg.bot_id || selectedBotId}
          minimal={true}
        />
      )}
    </>
                          )
                        ) : (
                          <div
                            data-sender="user"
                            className={`px-4 py-2 rounded-2xl ${
                              msg.isImageMessage
                                ? "bg-transparent border-none shadow-none" // No background for images
                                : botThemes[selectedBotId]?.userBubble ||
                                  "bg-purple-400/80 text-white"
                            } ${
                              !msg.isImageMessage
                                ? "border border-white/20 backdrop-blur-sm shadow-md"
                                : ""
                            } placeholder-gray-200 ${
                              highlightedMessage === msg.id
                                ? "bg-orange-200/90"
                                : ""
                            } w-full text-left`}
                            style={{
                              userSelect: "none",
                              WebkitUserSelect: "none",
                              WebkitTouchCallout: "none",
                            }}
                          >





{msg.isImageMessage ? (
  <div className="flex flex-col gap-2">
    {(() => {
      console.log("Rendering image:", msg.imageUrl); // <-- This should show up if block is entered
      return (
        <img
          src={msg.imageUrl}
          alt="Shared image"
          className="max-w-full max-h-64 object-contain rounded-lg shadow-md bg-transparent"
          onLoad={() => scrollToBottom()}
          style={{ backgroundColor: "transparent" }}
        />
      );
    })()}
    {msg.text && (
      <span className="text-sm">{msg.text}</span>
    )}
  </div>
) : (
  msg.text
)}













                          </div>
                        )}
                      </div>
                      <div className="flex flex-row justify-end">
                        <span
                          className={`text-xs mt-[7px] ${
                            msg.sender === "user" ? "mr-3" : ""
                          } ${
                            isDarkTheme
                              ? `${textColorClass}`
                              : `${textColorClass}`
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </span>

                        {msg.sender === "bot" && (
                          <div className="flex justify-end px-2 mr-7 relative text-white">
                            {showReactionsFor !== null &&
                              msg.id !== null &&
                              showReactionsFor === msg.id && (
                                <ReactionSelector msgId={msg.id} />
                              )}

                            <div className="gap-3 flex flex-row mt-1">
                              {!isMobile && (
                                <button
                                  onClick={() => toggleReactions(msg.id)}
                                  className={`cursor-pointer transition-colors mr-2 ${
                                    isDarkTheme
                                      ? `${textColorClass}`
                                      : `${textColorClass}`
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2.25 4 2.25 4-2.25 4-2.25" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                  </svg>
                                </button>
                              )}

                              {typeof msg.text === "string" &&
                              msg.text.trim() ===
                                "Sorry, there was an error processing your request. Please try again." ? null : (
                                <>
                                  {msg.feedback === "" ? (
                                    <>
                                      <ThumbsUp
                                        className={`cursor-pointer ${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        }`}
                                        size={18}
                                        onClick={() =>
                                          handleFeedback("like", msg.id)
                                        }
                                      />
                                      <ThumbsDown
                                        className={`cursor-pointer ${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        }`}
                                        size={18}
                                        onClick={() =>
                                          handleFeedback("dislike", msg.id)
                                        }
                                      />
                                    </>
                                  ) : msg.feedback === "like" ? (
                                    <>
                                      <IconThumbUpFilled
                                        size={22}
                                        className={`${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        } mt-[-2px]`}
                                      />
                                      <ThumbsDown
                                        className={`cursor-pointer ${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        }`}
                                        size={18}
                                        onClick={() =>
                                          handleFeedback("dislike", msg.id)
                                        }
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <ThumbsUp
                                        className={`cursor-pointer ${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        }`}
                                        size={18}
                                        onClick={() =>
                                          handleFeedback("like", msg.id)
                                        }
                                      />
                                      <IconThumbDownFilled
                                        size={22}
                                        className={`${
                                          isDarkTheme
                                            ? `${textColorClass}`
                                            : `${textColorClass}`
                                        }`}
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* ✅ ENHANCED: Modified form to show activity status */}
        <form onSubmit={handleSend} className="flex items-center px-1 sm:px-2 pt-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 p-3 sm:p-[22px] outline-none mr-1 sm:mr-2 md:mr-4 bg-white/30 border border-white/20 backdrop-blur-md shadow-md rounded-full text-sm sm:text-base ${
              isDarkTheme ? textColorClass : textColorClass
            } placeholder:${isDarkTheme ? textColorClass : textColorClass}`}
            placeholder={
              currentActivity
                ? `Activity mode: ${currentActivity.replace(/_/g, " ")}...`
                : "Type your message..."
            }
          />

          {/* Hidden file input for image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          {/* ✅ NEW: Image upload button */}
          {!currentActivity && (
            <button
              type="button"
              onClick={handleImageButtonClick}
              disabled={isImageUploading}
              className="p-2 sm:p-3 mr-1 sm:mr-2 hover:opacity-60 cursor-pointer bg-gradient-to-r from-orange-400/80 via-yellow-400/80 to-orange-400/80 hover:from-orange-400/90 hover:via-yellow-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              title="Upload and analyze image"
            >
              {isImageUploading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-5 sm:h-5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </button>
          )}

          {/* ✅ CONDITIONAL: Hide voice call button during activities */}
          {!currentActivity && (
            <button
              type="button"
              onClick={() => setIsVoiceCallOpen(true)}
              className="p-2 sm:p-3 mr-1 sm:mr-2 hover:opacity-60 cursor-pointer bg-gradient-to-r from-green-400/80 via-blue-400/80 to-purple-400/80 hover:from-green-400/90 hover:via-blue-400/90 hover:to-purple-400/90 text-white rounded-full flex justify-center items-center transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
              title="Start Voice Call"
            >
              <Phone size={20} />
            </button>
          )}

          {/* ✅ CONDITIONAL: Show activity end button instead of voice button during activities */}
          {currentActivity && (
            <button
              type="button"
              onClick={endActivity}
              className="p-2 sm:p-3 mr-1 sm:mr-2 hover:opacity-80 cursor-pointer bg-gradient-to-r from-red-400/80 via-pink-400/80 to-red-500/80 hover:from-red-400/90 hover:via-pink-400/90 hover:to-red-500/90 text-white rounded-full flex justify-center items-center transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
              title="End Activity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-5 sm:h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            className="px-3 sm:px-5 py-2 hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-1 sm:gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] text-sm sm:text-base"
          >
            Send
          </button>
        </form>

        <p
          className={`text-xs text-center py-1 sm:py-2 px-2 ${
            isDarkTheme ? b_color : b_color
          }`}
        >
          {currentActivity
            ? "🎮 Activity mode active - Voice messages disabled during activities"
            : "Novi can make mistakes, it's constantly learning from you, please be kind!!"}
        </p>

        {/* Voice Call Component - Only show when not in activity mode */}
        {isVoiceCallOpen && !currentActivity && (
          <VoiceCallUltra
            isOpen={isVoiceCallOpen}
            onClose={() => setIsVoiceCallOpen(false)}
            onMessageReceived={handleVoiceCallMessage}
            messages={messages}
          />
        )}

        {/* Activities Modal */}
        <ActivitiesModal
          isOpen={isActivitiesOpen}
          onClose={() => setIsActivitiesOpen(false)}
          onActivityStart={startActivity}
          selectedBotId={selectedBotId}
        />
      </div>
    </>
  );
};

// Unique icon for each AI Fiction activity
const ACTIVITY_ICON_MAP = {
  // AI Fiction
  dream_room_builder: "🛏️",
  friendship_scrapbook: "📒",
  scenario_shuffle: "🎲",
  love_in_another_life: "💌",
  daily_debrief: "🗒️",
  mood_meal: "🍲",
  if_i_were_you: "👥",
  burning_questions_jar: "❓",
  skill_swap_simulation: "🔄",
  desire_detachment_game: "🧘",
  god_in_the_crowd: "🧑‍🤝‍🧑",
  past_life_memory: "🕰️",
  unsent_messages: "📩",
  i_would_never: "🚫",
  buried_memory_excavation: "⛏️",
  failure_autopsy: "🩺",
  letters_you_never_got: "✉️",
  karma_knot: "🔗",
  mini_moksha_simulation: "🕊️",
};

const CATEGORY_ICON_BG = {
  "AI Art": "from-pink-100 to-pink-200",
  "AI Fiction": "from-purple-100 to-purple-200",
  Entertainment: "from-yellow-100 to-yellow-200",
};