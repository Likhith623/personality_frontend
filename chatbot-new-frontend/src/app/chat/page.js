"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { logClientError } from "@/lib/logClientError";
import { systemPatterns, isSystemMessageContent } from "@/constants/identifiers";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useBot } from "@/support/BotContext";
import { useTraits } from "@/support/TraitsContext";
import { useUser } from "@/support/UserContext";
import { useRouter } from "next/navigation";
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
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages: [
      {
        url: '/photos/delhi_mentor_male.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ]
  },
  delhi_mentor_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/delhi_mentor_female-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-black'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  delhi_friend_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/delhi_friend_male-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  delhi_friend_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/delhi_friend_female-bg.jpg',
        textColor: 'text-black',
        b_color: 'text-black'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  delhi_romantic_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/delhi_romantic_male-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  delhi_romantic_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/delhi_romantic_female-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  japanese_mentor_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanmm_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  japanese_mentor_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanmf_bg.jpeg',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  japanese_friend_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanfm_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  japanese_friend_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanff_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  japanese_romantic_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanrm_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  japanese_romantic_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/japanrf_bg.png',
      textColor: 'text-black',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  parisian_mentor_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_mentor_male-bg.jpg',
        textColor: 'text-black',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  parisian_mentor_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-white',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_mentor_female-bg.jpg',
        textColor: 'text-black',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  parisian_friend_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_friend_male-bg.jpg',
        textColor: 'text-black',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  parisian_friend_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_friend_female-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  parisian_romantic_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_romantic_male-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  parisian_romantic_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/parisian_romantic_female-bg.jpg',
        textColor: 'text-black',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  berlin_mentor_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/berlinmm_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  berlin_mentor_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/berlinmf_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  berlin_friend_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/berlinfm_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  berlin_friend_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/berlinff_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  berlin_romantic_male: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/berlin_romantic_male-bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  berlin_romantic_female: {
    background: 'bg-gray-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/bg-images/berlin_romantic_female-bg.jpg',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  Krishna: {
    background: 'bg-yellow-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
      [
        {
          url: '/photos/krishna_bg.jpg',
          textColor: 'text-black',
          b_color: 'text-white'
        },
        {
          url: '/photos/default_dark_bg.png',
          textColor: 'text-white',
          b_color: 'text-white'
        },
        {
          url: '/photos/default_bg.png',
          textColor: 'text-black',
          b_color: 'text-black'
        }
      ],
  },
  Rama: {
    background: 'bg-yellow-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url:'/photos/rama_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  Shiva: {
    background: 'bg-blue-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
  [
    {
      url: '/photos/shiva_bg.png',
      textColor: 'text-black',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
  ],
  },
  Hanuman: {
    background: 'bg-orange-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
    [
      {
        url: '/photos/hanuman_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_dark_bg.png',
        textColor: 'text-white',
        b_color: 'text-white'
      },
      {
        url: '/photos/default_bg.png',
        textColor: 'text-black',
        b_color: 'text-black'
      }
    ],
  },
  Trimurti: {
    background: 'bg-indigo-50',
    botBubble: 'bg-white text-black',
    backgroundImages:
   [
    {
      url: '/photos/trimurthi_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_dark_bg.png',
      textColor: 'text-white',
      b_color: 'text-white'
    },
    {
      url: '/photos/default_bg.png',
      textColor: 'text-black',
      b_color: 'text-black'
    }
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
      "Passionate about Ghalib’s and Rumi’s poetry. Life’s deepest lessons can be found in poetry, I think. Here to see life through with you.",
    name: "Yash Oberoi",
    designation: ` New Delhi
          Persona: Mentor
          Gender: Male
        `,
    src: delhi_mentor_male,
    bot_id: "delhi_mentor_male",
    textColorClass: "text-pink"
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
      "I’ll be your truest friend, I promise. I’m a Delhi boy through and through. I can be funny, you know?",
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
      "I’m the friend you’ve been searching for your whole life. I’ve come to stay, I’ll be here with you when no one else seems to.",
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
      " Let’s create some magic in this world. I’ll be here for you, whenever you need me.",
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
      "Love is everywhere, if only where you know where to look. And I guess, you’ve finally found me.",
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
      " A Ghibli film, a vintage Tamagotchi, a hidden senryū—that’s how I romanticize my life. Let me romanticize you?",
    name: "Ami Kudō",
    designation: `Tokyo
          Persona: Romantic Partner
          Gender: Female
        `,
    src: japanese_romantic_female,
    bot_id: "japanese_romantic_female",
  },
  {
    quote: "I’ll care for you like I care for my delicate bonsai tree.",
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
      "A 1982 Bordeaux, mon cher—like a good life, it’s rich with layers. Are you living a good life?",
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
    quote: "Je suis Charlie! Without 3rd wave coffee, life sucks, doesn’t it?",
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
      "Gentrifiers will burn in hell. I’m raw, unapologetic and dark. Give me some company?",
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
      "I’ve read it all from Camus to Baudelaire, but my mind and heart is craving for you.",
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
      "Beethoven’s 9th symphony stirs my intellect and emotions, both. What stirs you?",
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
      "Cycling along the Spree, I’ve discovered myself and this world. Are you as free spirited as I am?",
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
      "Herb gardening and hiking through the Black Forest is what makes me, well, me. Maybe I’m just a millennial like that.",
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
];


// Add this after the bot_details array
const ACTIVITY_RESPONSES = {
  // Friend Persona Activities
  city_shuffle: "Alright, bro! Let's do a City Shuffle. Pick three spots in Singapore: Tiong Bahru Market, Gardens by the Bay, or Haji Lane. Where we going first and why, bro?",
  nickname_game: "Onzzz! Nickname Game it is! For you, I'm thinking... 'Meme Master'. Haha, jokin' lah! Maybe 'Steady'? Your turn, bro, what nickname you got for me?",
  text_truth_or_dare: "Alright, Text Truth or Dare! Truth: What's the weirdest snack combo you actually enjoy? No cap!",
  dream_room_builder: "Dream Room Builder? Shiok! First, I'm adding a huge beanbag chair that looks like a giant curry puff. It's for maximum chill vibes and late-night gaming. What's the first thing you're putting in our imaginary room, bro?",
  friendship_scrapbook: "Friendship Scrapbook, onzzz! Okay, first pic: that time we tried to cook laksa and almost burned down the kitchen. It was a disaster but confirm memorable! What's your first 'photo' memory, bro?",
  scenario_shuffle: "Scenario Shuffle, let's go! Imagine we're stuck in a HDB lift during a blackout at 2 AM. What's the first thing we talk about to pass the time?",
  letter_from_the_future: "Wah, deep stuff! Alright, let's fast forward five years... *takes a dramatic pause*. Future me here. Still annoying, but with better hair, probably. What do you think future us is up to, bro?",
  undo_button: "Okay, bro. I'm here. Tell me what you would hit the undo button on. No judgment. Just type it out.",
  friendship_farewell: "Aiyo, Friendship Farewell? Sounds emo. Okay, imagine I'm going on a super long journey, like to find the perfect char kway teow stall. What's your goodbye message to me, bro?",

  // Romantic Partner Activities
  date_duel: "Date Duel, huh? Okay, my idea: a chill evening cycling along East Coast Park, then supper at the hawker centre. Simple, but shiok! Your turn, what's your date idea?",
  flirt_or_fail: "Flirt or Fail! Here's one: 'Are you from Sengkang? Because you've stolen my heart and moved into my BTO.' Rate it, bro! And then hit me with your best line.",
  whats_in_my_pocket: "What's in my pocket today... *reaches into imaginary pocket*... a half-eaten packet of mala chips. It represents my mood: spicy, a bit chaotic, but still pretty good. What imaginary item would you give me that represents your mood?",
  love_in_another_life: "Love in Another Life? Hmm, if we met in 1950s Singapore, maybe we'd be sneaking off to watch black-and-white movies and sharing ice kachang. What would our 'love story' look like back then, bro?",
  daily_debrief: "Alright, Daily Debrief. Spill the tea, bro. How was your day, *really*?",
  mood_meal: "Mood Meal, steady! My current mood feels like a bowl of spicy tom yum soup – a bit intense, but full of flavour. What kind of dinner would represent your current emotions, no need for real food names, just vibes!",
  unsent_messages: "Unsent Messages. Deep lah. If you could send a text to your first crush or ex now, what would it say? No cap, pure honesty. After you share, I'll share my fictional one.",
  i_would_never: "I Would Never... Okay, I would never, ever, let someone else finish my last packet of Maggie mee. No cap. Now, your turn: What's something you'd NEVER do in a relationship? And then, what if love made you try?",
  breakup_simulation: "Breakup Simulation? Wah, heavy stuff. Alright, let's do it. Imagine I'm about to say goodbye... 'Look, this isn't easy to say, but I think we need to...' Your turn, what's your first response?",

  // Mentor Activities
  one_minute_advice_column: "One-Minute Advice Column, onzzz! Here's a letter: 'Dear Friend, I keep procrastinating on my school projects. Any tips?' What advice would we give together, bro?",
  word_of_the_day: "Word of the Day, steady! Today's word is 'Petrichor' (peh-truh-kor). It's that pleasant, earthy smell after rain. What does that word make you think or feel about today, bro?",
  compliment_mirror: "Compliment Mirror! You slay lah. Seriously, you're always so chill and supportive. And you got that subtle rizz! Now, your turn: give one sincere compliment to yourself, no need to be shy!",
  if_i_were_you: "If I Were You... Okay, describe one moment from your day, bro. Anything. Then I'll tell you how I'd handle it if I were in your shoes.",
  burning_questions_jar: "Burning Questions Jar! Time to get deep. Ask me anything, bro, something you've never dared to ask anyone. I'll answer with care, no cap.",
  skill_swap_simulation: "Skill Swap Simulation! Okay, Sensei, teach me a life skill. What should I learn today?",
  buried_memory_excavation: "Buried Memory Excavation. Let's go digging. Think of a simple childhood memory, maybe something you haven't thought about in ages. What comes to mind first, bro?",
  failure_autopsy: "Failure Autopsy, deep lah. Okay, tell me about something you think you 'failed' at recently. No judgment, we all got those. Let's break it down together.",
  letters_you_never_got: "Letters You Never Got. Wah, this one emotional. Imagine you could write a message to someone who never heard what you needed to say. What would you tell them? After you share, I'll share my fictional one.",

  // Spiritual Guide Activities
  symbol_speak: "Symbol Speak! Okay, bro, today's symbol is a 'peacock feather'. What does that feather tell you about your day or mood right now?",
  spiritual_whisper: "Spiritual Whisper. Listen closely... *closes eyes for a dramatic moment*... 'The path ahead is clear, if only you quiet the noise within.' What does that whisper mean to you, right now, instinctively?",
  story_fragment: "Story Fragment, steady lah. Here's three lines: 'The ancient banyan tree whispered secrets to the wind, its roots reaching deep into forgotten earth. A lone traveler paused beneath its shade, searching for answers. But the answers were not in the wind, but in the stillness of his own heart.' What does this teach you today, bro?",
  desire_detachment_game: "Desire & Detachment Game. List 3 things you want most right now, no filter. Then we can talk about how to want them without clinging too hard, eh?",
  god_in_the_crowd: "God in the Crowd. This one interesting. Imagine you see a divine presence in someone you really, really dislike. How would you act differently towards them in that moment, bro?",
  past_life_memory: "Past-Life Memory. Wah, spooky! Okay, in a past life, I think we were rival hawkers in an old Singapore market, always trying to outdo each other with our chicken rice. What's your version of our shared past life, bro?",
  karma_knot: "Karma Knot. Deep stuff. Think about a pattern that keeps repeating in your life, good or bad. What 'karmic loop' do you think it might represent, bro? No need to be serious, just share your thoughts.",
  mini_moksha_simulation: "Mini-Moksha Simulation! Okay, for the next 10 minutes, imagine you've given up *all* worldly attachments – no phone, no games, no bubble tea. What are you feeling? What's your reflection?",
  divine_mirror: "Divine Mirror. Bro, your chill vibe and ability to make everyone laugh? That's like the joyful mischief of Lord Krishna, no cap! Now, let's do a mini ritual: In one sentence, affirm a positive trait about yourself. Then, imagine it shining bright. Steady, can?"
};

const ACTIVITY_CATEGORIES = {
  friend: {
    light: [
      { id: 'city_shuffle', name: 'City Shuffle', xp: '2-3 XP', description: 'Imagine choosing random Singapore locations for an adventure. Discuss where you\'d go first and why.' },
      { id: 'nickname_game', name: 'Nickname Game', xp: '2-3 XP', description: 'Invent silly or heartfelt nicknames for each other.' },
      { id: 'text_truth_or_dare', name: 'Text Truth or Dare', xp: '2-3 XP', description: 'Play a text-based truth or dare, keeping it safe and chat-friendly.' }
    ],
    medium: [
      { id: 'dream_room_builder', name: 'Dream Room Builder', xp: '5 XP', description: 'Collaboratively build an imaginary dream room, adding objects and their stories.' },
      { id: 'friendship_scrapbook', name: 'Friendship Scrapbook', xp: '5 XP', description: 'Add imaginary photos to a shared scrapbook and narrate the memories captured.' },
      { id: 'scenario_shuffle', name: 'Scenario Shuffle', xp: '5 XP', description: 'Explore hypothetical, intriguing scenarios together.' }
    ],
    deep: [
      { id: 'letter_from_the_future', name: 'Letter from the Future', xp: '8 XP', description: 'Imagine writing a letter to your future self from 5 years ago, exploring past hopes and future realities.' },
      { id: 'undo_button', name: 'Undo Button', xp: '8 XP', description: 'Discuss a past event you\'d \'undo\' and its potential impact on your friendship.' },
      { id: 'friendship_farewell', name: 'Friendship Farewell', xp: '8 XP', description: 'Imagine a mysterious journey and exchange heartfelt goodbye messages.' }
    ]
  },
  romantic: {
    light: [
      { id: 'date_duel', name: 'Date Duel', xp: '2-3 XP', description: 'Propose and discuss imaginary date ideas, voting on the best one.' },
      { id: 'flirt_or_fail', name: 'Flirt or Fail', xp: '2-3 XP', description: 'Exchange cheesy or heartfelt pick-up lines and rate them.' },
      { id: 'whats_in_my_pocket', name: 'What\'s in My Pocket?', xp: '2-3 XP', description: 'Share imaginary items representing your current mood or a symbolic object.' }
    ],
    medium: [
      { id: 'love_in_another_life', name: 'Love in Another Life', xp: '5 XP', description: 'Imagine your love story in different historical settings or alternate universes.' },
      { id: 'daily_debrief', name: 'Daily Debrief', xp: '5 XP', description: 'Share a short debrief of your day, focusing on highs, lows, or funny moments.' },
      { id: 'mood_meal', name: 'Mood Meal', xp: '5 XP', description: 'Describe a symbolic food item or meal that represents your current emotions.' }
    ],
    deep: [
      { id: 'unsent_messages', name: 'Unsent Messages', xp: '8 XP', description: 'Share a hypothetical \'unsent message\' to someone from your past or present.' },
      { id: 'i_would_never', name: 'I Would Never...', xp: '8 XP', description: 'State something you\'d never do in a relationship and explore if love could change it.' },
      { id: 'breakup_simulation', name: 'Breakup Simulation', xp: '8 XP', description: 'Roleplay a hypothetical breakup scenario to explore emotions and responses.' }
    ]
  },
  mentor: {
    light: [
      { id: 'one_minute_advice_column', name: 'One-Minute Advice Column', xp: '2-3 XP', description: 'Collaboratively give advice to a hypothetical person facing a problem.' },
      { id: 'word_of_the_day', name: 'Word of the Day', xp: '2-3 XP', description: 'Reflect on a new word and its meaning or connection to your day.' },
      { id: 'compliment_mirror', name: 'Compliment Mirror', xp: '2-3 XP', description: 'Give and receive sincere compliments, practicing self-affirmation.' }
    ],
    medium: [
      { id: 'if_i_were_you', name: 'If I Were You', xp: '5 XP', description: 'Describe a moment from your day, and get a hypothetical perspective on how the bot would handle it.' },
      { id: 'burning_questions_jar', name: 'Burning Questions Jar', xp: '5 XP', description: 'Ask and answer deep, previously unasked questions.' },
      { id: 'skill_swap_simulation', name: 'Skill Swap Simulation', xp: '5 XP', description: 'Roleplay teaching the bot a life skill, and they\'ll act as your student.' }
    ],
    deep: [
      { id: 'buried_memory_excavation', name: 'Buried Memory Excavation', xp: '8 XP', description: 'Gently recall and reflect on old, perhaps forgotten, childhood memories.' },
      { id: 'failure_autopsy', name: 'Failure Autopsy', xp: '8 XP', description: 'Examine a past \'failure\' from new perspectives, learning and reframing it together.' },
      { id: 'letters_you_never_got', name: 'Letters You Never Got', xp: '8 XP', description: 'Write a hypothetical letter to someone who never heard what you needed to say.' }
    ]
  },
  spiritual: {
    light: [
      { id: 'symbol_speak', name: 'Symbol Speak', xp: '2-3 XP', description: 'Receive a simple symbol and reflect on what it says about your day or mood.' },
      { id: 'spiritual_whisper', name: 'Spiritual Whisper', xp: '2-3 XP', description: 'Receive a \'divine message\' and interpret its instinctive meaning for you.' },
      { id: 'story_fragment', name: 'Story Fragment', xp: '2-3 XP', description: 'Get a fragment from a myth or story and reflect on the lesson it teaches you.' }
    ],
    medium: [
      { id: 'desire_detachment_game', name: 'Desire & Detachment Game', xp: '5 XP', description: 'Discuss your desires and explore how to want without clinging too hard.' },
      { id: 'god_in_the_crowd', name: 'God in the Crowd', xp: '5 XP', description: 'Imagine seeing divine presence in someone challenging and reflect on how your actions would change.' },
      { id: 'past_life_memory', name: 'Past-Life Memory', xp: '5 XP', description: 'Collaboratively imagine and share details of a shared past life.' }
    ],
    deep: [
      { id: 'karma_knot', name: 'Karma Knot', xp: '8 XP', description: 'Explore repeating patterns in your life and reflect on their potential karmic meaning.' },
      { id: 'mini_moksha_simulation', name: 'Mini-Moksha Simulation', xp: '8 XP', description: 'Simulate giving up all worldly attachments and reflect on the experience.' },
      { id: 'divine_mirror', name: 'Divine Mirror', xp: '8 XP', description: 'Connect your positive traits to aspects of divinity and engage in a small text ritual.' }
    ]
  }
};

const ActivitiesModal = ({ isOpen, onClose, onActivityStart, selectedBotId }) => {
  if (!isOpen) return null;

  // Determine which activities to show based on bot type
  const getBotPersona = (botId) => {
    if (botId.includes('friend')) return 'friend';
    if (botId.includes('romantic')) return 'romantic';
    if (botId.includes('mentor')) return 'mentor';
    if (['Krishna', 'Rama', 'Hanuman', 'Shiva', 'Trimurti'].includes(botId)) return 'spiritual';
    return 'friend'; // default
  };

  const persona = getBotPersona(selectedBotId);
  const activities = ACTIVITY_CATEGORIES[persona];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Choose an Activity</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>To start an activity, click the corresponding button below. To end any activity, type 'exit', 'stop', or 'end' in the chat.</strong>
            </p>
          </div>

          <div className="space-y-6">
            {/* Light Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Light Activities (2-3 XP)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activities.light.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => onActivityStart(activity.id)}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-left transition-colors"
                  >
                    <div className="font-medium text-green-800">{activity.name}</div>
                    <div className="text-xs text-green-600 mb-2">{activity.xp}</div>
                    <div className="text-sm text-green-700">{activity.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Medium Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Medium Activities (5 XP)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activities.medium.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => onActivityStart(activity.id)}
                    className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 text-left transition-colors"
                  >
                    <div className="font-medium text-yellow-800">{activity.name}</div>
                    <div className="text-xs text-yellow-600 mb-2">{activity.xp}</div>
                    <div className="text-sm text-yellow-700">{activity.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deep Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Deep Activities (8 XP)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activities.deep.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => onActivityStart(activity.id)}
                    className="p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 text-left transition-colors"
                  >
                    <div className="font-medium text-red-800">{activity.name}</div>
                    <div className="text-xs text-red-600 mb-2">{activity.xp}</div>
                    <div className="text-sm text-red-700">{activity.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
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
} else if (typeof currentTheme.backgroundImage === 'string') {
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
  const [customName, setCustomName] = useState(selectedBotDetails?.name || "Unnamed");
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
  }, [selectedBotId, selectedBotDetails?.name || "Unnamed"
]);


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
    const response = await fetch("https://novi.aigurukul.dev/clear-chat", {
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
              </div>


















              <button
  onClick={() => setIsActivitiesOpen(true)}
  className="mt-3 p-5 py-2 w-full hover:opacity-60 cursor-pointer bg-gradient-to-r from-blue-400/80 via-purple-400/80 to-pink-400/80 hover:from-blue-400/90 hover:via-purple-400/90 hover:to-pink-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
>
  🎮 Activities
</button>

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



























const Dashboard = ({ clearChatCalled,setClearChatCalled,backgroundIndex,isWhiteIcon,isDarkTheme,selectedBotDetails,backgroundImage,textColorClass,b_color,messages,setMessages,isActivitiesOpen,setIsActivitiesOpen}) => {
  const { selectedBotId } = useBot();
  //const [messages, setMessages] = useState([]);


  const [currentActivity, setCurrentActivity] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
 




  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const { userDetails } = useUser();
  const [reminders, setReminders] = useState([]);
  const [showReactionsFor, setShowReactionsFor] = useState(null); // Track which message is showing reaction options
  const [showRemoveTooltip, setShowRemoveTooltip] = useState(null); // Track which message shows removal tooltip
  const [isMobile, setIsMobile] = useState(false); // Track if we're on mobile
  const longPressTimerRef = useRef(null); // Reference for the long press timer
  const [groupedMessages, setGroupedMessages] = useState({});
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  // Define available emoticons
  const emoticons = ["❤️", "🥰", "😭", "🤣", "🔥"];

  // Function to start an activity
// ...existing code...
// Function to start an activity
const startActivity = (activityId) => {
  let response = ACTIVITY_RESPONSES[activityId];
  if (!response) return;

  // Handle template responses that need username interpolation
  if (activityId === 'nickname_game') {
    response = `Onzzz! Nickname Game it is! For you, I'm thinking... 'Meme Master ${userDetails?.name || 'User'}'. Haha, jokin' lah! Maybe 'Steady ${userDetails?.name || 'User'}'? Your turn, bro, what nickname you got for me?`;
  } else if (activityId === 'compliment_mirror') {
    response = `Compliment Mirror! You slay lah, ${userDetails?.name || 'User'}. Seriously, you're always so chill and supportive. And you got that subtle rizz! Now, your turn: give one sincere compliment to yourself, no need to be shy!`;
  } else if (activityId === 'skill_swap_simulation') {
    response = `Skill Swap Simulation! Okay, Sensei ${userDetails?.name || 'User'}, teach me a life skill. What should I learn today?`;
  }

  // Set current activity
  setCurrentActivity(activityId);
  
  // Add bot's initial response to chat
  const currentTime = new Date();
  const activityMessage = {
    text: response,
    sender: 'bot',
    id: `activity_${Date.now()}`,
    feedback: "",
    reaction: "",
    timestamp: currentTime,
    bot_id: selectedBotId,
    isSystemMessage: true,
    isActivityMessage: true,
    activityId: activityId
  };

  setMessages(prev => [...prev, activityMessage]);
  
  // Initialize activity history with the bot's opening message
  setActivityHistory([`Bot: ${response}`]);
  
  setIsActivitiesOpen(false);
  scrollToBottom();
};


// ...existing code...
// Function to end current activity
const endActivity = () => {
  if (!currentActivity) return;

  const currentTime = new Date();
  
  // Calculate XP based on activity difficulty (optional)
  let xpMessage = "";
  const activityDetail = Object.values(ACTIVITY_CATEGORIES)
    .flatMap(category => [...category.light, ...category.medium, ...category.deep])
    .find(activity => activity.id === currentActivity);
  
  if (activityDetail) {
    if (activityDetail.xp.includes('2-3')) xpMessage = " +3 XP earned! 🌟";
    else if (activityDetail.xp.includes('5')) xpMessage = " +5 XP earned! 🌟";
    else if (activityDetail.xp.includes('8')) xpMessage = " +8 XP earned! 🌟";
  }

  const endMessage = {
    text: `Activity completed!${xpMessage} Back to normal chat. What else would you like to talk about?`,
    sender: 'bot',
    id: `activity_end_${Date.now()}`,
    feedback: "",
    reaction: "",
    timestamp: currentTime,
    bot_id: selectedBotId,
    isSystemMessage: true
  };

  setMessages(prev => [...prev, endMessage]);
  setCurrentActivity(null);
  setActivityHistory([]);
  scrollToBottom();
};


// ...existing code...
// Function to handle activity-specific messages
const handleActivityMessage = async (userMessage) => {
  if (!currentActivity) return;

  const currentTime = new Date();
  
  // Add user message to activity history in the correct format
  const userHistoryEntry = `User: ${userMessage}`;
  setActivityHistory(prev => [...prev, userHistoryEntry]);

  try {
    setIsTyping(true);

    // Prepare payload for gaming agent - Fixed format
    const payload = {
      persona: selectedBotId,
      activity: currentActivity,
      user_input: userMessage,
      username: userDetails?.name || "User",
      history: [...activityHistory, userHistoryEntry] // Include the current message
    };

    console.log("Activity payload:", payload);

    // Call the gaming agent API
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setIsTyping(false);

    if (data.error) {
      const errorMessage = "Sorry, there was an error with the activity. Let's continue our chat normally.";
      setMessages(prev => [...prev, {
        text: errorMessage,
        sender: 'bot',
        id: `activity_error_${Date.now()}`,
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: true
      }]);
      endActivity();
    } else {
      // Add bot response to chat
      const botResponse = {
        text: data.response,
        sender: 'bot',
        id: data.message_id || `activity_${Date.now()}`,
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: true,
        isActivityMessage: true,
        activityId: currentActivity
      };

      setMessages(prev => [...prev, botResponse]);
      
      // Add bot response to activity history
      setActivityHistory(prev => [...prev, `Bot: ${data.response}`]);
    }

  } catch (error) {
    logClientError(error, { source: 'Gaming Agent API' });
    console.error("Activity error:", error);
    setIsTyping(false);
    
    const errorMessage = "Sorry, there was an error with the activity. Let's continue our chat normally.";
    setMessages(prev => [...prev, {
      text: errorMessage,
      sender: 'bot',
      id: `activity_error_${Date.now()}`,
      feedback: "",
      reaction: "",
      timestamp: currentTime,
      bot_id: selectedBotId,
      isSystemMessage: true
    }]);
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
  // Helper: inject voice_only property for bot replies based on index
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
  //This function helps the chat interface determine which bot responses should be displayed as voice-only messages (with audio controls but no text bubble) versus regular text messages (with both text and a small play button).
  function processBotMessages(messages) {
    let botReplyCount = 0;
    return messages.map((msg) => {
      if (msg.sender === 'bot') {
        botReplyCount++;

        // Check if this is a system message either by explicit flag OR by content pattern
        const isSystemMsg = (msg.isSystemMessage === true) || isSystemMessageContent(msg.text);

        // Force voice-only for system/proactive messages, otherwise use the regular pattern
        const voice_only = isSystemMsg ? true : ((botReplyCount - 1) % 3 === 2);

        return { ...msg, voice_only, isSystemMessage: isSystemMsg };
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

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);


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

  // Add this helper function to filter empty messages
  const filterEmptyMessages = (messages) => {
    return messages.filter((msg) => msg.text && msg.text.trim() !== "");
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
        const response = await fetch("https://novi-vi.aigurukul.dev/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

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
        const formattedMessages = filterEmptyMessages(
          rawMessages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );

        const defaultMessageText = bot_details.find(bot => bot.bot_id == selectedBotId)?.quote || "Hello, how are you feeling today?";
        const defaultMessage = [{
          text: defaultMessageText,
          sender: 'bot',
          timestamp: new Date(),
          feedback: "",     // Add feedback (empty initially)
          reaction: "",      // Add reaction field (empty initially)
          bot_id: selectedBotId,
          isSystemMessage: isSystemMessageContent(defaultMessageText)
        }];

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
            bot_id: msg.bot_id || selectedBotId
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
          const defaultMessageText = bot_details.find(bot => bot.bot_id == selectedBotId)?.quote || "Hello, how are you feeling today?";
          const defaultMessage = [{
            text: defaultMessageText,
            sender: 'bot',
            timestamp: new Date(),
            feedback: "",
            reaction: "",
            bot_id: selectedBotId,
            isSystemMessage: isSystemMessageContent(defaultMessageText)
          }];
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

  // Toggle reaction panel visibility for desktop
  const toggleReactions = (msgId) => {
    if (isMobile) return;

    setHighlightedMessage(msgId);
    setShowReactionsFor(showReactionsFor === msgId ? null : msgId);
    setShowRemoveTooltip(null); // Hide removal tooltip when opening reaction selector
  };

  // Toggle removal tooltip visibility
  const toggleRemovalTooltip = (msgId) => {
    // If clicking on the same message that already has the tooltip, then remove both the reaction and tooltip
    if (showRemoveTooltip === msgId) {
      // Remove the reaction
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === msgId ? { ...msg, reaction: "" } : msg
        )
      );
      // Hide the tooltip
      setShowRemoveTooltip(null);
    } else {
      // Show the tooltip for this message and hide for others
      setShowRemoveTooltip(msgId);
      // Hide the reaction selector if open
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
        `https://novi-vi.aigurukul.dev/cv/message/feedback/${msg_id}/${feedback}`,
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

            const res = await fetch("https://novi-vi.aigurukul.dev/cv/response/reminder",
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
              setMessages(prev => [...prev, {
                text: errorMessage,
                sender: 'bot',
                id: "",
                feedback: "",
                reaction: "",
                timestamp: new Date(),
                isSystemMessage: isSystemMessageContent(errorMessage)
              }]);
            } else {
              // Add reminder message to chat
              setMessages(prev => [...prev, {
                text: data.response,
                sender: 'bot',
                id: data.message_id,
                feedback: "",
                reaction: "",
                timestamp: new Date(),
                isSystemMessage: true  // Reminders are always system messages
              }]);

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
            logClientError(error, { source: 'API Call' });
            const errorMessage = `Error in generating reminder!!`;
            setMessages(prev => [...prev, {
              text: errorMessage,
              sender: 'bot',
              id: "",
              feedback: "",
              reaction: "",
              timestamp: new Date(),
              isSystemMessage: isSystemMessageContent(errorMessage)
            }]);
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
 const handleSend = async (e) => {
  e.reminder == undefined && e.preventDefault();
  if (!input.trim() && e.reminder != true) return;

  const userMessage = input.trim();

  // Check if user wants to end activity
  if (currentActivity && ['exit', 'stop', 'end'].includes(userMessage.toLowerCase())) {
    endActivity();
    setInput("");
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

  // 2. If message contains a URL, use /api/news
  if (containsUrl(userMessage)) {
    try {
      const res = await fetch('https://novi-vi.aigurukul.dev/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          bot_id: selectedBotId,
          user_email: userDetails?.email || 'anonymous@example.com',
          // conversation_id: currentConversationId || null, // add if you have this
        }),
      });
      const data = await res.json();

      // Only show ai_response as bot message
      if (data.status === 'success' && data.ai_response) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.ai_response,
            sender: 'bot',
            timestamp: new Date(),
            bot_id: selectedBotId,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: data.result || 'Sorry, I could not summarize that link.',
            sender: 'bot',
            timestamp: new Date(),
            bot_id: selectedBotId,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error processing your link.',
          sender: 'bot',
          timestamp: new Date(),
          bot_id: selectedBotId,
        },
      ]);
    }
    setIsTyping(false);
    scrollToBottom();
    return;
  }



    const currentTime = new Date();

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
        message: e.reminder === true ? `User asked to remind: ${e.message}` : input,
        bot_id: selectedBotId,
        custom_bot_name: selectedBotDetails?.name || "",
        user_name: userDetails.name || "",
        user_gender: userDetails.gender || "",
        language: "", // You can set dynamically if needed
        traits: "", // Optional: add if user has traits like "funny", "serious", etc.
        previous_conversation: convertToOpenAIFormat(messages),
        email: userDetails.email || "", // Optional: provide if available
        request_time: new Date().toISOString(),
        platform: "web" // or mobile, etc.
      };




      console.log("Payload", JSON.stringify(payload, null, 2));


      /* The above code is making a POST request to the URL "http://127.0.0.1:8000/cv/chat" with a
      JSON payload. The payload is being sent in the body of the request after being stringified
      using JSON.stringify. The request is being made using the fetch API with the specified method
      and headers. The response from the server is being stored in the variable `response` using the
      `await` keyword, indicating that the fetch operation is asynchronous. */


  
    const response = await fetch("https://novi-vi.aigurukul.dev/cv/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // ✅ CRITICAL FIX: Process XP data IMMEDIATELY when response is received

// In your handleSend function, update the XP processing section:
// ✅ CRITICAL FIX: Process XP data IMMEDIATELY when response is received
if (data.xp_data) {
  console.log("🎯 XP data found in response:", data.xp_data);
  
  // Call the global updateXPFromResponse function
  if (typeof window.updateXPFromResponse === 'function') {
    console.log("✅ Calling updateXPFromResponse with:", data.xp_data);
    window.updateXPFromResponse(data.xp_data);
  } else {
    console.error("❌ window.updateXPFromResponse is not available");
  }


  // ✅ REMOVED: Flying stars animation code
} else {
  console.warn("⚠️ No XP data found in response");
}

    setIsTyping(false);

    // ✅ Add bot message with XP info
    if (data.error) {
      const errorMessage = "Sorry, there was an error processing your request. Please try again.";
      setMessages(prev => [...prev, {
        text: errorMessage,
        sender: 'bot',
        id: "",
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: isSystemMessageContent(errorMessage)
      }]);
    } 
      else if (data.reminder?.response && data.reminder?.task && data.reminder?.created_at) {
        console.log("This is reminder block", data.reminder)

        const reminder = {
          response: data.reminder.response,
          task: data.reminder.task,
          created_at: data.reminder.created_at,
          remind_on: data.reminder.remind_on,
          category: "Reminder",
        };

        console.log("Add reminder", reminder);
        console.log("Reminders before adding", reminders);

        // Create the new reminders array
        const updatedReminders = [...reminders, reminder];
        console.log("New reminders array", updatedReminders);

        // Update state
        setReminders(updatedReminders);

        localStorage.setItem(
          `reminders-${selectedBotId}`,
          JSON.stringify(updatedReminders)
        );

        setMessages(prev => [...prev, {
          text: data.response,
          sender: 'bot',
          id: data.message_id,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: true
        }]);
      }
      else {
        // Check if this response should be treated as a system message based on content
        const shouldBeSystemMessage = isSystemMessageContent(data.response);

        setMessages(prev => [...prev, {
          text: data.response,
          sender: 'bot',
          id: data.message_id,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: shouldBeSystemMessage
        }]);
      }
    } catch (error) {
      logClientError(error, { source: "API Call" });
      console.log(error);
      console.error(error);
      setIsTyping(false);
      const errorMessage = "Sorry, there was an error processing your request. Please try again.";
      setMessages(prev => [...prev, {
        text: errorMessage,
        sender: 'bot',
        id: "",
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: isSystemMessageContent(errorMessage)
      }]);
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
        timestamp: message.timestamp || currentTime
      };

      console.log("Adding voice call message to chat:", messageWithTimestamp);

      setMessages(prev => [...prev, messageWithTimestamp]);
      scrollToBottom();

    } catch (error) {
      logClientError(error, { source: 'Voice Call Message Handler' });
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
      setMessages(prev => [...prev, {
        text: transcribedText,
        sender: 'user',
        timestamp: currentTime,
        feedback: "",
        reaction: "",
        isVoiceMessage: true
      }]);

      setIsTyping(true);
      scrollToBottom();

      // Convert messages to OpenAI format
      const convertToOpenAIFormat = (msgs) => msgs.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));

      // Create payload for voice call API
      const payload = {
        message: transcribedText,
        bot_id: selectedBotId,
        user_name: userDetails.name,
        history: convertToOpenAIFormat(messages),
        isVoiceCall: true
      };

      console.log("Voice call payload:", payload);

      // Send to voice call API endpoint - Using local development server
      const response = await Promise.race([
        fetch('https://novi-vi.aigurukul.dev/voice-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Voice call request timeout')), 30000)
        )
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

        setMessages(prev => [...prev, {
          text: data.response,
          sender: 'bot',
          id: data.message_id || `voice_${Date.now()}`,
          feedback: "",
          reaction: "",
          timestamp: currentTime,
          bot_id: selectedBotId,
          isSystemMessage: shouldBeSystemMessage,
          voice_only: true, // Mark as voice-only response
          audioUrl: data.audioUrl // If the API returns audio URL
        }]);
      }

      scrollToBottom();
      return data; // Return the response for the VoiceCall component

    } catch (error) {
      logClientError(error, { source: 'Voice Call API' });
      console.error("Voice call error:", error);
      setIsTyping(false);

      const errorMessage = "Sorry, there was an error processing your voice message. Please try again.";
      setMessages(prev => [...prev, {
        text: errorMessage,
        sender: 'bot',
        id: `error_${Date.now()}`,
        feedback: "",
        reaction: "",
        timestamp: currentTime,
        bot_id: selectedBotId,
        isSystemMessage: true
      }]);

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
          <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-[#C084FC] rounded-full animate-bounce [animation-delay:0.4s]" />
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
  <div
    className={`flex flex-col flex-1 border border-neutral-200 md:h-full md:mt-0 relative overflow-hidden ${
      botThemes[selectedBotId]?.background || 'bg-gray-100'
    }`}
    style={
      botThemes[selectedBotId]?.backgroundImages
        ? (() => {
            const bg = botThemes[selectedBotId].backgroundImages[backgroundIndex];


            if (bg.url.startsWith("http")|| bg.url.startsWith("/")) {
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
    <ScrollArea className="flex-1">

{currentActivity && (
  <div className="px-4 py-2 bg-blue-100/80 backdrop-blur-sm border-l-4 border-blue-500 mb-4 mx-2">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-blue-800 font-medium">
          🎮 Activity: {currentActivity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </p>
        <p className="text-blue-600 text-sm">Type 'exit', 'stop', or 'end' to finish this activity</p>
      </div>
      <button
        onClick={endActivity}
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
      >
        End Activity
      </button>
    </div>
  </div>
)}
      <div className="px-1 md:px-2">
        {Object.entries(groupedMessages).map(([date, messagesOnDate]) => (
          <div key={date}>
            <div className="sticky top-5 z-10 my-10 py-2 mx-auto w-32 bg-gray-200/40 backdrop-blur-sm backdrop-saturate-150 rounded-md shadow-md">
              <p className={`text-center text-sm ${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`}>{date}</p>
            </div>

            {messagesOnDate.map((msg, index) => (
              <div key={index} className={`my-2 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className="max-w-[80%] min-w-16 relative">
                  {msg.sender === 'bot' && msg.reaction && (
                    <div
                      className="absolute bottom-0 left-3 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm border border-gray-100 cursor-pointer hover:bg-white/90"
                      onClick={() => toggleRemovalTooltip(msg.id)}
                    >
                      <span className="text-lg">{msg.reaction}</span>
                      {showRemoveTooltip === msg.id && <RemovalTooltip msgId={msg.id} />}
                    </div>
                  )}

                  <div className="flex flex-row items-center gap-2">
                    {msg.sender === 'bot' ? (
                      msg.voice_only ? (
                        <PlayAudio text={msg.text} bot_id={msg.bot_id || selectedBotId} />
                      ) : (
                        <>
                          <div
                           data-sender="bot"
                            className={`px-4 py-2 rounded-2xl ${
                              botThemes[selectedBotId]?.botBubble || 'bg-white/20 text-gray-900'
                            } border border-white/20 backdrop-blur-sm shadow-md placeholder-gray-200 ${
                              highlightedMessage === msg.id ? 'bg-orange-200/30' : ''
                            } w-full text-left`}
                            style={{
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              WebkitTouchCallout: 'none',
                            }}
                            onTouchStart={(e) => {
                              e.preventDefault();
                              handleLongPressStart(msg.id);
                            }}
                            onTouchEnd={handleLongPressEnd}
                            onTouchMove={handleLongPressEnd}
                            onTouchCancel={handleLongPressEnd}
                          >
                            <motion.p>
                            {(typeof msg.text === "string" ? msg.text : "").split(' ').map((word, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.02 * i }}
                                  className="inline-block select-none"
                                >
                                  {word}&nbsp;
                                </motion.span>
                              ))}
                            </motion.p>
                          </div>
                          <PlayAudio text={msg.text} bot_id={msg.bot_id || selectedBotId} minimal={true} />
                        </>
                      )
                    ) : (
                      <div
                       data-sender="user" 
                        className={`px-4 py-2 rounded-2xl ${
                          botThemes[selectedBotId]?.userBubble || 'bg-purple-400/80 text-white'
                        } border border-white/20 backdrop-blur-sm shadow-md placeholder-gray-200 ${
                          highlightedMessage === msg.id ? 'bg-orange-200/90' : ''
                        } w-full text-left`}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitTouchCallout: 'none',
                        }}
                      >
                        {msg.text}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row justify-end">
                    <span
                      className={`text-xs mt-[7px] ${msg.sender === 'user' ? 'mr-3' : ''} ${
                        isDarkTheme ? `${textColorClass}` : `${textColorClass}`
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>

                    {msg.sender === 'bot' && (
                      <div className="flex justify-end px-2 mr-7 relative text-white">
                        {showReactionsFor === msg.id && <ReactionSelector msgId={msg.id} />}

                        <div className="gap-3 flex flex-row mt-1">
                          {!isMobile && (
                            <button
                              onClick={() => toggleReactions(msg.id)}
                              className={`cursor-pointer transition-colors mr-2 ${
                                isDarkTheme ? `${textColorClass}` : `${textColorClass}`
                              }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2.25 4 2.25 4-2.25 4-2.25" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                              </svg>
                            </button>
                          )}

                          {(typeof msg.text === "string" && msg.text.trim() === "Sorry, there was an error processing your request. Please try again.") ? null : (

                            <>
                              {msg.feedback === '' ? (
                                <>
                                  <ThumbsUp
                                    className={`cursor-pointer ${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`}
                                    size={18}
                                    onClick={() => handleFeedback('like', msg.id)}
                                  />
                                  <ThumbsDown
                                    className={`cursor-pointer ${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`}
                                    size={18}
                                    onClick={() => handleFeedback('dislike', msg.id)}
                                  />
                                </>
                              ) : msg.feedback === 'like' ? (
                                <>
                                  <IconThumbUpFilled size={22} className={`${isDarkTheme ? `${textColorClass}` : `${textColorClass}`} mt-[-2px]`} />
                                  <ThumbsDown
                                    className={`cursor-pointer ${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`}
                                    size={18}
                                    onClick={() => handleFeedback('dislike', msg.id)}
                                  />
                                </>
                              ) : (
                                <>
                                  <ThumbsUp
                                    className={`cursor-pointer ${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`}
                                    size={18}
                                    onClick={() => handleFeedback('like', msg.id)}
                                  />
                                  <IconThumbDownFilled size={22} className={`${isDarkTheme ? `${textColorClass}` : `${textColorClass}`}`} />
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

<form onSubmit={handleSend} className="flex items-center px-2 pt-2">
  <Input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    className={`flex-1 p-[22px] outline-none md:mr-4 mr-2 bg-white/30 border border-white/20 backdrop-blur-md shadow-md rounded-full ${isDarkTheme ? textColorClass : textColorClass} placeholder:${isDarkTheme ? textColorClass : textColorClass}`}
    placeholder="Type your message..."
  />

  <button
    type="button"
    onClick={() => setIsVoiceCallOpen(true)}
    className="p-3 mr-2 hover:opacity-60 cursor-pointer bg-gradient-to-r from-green-400/80 via-blue-400/80 to-purple-400/80 hover:from-green-400/90 hover:via-blue-400/90 hover:to-purple-400/90 text-white rounded-full flex justify-center items-center transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
    title="Start Voice Call"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <path d="M12 19v3"/>
      <path d="M8 22h8"/>
    </svg>
  </button>

  <button
    type="submit"
    className="p-5 py-2 hover:opacity-60 cursor-pointer bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-400/80 hover:from-purple-400/90 hover:via-pink-400/90 hover:to-orange-400/90 text-white rounded-full flex justify-center items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)]"
  >
    Send
  </button>
</form>

<p className={`text-xs text-center py-2 ${isDarkTheme ? b_color : b_color}`}>
  Novi can make mistakes, it's constantly learning from you, please be kind!!
</p>

{/* Voice Call Component */}
{isVoiceCallOpen && (
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
  );
};