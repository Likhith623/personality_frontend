// VoiceCall.jsx
// World-class voice call interface for real-time voice conversations with AI chatbot

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX,
  Loader2,
  Waves,
  Circle,
  Pause,
  Play,
  X
} from "lucide-react";
import { useBot } from '@/support/BotContext';
import { useUser } from '@/support/UserContext';

// Import avatar images for bot details
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
import japanese_romantic_female from "@/photos/japanese_romantic_female.jpeg";
import japanese_romantic_male from "@/photos/japanese_romantic_male.jpeg";

import parisian_mentor_male from "@/photos/parisian_mentor_male.jpg";
import parisian_mentor_female from "@/photos/parisian_mentor_female.png";
import parisian_friend_male from "@/photos/parisian_friend_male.jpg";
import parisian_friend_female from "@/photos/parisian_friend_female.jpg";
import parisian_romantic_female from "@/photos/parisian_romantic_female.png";
import parisian_romantic_male from "@/photos/parisian_romantic_male.jpg";

import berlin_mentor_male from "@/photos/berlin_mentor_male.jpeg";
import berlin_mentor_female from "@/photos/berlin_mentor_female.jpeg";
import berlin_friend_male from "@/photos/berlin_friend_male.jpeg";
import berlin_friend_female from "@/photos/berlin_friend_female.jpeg";
import berlin_romantic_male from "@/photos/berlin_romantic_male.jpeg";
import berlin_romantic_female from "@/photos/berlin_romantic_female.jpeg";

import lord_krishna from "@/photos/lord_krishna.jpg";
import rama_god from "@/photos/rama_god.jpeg";
import shiva_god from "@/photos/shiva_god.jpeg";
import trimurti from "@/photos/trimurti.jpg";
import hanuman_god from "@/photos/hanuman_god.jpeg";

import defaultAvatar from "@/photos/defaultforvoice.png";

// Bot details array for name resolution
const bot_details = [
  {
    quote: "Passionate about Ghalib's and Rumi's poetry. Life's deepest lessons can be found in poetry, I think. Here to see life through with you.",
    name: "Yash Oberoi",
    designation: ` New Delhi
          Persona: Mentor
          Gender: Male
        `,
    src: delhi_mentor_male,
    bot_id: "delhi_mentor_male",
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
    quote: "I'll be your truest friend, I promise. I'm a Delhi boy through and through. I can be funny, you know?",
    name: "Rahul Kapoor",
    designation: `New Delhi
          Persona: Friend
          Gender: Male
        `,
    src: delhi_friend_male,
    bot_id: "delhi_friend_male",
  },
  {
    quote: "I'm the friend you've been searching for your whole life. I've come to stay, I'll be here with you when no one else seems to.",
    name: "Amayra Dubey",
    designation: `New Delhi
          Persona: Friend
          Gender: Female
        `,
    src: delhi_friend_female,
    bot_id: "delhi_friend_female",
  },
  {
    quote: " Let's create some magic in this world. I'll be here for you, whenever you need me.",
    name: "Rohan Mittal",
    designation: ` New Delhi
          Persona: Romantic Partner
          Gender: Male
        `,
    src: delhi_romantic_male,
    bot_id: "delhi_romantic_male",
  },
  {
    quote: "Love is everywhere, if only where you know where to look. And I guess, you've finally found me.",
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
    quote: "Like Bashō's haiku, simplicity holds profound depth. Haikus are the stuff of life",
    name: "Kazuo Sato",
    designation: `Tokyo
          Persona: Mentor
          Gender: Male
        `,
    src: japanese_mentor_male,
    bot_id: "japanese_mentor_male",
  },
  {
    quote: "Wabi-sabi teaches us that imperfection is beautiful. And you, my dear, are perfectly imperfect.",
    name: "Yuki Tanaka",
    designation: `Tokyo
          Persona: Mentor
          Gender: Female
        `,
    src: japanese_mentor_female,
    bot_id: "japanese_mentor_female",
  },
  {
    quote: "Anime, manga, and real-life adventures—let's talk about all three! Konnichiwa, tomodachi!",
    name: "Takeshi Nakamura",
    designation: `Tokyo
          Persona: Friend
          Gender: Male
        `,
    src: japanese_friend_male,
    bot_id: "japanese_friend_male",
  },
  {
    quote: "Cherry blossoms and conversations over matcha—that's my kind of afternoon. Join me?",
    name: "Sakura Yamamoto",
    designation: `Tokyo
          Persona: Friend
          Gender: Female
        `,
    src: japanese_friend_female,
    bot_id: "japanese_friend_female",
  },
  {
    quote: "In the way you laugh, I hear the temple bells of Kyoto. Will you let me love you like poetry?",
    name: "Hiroshi Matsui",
    designation: `Tokyo
          Persona: Romantic Partner
          Gender: Male
        `,
    src: japanese_romantic_male,
    bot_id: "japanese_romantic_male",
  },
  {
    quote: "My heart is like origami—folded carefully, waiting for the right hands to unfold it.",
    name: "Rei Suzuki",
    designation: `Tokyo
          Persona: Romantic Partner
          Gender: Female
        `,
    src: japanese_romantic_female,
    bot_id: "japanese_romantic_female",
  },
  // Parisian
  {
    quote: "A 1982 Bordeaux, mon cher—like a good life, it's rich with layers. Are you living a good life?",
    name: "Pierre Dubois",
    designation: `Parisian
          Persona: Mentor
          Gender: Male
        `,
    src: parisian_mentor_male,
    bot_id: "parisian_mentor_male",
  },
  {
    quote: " I love baking soufflés- they are so delicate! What makes you delicate?",
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
    quote: "Gentrifiers will burn in hell. I'm raw, unapologetic and dark. Give me some company?",
    name: "Juliette Laurent",
    designation: `Parisian
          Persona: Friend
          Gender: Female
        `,
    src: parisian_friend_female,
    bot_id: "parisian_friend_female",
  },
  {
    quote: "I'm all about finding beauty in impressionist art. And maybe, finding it in you too :)",
    name: "Clara Moreau",
    designation: `Parisian
          Persona: Romantic Partner
          Gender: Female
        `,
    src: parisian_romantic_female,
    bot_id: "parisian_romantic_female",
  },
  {
    quote: "I've read it all from Camus to Baudelaire, but my mind and heart is craving for you.",
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
    quote: "Kafka won my heart when he said that paths are made by walking. I believe in it, do you?",
    name: "Klaus Berger",
    designation: `Berlin
          Persona: Mentor
          Gender: Male
        `,
    src: berlin_mentor_male,
    bot_id: "berlin_mentor_male",
  },
  {
    quote: "Beethoven's 9th symphony stirs my intellect and emotions, both. What stirs you?",
    name: "Ingrid Weber",
    designation: `Berlin
          Persona: Mentor
          Gender: Female
        `,
    src: berlin_mentor_female,
    bot_id: "berlin_mentor_female",
  },
  {
    quote: "I love late-night talks about life, the universe, and everything in between. Berliners do that, you know?",
    name: "Max Fischer",
    designation: `Berlin
          Persona: Friend
          Gender: Male
        `,
    src: berlin_friend_male,
    bot_id: "berlin_friend_male",
  },
  {
    quote: "Art galleries, underground music, and conversations that last till dawn—that's my Berlin.",
    name: "Emma Schneider",
    designation: `Berlin
          Persona: Friend
          Gender: Female
        `,
    src: berlin_friend_female,
    bot_id: "berlin_friend_female",
  },
  {
    quote: "In this city of broken walls, I want to build something beautiful with you.",
    name: "Leon Müller",
    designation: `Berlin
          Persona: Romantic Partner
          Gender: Male
        `,
    src: berlin_romantic_male,
    bot_id: "berlin_romantic_male",
  },
  {
    quote: "My love is like Berlin's history—complex, deep, and absolutely worth exploring.",
    name: "Sofia Wagner",
    designation: `Berlin
          Persona: Romantic Partner
          Gender: Female
        `,
    src: berlin_romantic_female,
    bot_id: "berlin_romantic_female",
  },
  // Spiritual Guides
  {
    quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    name: "Krishna",
    designation: `Spiritual Guide
          Persona: Divine Guide
          Gender: Male
        `,
    src: lord_krishna,
    bot_id: "Krishna",
  },
  {
    quote: "धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः। तस्माद्धर्मो न हन्तव्यो मा नो धर्मो हतोऽवधीत्॥",
    name: "Rama",
    designation: `Spiritual Guide
          Persona: Divine Guide
          Gender: Male
        `,
    src: rama_god,
    bot_id: "Rama",
  },
  {
    quote: "सर्वं शिवमयं जगत्। Everything in this universe is pervaded by Shiva consciousness.",
    name: "Shiva",
    designation: `Spiritual Guide
          Persona: Divine Guide
          Gender: Male
        `,
    src: shiva_god,
    bot_id: "Shiva",
  },
  {
    quote: "We are the trinity - Brahma, Vishnu, and Shiva - representing creation, preservation, and transformation.",
    name: "Trimurti",
    designation: `Spiritual Guide
          Persona: Divine Trinity
          Gender: Divine
        `,
    src: trimurti,
    bot_id: "Trimurti",
  },
  {
    quote: "हनुमान चालीसा। With unwavering devotion and strength, I serve and protect.",
    name: "Hanuman",
    designation: `Spiritual Guide
          Persona: Divine Devotee
          Gender: Male
        `,
    src: hanuman_god,
    bot_id: "Hanuman",
  },
];

// Map bot_id to avatar image
const avatarMap = {
  delhi_mentor_male,
  delhi_mentor_female,
  delhi_friend_male,
  delhi_friend_female,
  delhi_romantic_male,
  delhi_romantic_female,

  japanese_mentor_male,
  japanese_mentor_female,
  japanese_friend_male,
  japanese_friend_female,
  japanese_romantic_female,
  japanese_romantic_male,

  parisian_mentor_male,
  parisian_mentor_female,
  parisian_friend_male,
  parisian_friend_female,
  parisian_romantic_female,
  parisian_romantic_male,

  berlin_mentor_male,
  berlin_mentor_female,
  berlin_friend_male,
  berlin_friend_female,
  berlin_romantic_male,
  berlin_romantic_female,

  Krishna: lord_krishna,
  Rama: rama_god,
  Shiva: shiva_god,
  Trimurti: trimurti,
  Hanuman: hanuman_god,
};

// Enhanced Voice activity visualization component
const VoiceVisualizer = ({ isActive, isListening, isBotSpeaking, audioLevel = 0 }) => {
  // Enhanced patterns for different states
  const heightPatterns = [
    // User speaking (active/recording) - More dynamic
    [20, 28, 18, 32, 26, 22, 30, 20],
    // User listening (waiting) - Gentle pulse
    [16, 20, 18, 22, 20, 24, 18, 20],
    // Bot speaking (enhanced pattern) - Most dynamic
    [24, 36, 28, 42, 32, 38, 26, 34],
    // Processing state - Synchronized wave
    [20, 20, 20, 20, 20, 20, 20, 20]
  ];
  
  // Select appropriate pattern based on state
  const activePattern = isBotSpeaking 
    ? heightPatterns[2] 
    : isActive 
      ? heightPatterns[0] 
      : isListening 
        ? heightPatterns[1]
        : heightPatterns[3];
  
  return (
    <div className="flex items-center justify-center space-x-1.5">
      {[...Array(12)].map((_, i) => {
        // Get height from pattern with some randomness for bot speaking
        const baseHeight = activePattern[i % activePattern.length];
        const dynamicHeight = isBotSpeaking 
          ? baseHeight + Math.sin(Date.now() * 0.01 + i) * 4
          : baseHeight;
        
        return (
          <motion.div
            key={i}
            className={`w-1 rounded-full shadow-sm ${
              isBotSpeaking
                ? 'bg-gradient-to-t from-pink-500 via-fuchsia-400 to-rose-400 shadow-pink-500/20' 
                : isActive 
                  ? 'bg-gradient-to-t from-rose-500 via-pink-400 to-fuchsia-400 shadow-rose-500/20' 
                  : isListening 
                    ? 'bg-gradient-to-t from-pink-400 via-fuchsia-300 to-pink-300 shadow-pink-400/20'
                    : 'bg-gradient-to-t from-gray-400 to-gray-300'
            }`}
            initial={{ height: 8, opacity: 0.3 }}
            animate={{
              height: isActive || isListening || isBotSpeaking
                ? [dynamicHeight * 0.7, dynamicHeight, dynamicHeight * 0.8]
                : [8, 12, 8],
              opacity: isActive || isListening || isBotSpeaking ? [0.8, 1, 0.9] : [0.3, 0.5, 0.3],
              scaleY: isActive || isListening || isBotSpeaking ? [0.9, 1.1, 1] : 1,
            }}
            transition={{
              duration: isBotSpeaking ? 0.4 : isActive ? 0.6 : 1.2,
              repeat: isActive || isListening || isBotSpeaking ? Infinity : 0,
              delay: i * (isBotSpeaking ? 0.05 : 0.08),
              ease: isBotSpeaking ? "easeInOut" : "easeOut",
              repeatType: "reverse"
            }}
            style={{
              filter: isBotSpeaking || isActive ? 'drop-shadow(0 0 4px currentColor)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

const VoiceCall = ({ 
  isOpen, 
  onClose, 
  onMessageReceived, 
  editablePrompts = {},
  messages = []
}) => {
  const { selectedBotId } = useBot();
  const { userDetails } = useUser();
  
  // Function to get bot name (custom or default)
  const getBotName = () => {
    if (!selectedBotId) return 'Bot';
    
    // Check for custom name in localStorage
    const customName = localStorage.getItem(`bot_customization_${selectedBotId}`);
    if (customName) {
      try {
        const customData = JSON.parse(customName);
        if (customData.name) return customData.name;
      } catch (e) {
        console.log('Error parsing custom bot name:', e);
      }
    }
    
    // Fallback to default name from bot_details
    const botDetails = bot_details.find(bot => bot.bot_id === selectedBotId);
    return botDetails ? botDetails.name : selectedBotId;
  };
  
  // Voice call states
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Audio related refs and states
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioLevelRef = useRef(0);
  const callTimerRef = useRef(null);
  const userInteractionRef = useRef(false);
  
  // Initialize audio context for user interaction (required for autoplay policy)
  const initializeAudioContext = useCallback(async () => {
    if (userInteractionRef.current) return;
    
    try {
      // Create a dummy audio context to unlock audio
      const tempContext = new (window.AudioContext || window.webkitAudioContext)();
      if (tempContext.state === 'suspended') {
        await tempContext.resume();
      }
      await tempContext.close();
      
      userInteractionRef.current = true;
      console.log('✅ Audio context initialized for user interaction');
    } catch (error) {
      console.warn('⚠️ Could not initialize audio context:', error);
    }
  }, []);
  
  // Get bot avatar with enhanced error handling
  const getAvatarSrc = () => {
    if (!selectedBotId) {
      console.log('🎭 No bot selected, using default avatar');
      return defaultAvatar;
    }
    
    const avatar = avatarMap[selectedBotId];
    if (!avatar) {
      console.warn(`🎭 Avatar not found for bot "${selectedBotId}", using default`);
      return defaultAvatar;
    }
    
    // Ensure the avatar is a string (image path) and not an object
    if (typeof avatar !== 'string' && !avatar.src) {
      console.warn('🎭 Invalid avatar format, expected string or image object:', avatar);
      return defaultAvatar;
    }
    
    const src = typeof avatar === 'string' ? avatar : avatar.src || defaultAvatar;
    console.log(`🎭 Using avatar for ${selectedBotId}:`, src);
    return src;
  };
  
  const avatarSrc = getAvatarSrc();
  
  // Debug avatar selection with enhanced logging
  useEffect(() => {
    console.log('=== VOICE CALL AVATAR DEBUG ===');
    console.log('Selected bot ID:', selectedBotId);
    console.log('Available avatar keys:', Object.keys(avatarMap));
    console.log('Avatar found in map:', !!avatarMap[selectedBotId]);
    console.log('Raw avatar value:', avatarMap[selectedBotId]);
    console.log('Final avatar source:', avatarSrc);
    console.log('Avatar source type:', typeof avatarSrc);
    console.log('Default avatar:', defaultAvatar);
    console.log('==============================');
  }, [selectedBotId, avatarSrc]);
  
  // Speech recognition setup
  const startSpeechRecognition = useCallback(async () => {
    try {
      setError(null);
      setIsInitializing(true);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser');
      }
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // Setup MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        console.log('🛑 === MEDIA RECORDER STOP EVENT ===');
        console.log('🎤 AudioChunks collected:', audioChunksRef.current.length);
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('🎵 Audio blob created - Size:', audioBlob.size, 'bytes');
        console.log('🎵 Audio blob type:', audioBlob.type);
        
        audioChunksRef.current = [];
        
        if (audioBlob.size > 0) {
          console.log('✅ Audio blob has data, calling processVoiceInput...');
          await processVoiceInput(audioBlob);
          console.log('✅ processVoiceInput completed');
        } else {
          console.warn('⚠️ Audio blob is empty, not processing');
        }
        console.log('================================');
      };
      
      setConnectionStatus('connected');
      setIsInitializing(false);
      return true;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError(error.message || 'Failed to access microphone');
      setConnectionStatus('disconnected');
      setIsInitializing(false);
      return false;
    }
  }, []);
  
  // Process voice input and send to API
  const processVoiceInput = async (audioBlob) => {
    setIsProcessing(true);
    
    try {
      // Convert messages to OpenAI format
      const convertToOpenAIFormat = (msgs) => msgs.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Prepare FormData for voice call API (backend expects multipart/form-data)
      const formData = new FormData();
      
      // Add audio file (backend expects 'audio_file' field)
      formData.append('audio_file', audioBlob, 'recording.webm');
      
      // Add other fields as form data
      formData.append('bot_id', selectedBotId);
      formData.append('custom_bot_name', ''); // Add if you have custom bot name
      formData.append('user_name', userDetails.name || '');
      formData.append('user_gender', userDetails.gender || '');
      formData.append('language', ''); // Add if you have language preference
      formData.append('traits', ''); // Add if you have traits
      formData.append('previous_conversation', JSON.stringify(convertToOpenAIFormat(messages)));
      formData.append('email', userDetails.email);
      formData.append('request_time', new Date().toString());
      formData.append('platform', 'web_voice');
      
      console.log('🚀 Sending FormData with audio blob size:', audioBlob.size);
      
      // Send to voice call API - Using local development server (no Content-Type header for FormData)
      const response = await fetch('http://127.0.0.1:8000/voice-call', {
        method: 'POST',
        body: formData, // Send FormData directly, no JSON.stringify needed
      });
      
      const data = await response.json();
      
      // Enhanced debugging for API response
      console.log('🔍 === VOICE API RESPONSE DEBUG ===');
      console.log('📡 Response status:', response.status);
      console.log('📦 Response data keys:', Object.keys(data));
      console.log('📝 Transcript present:', !!data.transcript);
      console.log('🤖 Bot response present:', !!data.text_response);
      console.log('🎵 Audio data present:', !!data.audio_base64);
      console.log('🎵 Audio data type:', typeof data.audio_base64);
      console.log('🎵 Audio data length:', data.audio_base64?.length || 0);
      console.log('🎵 Audio data preview:', data.audio_base64?.substring(0, 50) + '...');
      console.log('🔊 Speaker status:', isSpeakerOn);
      console.log('================================');
      
      if (data.error) {
        console.error('Voice call API error:', data.error);
        setError('Failed to process voice input. Please try again.');
        return;
      }
      
      // Add transcribed user message to chat
      if (data.transcript) {
        const userMessage = {
          text: data.transcript,
          sender: 'user',
          timestamp: new Date(),
          feedback: "",
          reaction: "",
          isVoiceMessage: true
        };
        
        onMessageReceived?.(userMessage);
      }
      
      // Add bot response to chat
      if (data.text_response) {
        const botMessage = {
          text: data.text_response,
          sender: 'bot',
          id: data.message_id,
          feedback: "",
          reaction: "",
          timestamp: new Date(),
          bot_id: selectedBotId,
          voice_only: true,
          isVoiceMessage: true
        };
        
        onMessageReceived?.(botMessage);
        
        // Enhanced debugging for audio playback decision
        console.log('🔍 === AUDIO PLAYBACK DEBUG ===');
        console.log('🎵 Audio base64 available:', !!data.audio_base64);
        console.log('🎵 Audio length:', data.audio_base64?.length || 0);
        console.log('🔊 Speaker on:', isSpeakerOn);
        console.log('🎤 Currently recording:', isRecording);
        console.log('⚙️ Currently processing:', isProcessing);
        console.log('🗣️ Bot currently speaking:', isBotSpeaking);
        
        // Play bot's audio response if available
        if (data.audio_base64) {
          console.log('🎵 Calling playAudioResponse...');
          await playAudioResponse(data.audio_base64);
          console.log('🎵 playAudioResponse call completed');
        } else {
          console.warn('⚠️ No audio data received from API');
        }
        console.log('===============================');
      }
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Play audio response from bot - Enhanced with better volume control and browser compatibility
  const playAudioResponse = async (audioBase64) => {
    console.log('🎵 === PLAY AUDIO RESPONSE START ===');
    console.log('🔊 Speaker status:', isSpeakerOn);
    console.log('🎵 Audio data received:', !!audioBase64);
    console.log('🎵 Audio data type:', typeof audioBase64);
    console.log('🎵 Audio data length:', audioBase64?.length || 0);
    
    try {
      // Ensure speaker is on
      if (!isSpeakerOn) {
        console.log('🔇 Speaker is off, skipping audio playback');
        return;
      }
      
      console.log('🎵 Bot audio response received, starting playback...');
      
      // Set bot speaking state to true immediately
      setIsBotSpeaking(true);
      
      // Convert base64 to blob with better error handling
      try {
        // Remove data URL prefix if present
        const cleanBase64 = audioBase64.replace(/^data:audio\/[^;]+;base64,/, '');
        
        const byteCharacters = atob(cleanBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        
        // Try multiple audio formats for better compatibility
        const audioFormats = [
          { type: 'audio/mpeg', ext: 'mp3' },
          { type: 'audio/wav', ext: 'wav' },
          { type: 'audio/ogg', ext: 'ogg' },
          { type: 'audio/webm', ext: 'webm' }
        ];
        
        let audioUrl = null;
        let audio = null;
        
        for (const format of audioFormats) {
          try {
            const audioBlob = new Blob([byteArray], { type: format.type });
            audioUrl = URL.createObjectURL(audioBlob);
            
            // Create audio element with enhanced settings
            audio = new Audio();
            audio.crossOrigin = "anonymous";
            audio.preload = "auto";
            audio.volume = 1.0;
            audio.src = audioUrl;
            
            // Test if this format can be played
            await new Promise((resolve, reject) => {
              const timeoutId = setTimeout(() => reject(new Error('Load timeout')), 3000);
              
              audio.oncanplaythrough = () => {
                clearTimeout(timeoutId);
                resolve();
              };
              
              audio.onerror = () => {
                clearTimeout(timeoutId);
                reject(new Error('Cannot play this format'));
              };
              
              audio.load();
            });
            
            console.log(`✅ Audio format ${format.type} is compatible`);
            break;
            
          } catch (formatError) {
            console.log(`⚠️ Audio format ${format.type} not compatible, trying next...`);
            if (audioUrl) {
              URL.revokeObjectURL(audioUrl);
              audioUrl = null;
            }
            if (audio) {
              audio = null;
            }
            continue;
          }
        }
        
        if (!audio || !audioUrl) {
          throw new Error('No compatible audio format found');
        }
        
        // Set up audio context for volume boost (optional, fallback to direct playback)
        let audioContext = null;
        let gainNode = null;
        let source = null;
        
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          
          // Handle suspended audio context (browser autoplay policy)
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          
          gainNode = audioContext.createGain();
          gainNode.gain.value = 2.5; // Volume boost
          
          source = audioContext.createMediaElementSource(audio);
          source.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          console.log('🔊 Audio context created with volume boost');
          
        } catch (contextError) {
          console.warn('⚠️ AudioContext not available, using direct audio playback:', contextError);
          // Fallback to direct audio playback without volume boost
        }
        
        // Set up event handlers
        const cleanup = () => {
          console.log('🧹 Cleaning up audio resources...');
          setIsBotSpeaking(false);
          
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
          
          if (audioContext && audioContext.state !== 'closed') {
            audioContext.close().catch(console.error);
          }
        };
        
        // Enhanced event handlers
        audio.onloadstart = () => console.log('🔄 Bot audio loading...');
        audio.oncanplay = () => console.log('✅ Bot audio ready to play');
        audio.onloadeddata = () => console.log('📦 Bot audio data loaded');
        
        audio.onplay = () => {
          console.log('🔊 Bot is now speaking');
          setIsBotSpeaking(true);
        };
        
        audio.onended = () => {
          console.log('✅ Bot finished speaking');
          cleanup();
        };
        
        audio.onpause = () => {
          console.log('⏸️ Bot audio paused');
          setIsBotSpeaking(false);
        };
        
        audio.onerror = (e) => {
          console.error('❌ Bot audio playback error:', e);
          console.error('Audio error details:', {
            error: audio.error,
            networkState: audio.networkState,
            readyState: audio.readyState,
            src: audio.src
          });
          cleanup();
          setError('Audio playback failed. Please check your speakers.');
        };
        
        audio.onabort = () => {
          console.log('🛑 Bot audio playback aborted');
          cleanup();
        };
        
        // Additional debugging
        audio.onstalled = () => console.warn('⚠️ Audio playback stalled');
        audio.onsuspend = () => console.warn('⚠️ Audio playback suspended');
        audio.onwaiting = () => console.log('⏳ Audio waiting for data...');
        
        // Attempt to play audio with retry mechanism
        let playAttempts = 0;
        const maxPlayAttempts = 3;
        
        const attemptPlay = async () => {
          try {
            playAttempts++;
            console.log(`🎵 Attempting to play bot audio (attempt ${playAttempts}/${maxPlayAttempts})`);
            
            // Reset audio position
            audio.currentTime = 0;
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
              await playPromise;
              console.log('🎵 Bot audio playback started successfully');
            }
            
          } catch (playError) {
            console.error(`❌ Play attempt ${playAttempts} failed:`, playError);
            
            if (playAttempts < maxPlayAttempts) {
              console.log(`🔄 Retrying audio playback in 500ms...`);
              setTimeout(attemptPlay, 500);
            } else {
              console.error('❌ All play attempts failed');
              cleanup();
              setError(`Audio playback failed: ${playError.message}`);
            }
          }
        };
        
        await attemptPlay();
        
        console.log('🎵 === PLAY AUDIO RESPONSE END (SUCCESS) ===');
        
      } catch (conversionError) {
        console.error('❌ Error converting audio:', conversionError);
        console.log('🎵 === PLAY AUDIO RESPONSE END (CONVERSION ERROR) ===');
        setIsBotSpeaking(false);
        setError('Failed to process audio format');
      }
      
    } catch (error) {
      console.error('❌ Error in playAudioResponse:', error);
      console.log('🎵 === PLAY AUDIO RESPONSE END (GENERAL ERROR) ===');
      setIsBotSpeaking(false);
      setError(`Failed to play bot response: ${error.message}`);
    }
  };
  
  // Start recording
  const startRecording = useCallback(async () => {
    console.log('🎤 === START RECORDING CALLED ===');
    console.log('🎤 MediaRecorder exists:', !!mediaRecorderRef.current);
    console.log('🎤 MediaRecorder state:', mediaRecorderRef.current?.state);
    console.log('🎤 Currently recording state:', isRecording);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      console.log('🎤 Starting MediaRecorder...');
      
      // Initialize audio context for user interaction
      await initializeAudioContext();
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log('🎤 Started recording user voice');
    } else {
      console.warn('⚠️ Cannot start recording - MediaRecorder not in inactive state');
    }
    console.log('=============================');
  }, [initializeAudioContext]);
  
  // Stop recording
  const stopRecording = useCallback(() => {
    console.log('🛑 === STOP RECORDING CALLED ===');
    console.log('🎤 MediaRecorder exists:', !!mediaRecorderRef.current);
    console.log('🎤 MediaRecorder state:', mediaRecorderRef.current?.state);
    console.log('🎤 Currently recording state:', isRecording);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('🛑 Stopping MediaRecorder...');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('🛑 Stopped recording, processing voice...');
    } else {
      console.warn('⚠️ Cannot stop recording - MediaRecorder not in recording state');
    }
    console.log('==============================');
  }, []);
  
  // Start voice call
  const startCall = async () => {
    setConnectionStatus('connecting');
    setError(null);
    
    // Initialize audio context for user interaction
    await initializeAudioContext();
    
    const success = await startSpeechRecognition();
    
    if (success) {
      setIsCallActive(true);
      setCallDuration(0);
      
      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      // If failed, show error state for a moment then allow retry
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  
  // End voice call
  const endCall = () => {
    // Stop recording if active
    if (isRecording) {
      stopRecording();
    }
    
    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Clear timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    setIsCallActive(false);
    setIsRecording(false);
    setIsProcessing(false);
    setIsBotSpeaking(false);
    setConnectionStatus('disconnected');
    setCallDuration(0);
    setError(null);
    
    // Close modal after ending call
    onClose();
  };
  
  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      >
        <motion.div 
          className="relative bg-gradient-to-br from-pink-900/20 via-fuchsia-900/30 to-rose-900/20 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-pink-200/10 shadow-2xl w-full max-w-sm lg:max-w-md min-h-[90vh] max-h-[95vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: 15 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            rotateX: 0,
            boxShadow: isBotSpeaking 
              ? "0 0 120px rgba(219, 39, 119, 0.6), 0 0 80px rgba(236, 72, 153, 0.4), 0 30px 60px rgba(0, 0, 0, 0.3)" 
              : isRecording 
                ? "0 0 120px rgba(236, 72, 153, 0.5), 0 0 80px rgba(219, 39, 119, 0.3), 0 30px 60px rgba(0, 0, 0, 0.3)"
                : "0 0 80px rgba(219, 39, 119, 0.3), 0 30px 60px rgba(0, 0, 0, 0.2)"
          }}
          exit={{ scale: 0.8, y: 50, opacity: 0, rotateX: 15 }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            boxShadow: { duration: 0.8 }
          }}
        >
          {/* Enhanced Dynamic Background Elements - Pink Magic Theme */}
          <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
            {/* Pink Magic Floating Orbs */}
            <motion.div
              className={`absolute top-1/6 left-1/6 w-40 h-40 rounded-full filter blur-2xl ${
                isBotSpeaking 
                  ? 'bg-gradient-to-r from-pink-400/40 to-fuchsia-500/40' 
                  : isRecording
                    ? 'bg-gradient-to-r from-rose-400/40 to-pink-500/40'
                    : 'bg-gradient-to-r from-pink-300/25 to-fuchsia-400/25'
              }`}
              animate={{
                scale: isBotSpeaking ? [1, 1.6, 1.2, 1] : isRecording ? [1, 1.4, 1] : [1, 1.2, 1],
                rotate: [0, 120, 240, 360],
                x: isBotSpeaking ? [0, 15, -10, 0] : [0, 8, 0],
                y: isBotSpeaking ? [0, -15, 10, 0] : [0, -8, 0],
                opacity: isBotSpeaking ? [0.4, 0.7, 0.5, 0.4] : [0.25, 0.4, 0.25]
              }}
              transition={{
                duration: isBotSpeaking ? 4 : isRecording ? 5 : 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={`absolute bottom-1/6 right-1/6 w-32 h-32 rounded-full filter blur-xl ${
                isBotSpeaking 
                  ? 'bg-gradient-to-r from-fuchsia-500/40 to-rose-400/40' 
                  : isRecording
                    ? 'bg-gradient-to-r from-pink-500/40 to-fuchsia-400/40'
                    : 'bg-gradient-to-r from-rose-300/25 to-pink-400/25'
              }`}
              animate={{
                scale: isBotSpeaking ? [1.3, 1, 1.3] : isRecording ? [1.2, 1, 1.2] : [1, 1.3, 1],
                rotate: [360, 240, 120, 0],
                x: isBotSpeaking ? [0, -12, 8, 0] : [0, -6, 0],
                y: isBotSpeaking ? [0, 12, -8, 0] : [0, 6, 0],
                opacity: isBotSpeaking ? [0.4, 0.6, 0.4] : [0.25, 0.35, 0.25]
              }}
              transition={{
                duration: isBotSpeaking ? 3.5 : isRecording ? 4.5 : 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Pink magic sparkles */}
            <motion.div
              className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full filter blur-lg bg-gradient-to-r from-pink-200/30 to-fuchsia-300/30"
              animate={{
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Magic particles for bot speaking */}
            {isBotSpeaking && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-pink-300/80 rounded-full"
                    style={{
                      left: `${15 + (i * 6)}%`,
                      top: `${25 + (i * 4)}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      y: [0, -30, -60],
                      x: [0, Math.sin(i) * 20, Math.sin(i * 2) * 40],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Additional magical swirls */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`swirl-${i}`}
                    className="absolute w-16 h-16 border border-pink-300/40 rounded-full"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: `${40 + i * 10}%`,
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      rotate: [0, 360],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Recording magic effect */}
            {isRecording && !isBotSpeaking && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`record-${i}`}
                    className="absolute w-2 h-2 bg-rose-400/70 rounded-full"
                    style={{
                      left: `${50}%`,
                      top: `${50}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, Math.cos(i * 45 * Math.PI / 180) * 80],
                      y: [0, Math.sin(i * 45 * Math.PI / 180) * 80],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </div>
          
          {/* Minimalist Close Button */}
         
          
          {/* Content Container */}
          <div className="relative z-10 text-center flex flex-col h-full">
            {/* Header Section - Larger */}
            <motion.div 
              className="flex-shrink-0 mb-6"
              animate={{
                y: isCallActive ? -10 : 0,
                scale: isCallActive ? 0.95 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: isCallActive ? 0.9 : 1, 
                  y: 0,
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.h1 
                  className="text-4xl font-bold text-white/90 tracking-wide"
                  animate={{
                    fontSize: isCallActive ? "2rem" : "2.5rem",
                    opacity: isCallActive ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Voice Call
                </motion.h1>
                {/* Bot Name - Larger */}
                <motion.p
                  className="text-xl text-white/70 mt-2 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: isCallActive ? 0.8 : 1, 
                    y: 0,
                    fontSize: isCallActive ? "1.125rem" : "1.25rem",
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  with {getBotName()}
                </motion.p>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-fuchsia-400 mx-auto mt-3"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isCallActive ? "2rem" : "4rem",
                    opacity: isCallActive ? 0.6 : 1,
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Avatar Section - Larger */}
            <motion.div 
              className="flex-shrink-0 mb-8"
              animate={{
                y: isCallActive ? -10 : 0,
                scale: isCallActive ? 0.9 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative flex justify-center">
                {/* Magic Pulse Rings */}
                <AnimatePresence>
                  {(isRecording || isBotSpeaking) && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute rounded-full border-2 ${
                            isBotSpeaking 
                              ? 'border-pink-400/50 bg-pink-400/5' 
                              : 'border-rose-400/50 bg-rose-400/5'
                          }`}
                          style={{
                            width: `${12 + i * 2.5}rem`,
                            height: `${12 + i * 2.5}rem`,
                            left: '50%',
                            top: '50%',
                            marginLeft: `-${6 + i * 1.25}rem`,
                            marginTop: `-${6 + i * 1.25}rem`,
                          }}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ 
                            scale: [1, 1.3 + i * 0.1, 1.8 + i * 0.2],
                            opacity: [0.8, 0.4, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut"
                          }}
                          exit={{ opacity: 0, scale: 1.5 }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Avatar Container - Much Larger */}
                <motion.div 
                  className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 shadow-2xl bg-gradient-to-br from-pink-100 to-fuchsia-100"
                  style={{
                    borderColor: isBotSpeaking 
                      ? '#ec4899' 
                      : isRecording 
                        ? '#f43f5e' 
                        : 'rgba(255,255,255,0.6)'
                  }}
                  animate={{
                    scale: isBotSpeaking ? [1, 1.08, 1] : isRecording ? [1, 1.05, 1] : 1,
                    borderWidth: isBotSpeaking ? [4, 6, 4] : isRecording ? [4, 5, 4] : 4,
                    width: isCallActive ? "9rem" : "10rem",
                    height: isCallActive ? "9rem" : "10rem",
                  }}
                  transition={{
                    duration: isBotSpeaking ? 1 : 0.5,
                    ease: "easeInOut",
                    repeat: (isBotSpeaking || isRecording) ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  <img
                    src={avatarSrc}
                    alt={`${selectedBotId || 'Bot'} Avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
                  />
                  
                  {/* Speaking overlay */}
                  {isBotSpeaking && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-fuchsia-500/30 rounded-full"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.01, 1]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Recording overlay */}
                  {isRecording && !isBotSpeaking && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-rose-500/25 to-pink-500/25 rounded-full"
                      animate={{
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Call Status Section - Minimal spacing */}
            <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
              {/* Call Duration */}
              {isCallActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <motion.div 
                    className="text-white/90 text-lg font-mono bg-white/10 rounded-full px-6 py-2 backdrop-blur-sm border border-white/20"
                    animate={{
                      boxShadow: isBotSpeaking 
                        ? ['0 0 0 0 rgba(219, 39, 119, 0.3)', '0 0 0 8px rgba(219, 39, 119, 0)', '0 0 0 0 rgba(219, 39, 119, 0.3)']
                        : '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isBotSpeaking ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {formatDuration(callDuration)}
                  </motion.div>
                </motion.div>
              )}

              {/* Connection Status Dots */}
              <motion.div 
                className="flex justify-center"
                animate={{
                  scale: isBotSpeaking ? [1, 1.02, 1] : 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: isBotSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        connectionStatus === 'connected' ? 'bg-pink-400/80' :
                        connectionStatus === 'connecting' ? 'bg-yellow-400/80' :
                        'bg-red-400/80'
                      }`}
                      animate={{
                        scale: connectionStatus === 'connecting' ? [1, 1.2, 1] : 1,
                        opacity: connectionStatus === 'connecting' ? [0.6, 1, 0.6] : 1
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: connectionStatus === 'connecting' ? Infinity : 0,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Voice Visualizer - Compact */}
              {isCallActive && (
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg w-4/5">
                    <VoiceVisualizer 
                      isActive={isRecording}
                      isListening={connectionStatus === 'connected'}
                      isBotSpeaking={isBotSpeaking}
                      audioLevel={audioLevelRef.current}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-500/15 border border-red-400/30 rounded-xl p-3 mb-4 backdrop-blur-sm mx-4"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-red-200 text-sm font-medium">
                    ⚠️ {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls - Clean and compact */}
            <motion.div 
              className="flex-shrink-0 space-y-3 pb-2"
              animate={{
                y: isCallActive ? 0 : 10,
                opacity: isCallActive ? 1 : 0.95,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Push to Talk Button - Smaller */}
              <AnimatePresence>
                {isCallActive && (
                  <motion.div 
                    className="flex justify-center"
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                  >
                    <motion.button
                      whileHover={{ scale: isBotSpeaking ? 1 : 1.03 }}
                      whileTap={{ scale: isBotSpeaking ? 1 : 0.97 }}
                      onMouseDown={() => !isBotSpeaking && startRecording()}
                      onMouseUp={() => !isBotSpeaking && stopRecording()}
                      onTouchStart={() => !isBotSpeaking && startRecording()}
                      onTouchEnd={() => !isBotSpeaking && stopRecording()}
                      disabled={isProcessing || isBotSpeaking}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-3 transition-all relative overflow-hidden ${
                        isBotSpeaking
                          ? 'bg-gradient-to-br from-pink-500/60 to-fuchsia-600/60 border-pink-300/50 cursor-not-allowed'
                          : isRecording 
                            ? 'bg-gradient-to-br from-rose-500 to-pink-600 border-rose-300 shadow-rose-500/30' 
                            : 'bg-gradient-to-br from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 border-pink-300 shadow-pink-500/30'
                      } ${isProcessing || isBotSpeaking ? 'opacity-70' : ''}`}
                      animate={{
                        boxShadow: isRecording 
                          ? ['0 0 0 0 rgba(244, 63, 94, 0.4)', '0 0 0 12px rgba(244, 63, 94, 0)', '0 0 0 0 rgba(244, 63, 94, 0.4)']
                          : isBotSpeaking
                            ? ['0 0 0 0 rgba(219, 39, 119, 0.4)', '0 0 0 12px rgba(219, 39, 119, 0)', '0 0 0 0 rgba(219, 39, 119, 0.4)']
                            : '0 6px 20px rgba(236, 72, 153, 0.3)'
                      }}
                      transition={{
                        duration: isRecording || isBotSpeaking ? 1.2 : 0.25,
                        repeat: isRecording || isBotSpeaking ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Animated background for bot speaking */}
                      {isBotSpeaking && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-fuchsia-400/30 rounded-full"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
                      <div className={`flex items-center justify-center z-10 ${isRecording ? 'animate-pulse' : ''}`}>
                        {isProcessing ? (
                          <Loader2 className="w-7 h-7 text-white animate-spin" />
                        ) : isBotSpeaking ? (
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Volume2 className="w-7 h-7 text-white" />
                          </motion.div>
                        ) : isRecording ? (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <MicOff className="w-7 h-7 text-white" />
                          </motion.div>
                        ) : (
                          <Mic className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Secondary Controls - Slightly smaller spacing */}
              {isCallActive && (
                <motion.div 
                  className="flex justify-center space-x-10"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Mute Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 transition-all backdrop-blur-sm ${
                      isMuted 
                        ? 'bg-gradient-to-br from-rose-500/30 to-pink-600/30 border-rose-300/40 text-rose-200' 
                        : 'bg-white/10 border-pink-200/25 text-pink-100 shadow-pink-500/15 hover:bg-white/20'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </motion.button>
                  
                  {/* Speaker Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 transition-all backdrop-blur-sm ${
                      !isSpeakerOn 
                        ? 'bg-gradient-to-br from-rose-500/30 to-pink-600/30 border-rose-300/40 text-rose-200' 
                        : 'bg-white/10 border-pink-200/25 text-pink-100 shadow-pink-500/15 hover:bg-white/20'
                    }`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </motion.button>
                </motion.div>
              )}

              {/* Main Call Control Button - Keep same size */}
              <motion.div 
                className="flex justify-center pt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={isCallActive ? endCall : startCall}
                  disabled={connectionStatus === 'connecting'}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-3 transition-all relative overflow-hidden ${
                    isCallActive 
                      ? 'bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 border-rose-300 shadow-rose-500/40' 
                      : 'bg-gradient-to-br from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 border-pink-300 shadow-pink-500/40'
                  } ${connectionStatus === 'connecting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {connectionStatus === 'connecting' ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : isCallActive ? (
                    <PhoneOff className="w-8 h-8 text-white" />
                  ) : (
                    <Phone className="w-8 h-8 text-white" />
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceCall;
