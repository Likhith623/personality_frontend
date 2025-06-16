// VoiceCallUltra.jsx
// 🚀 ULTRA-OPTIMIZED VOICE CALL V3: Maximum Performance Edition
// Enhanced version with additional optimizations and error handling

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, X, Zap, Activity } from "lucide-react";
import { useBot } from '@/support/BotContext';
import { useUser } from '@/support/UserContext';

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

// ===========================================
// CONSTANTS AND CONFIGURATIONS
// ===========================================

const AUDIO_CONTEXT_CONFIG = {
  latencyHint: 'interactive',
  sampleRate: 8000,
  echoCancellation: false,
  noiseSuppression: false,
  autoGainControl: false,
  channelCount: 1
};

const VOICE_THRESHOLD = 0.0003;
const INTERRUPTION_THRESHOLD = 0.025;
const SILENCE_DURATION = 200;
const CHECK_INTERVAL = 4;
const VOICE_START = 5;
const VOICE_END = 22;

// Pre-allocated buffers for zero garbage collection
const REUSABLE_FREQUENCY_BUFFER = new Uint8Array(128);

// Bot details for name resolution
const BOT_DETAILS = [
  { bot_id: "delhi_mentor_male", name: "Yash Oberoi" },
  { bot_id: "delhi_mentor_female", name: "Kalpana Roy" },
  { bot_id: "delhi_friend_male", name: "Rahul Kapoor" },
  { bot_id: "delhi_friend_female", name: "Amayra Dubey" },
  { bot_id: "delhi_romantic_male", name: "Rohan Mittal" },
  { bot_id: "delhi_romantic_female", name: "Alana Malhotra" },
  { bot_id: "japanese_mentor_male", name: "Kazuo Sato" },
  { bot_id: "japanese_mentor_female", name: "Masaka Kobayashi" },
  { bot_id: "japanese_friend_male", name: "Hiro Tanaka" },
  { bot_id: "japanese_friend_female", name: "Shiyona Narita" },
  { bot_id: "japanese_romantic_male", name: "Hiroshi Takahashi" },
  { bot_id: "japanese_romantic_female", name: "Ami Kudo" },
  { bot_id: "parisian_mentor_male", name: "Pierre Dubois" },
  { bot_id: "parisian_mentor_female", name: "Elise Moreau" },
  { bot_id: "parisian_friend_male", name: "Theo Martin" },
  { bot_id: "parisian_friend_female", name: "Juliette Laurent" },
  { bot_id: "parisian_romantic_male", name: "Leo Moreau" },
  { bot_id: "parisian_romantic_female", name: "Clara Moreau" },
  { bot_id: "berlin_mentor_male", name: "Klaus Berger" },
  { bot_id: "berlin_mentor_female", name: "Ingrid Weber" },
  { bot_id: "berlin_friend_male", name: "Lars Muller" },
  { bot_id: "berlin_friend_female", name: "Lina Voigt" },
  { bot_id: "berlin_romantic_male", name: "Max Hoffman" },
  { bot_id: "berlin_romantic_female", name: "Lena Meyer" },
  { bot_id: "Krishna", name: "Krishna" },
  { bot_id: "Rama", name: "Rama" },
  { bot_id: "Shiva", name: "Shiva" },
  { bot_id: "Trimurti", name: "Trimurti" },
  { bot_id: "Hanuman", name: "Hanuman" }
];

// =====================================
// ENHANCED BOT AVATAR COMPONENT - ULTRA SENSITIVE
// =====================================

const EnhancedBotAvatar = ({ audioLevel = 0, isListening, isSpeaking, isProcessing, botId }) => {
  const barCount = 36;

  const getBotAvatar = () => {
    const avatarMap = {
      'delhi_mentor_male': delhi_mentor_male?.default || delhi_mentor_male?.src || delhi_mentor_male,
      'delhi_mentor_female': delhi_mentor_female?.default || delhi_mentor_female?.src || delhi_mentor_female,
      'delhi_friend_male': delhi_friend_male?.default || delhi_friend_male?.src || delhi_friend_male,
      'delhi_friend_female': delhi_friend_female?.default || delhi_friend_female?.src || delhi_friend_female,
      'delhi_romantic_male': delhi_romantic_male?.default || delhi_romantic_male?.src || delhi_romantic_male,
      'delhi_romantic_female': delhi_romantic_female?.default || delhi_romantic_female?.src || delhi_romantic_female,
      'japanese_mentor_male': japanese_mentor_male?.default || japanese_mentor_male?.src || japanese_mentor_male,
      'japanese_mentor_female': japanese_mentor_female?.default || japanese_mentor_female?.src || japanese_mentor_female,
      'japanese_friend_male': japanese_friend_male?.default || japanese_friend_male?.src || japanese_friend_male,
      'japanese_friend_female': japanese_friend_female?.default || japanese_friend_female?.src || japanese_friend_female,
      'japanese_romantic_male': japanese_romantic_male?.default || japanese_romantic_male?.src || japanese_romantic_male,
      'japanese_romantic_female': japanese_romantic_female?.default || japanese_romantic_female?.src || japanese_romantic_female,
      'parisian_mentor_male': parisian_mentor_male?.default || parisian_mentor_male?.src || parisian_mentor_male,
      'parisian_mentor_female': parisian_mentor_female?.default || parisian_mentor_female?.src || parisian_mentor_female,
      'parisian_friend_male': parisian_friend_male?.default || parisian_friend_male?.src || parisian_friend_male,
      'parisian_friend_female': parisian_friend_female?.default || parisian_friend_female?.src || parisian_friend_female,
      'parisian_romantic_male': parisian_romantic_male?.default || parisian_romantic_male?.src || parisian_romantic_male,
      'parisian_romantic_female': parisian_romantic_female?.default || parisian_romantic_female?.src || parisian_romantic_female,
      'berlin_mentor_male': berlin_mentor_male?.default || berlin_mentor_male?.src || berlin_mentor_male,
      'berlin_mentor_female': berlin_mentor_female?.default || berlin_mentor_female?.src || berlin_mentor_female,
      'berlin_friend_male': berlin_friend_male?.default || berlin_friend_male?.src || berlin_friend_male,
      'berlin_friend_female': berlin_friend_female?.default || berlin_friend_female?.src || berlin_friend_female,
      'berlin_romantic_male': berlin_romantic_male?.default || berlin_romantic_male?.src || berlin_romantic_male,
      'berlin_romantic_female': berlin_romantic_female?.default || berlin_romantic_female?.src || berlin_romantic_female,
      'Krishna': lord_krishna?.default || lord_krishna?.src || lord_krishna,
      'Rama': rama_god?.default || rama_god?.src || rama_god,
      'Shiva': shiva_god?.default || shiva_god?.src || shiva_god,
      'Trimurti': trimurti?.default || trimurti?.src || trimurti,
      'Hanuman': hanuman_god?.default || hanuman_god?.src || hanuman_god,
    };
    
    return avatarMap[botId] || defaultAvatar;
  };

  const avatarSrc = getBotAvatar();
  const enhancedAudioLevel = Math.min(audioLevel * 50, 1);

  // COMPREHENSIVE DEBUG LOGGING
  React.useEffect(() => {
    const debugInfo = {
      timestamp: Date.now(),
      rawAudioLevel: audioLevel.toFixed(4),
      enhancedLevel: enhancedAudioLevel.toFixed(4),
      isSpeaking,
      isProcessing,
      isListening,
      shouldShowGreen: isSpeaking,
      shouldShowBlue: enhancedAudioLevel > 0.001 && !isProcessing && !isSpeaking,
      greenCondition: `isSpeaking=${isSpeaking}`,
      blueCondition: `enhancedAudioLevel=${enhancedAudioLevel.toFixed(4)} > 0.001 && !isProcessing=${!isProcessing} && !isSpeaking=${!isSpeaking}`,
      visualState: isSpeaking ? 'GREEN_BARS' : 
                   (enhancedAudioLevel > 0.001 && !isProcessing && !isSpeaking) ? 'BLUE_BARS' : 'IDLE_BARS'
    };
    
    // Log state changes or randomly for monitoring
    if (isSpeaking || enhancedAudioLevel > 0.001 || Math.random() < 0.1) {
      console.log('🎨 VISUAL STATE:', debugInfo);
    }
  }, [audioLevel, enhancedAudioLevel, isSpeaking, isProcessing, isListening]);

  return (
    <div className="relative flex items-center justify-center w-[500px] h-[500px]">
      {/* OUTER PULSE RINGS - WITH DEBUG COLORS */}
      {[...Array(4)].map((_, ringIndex) => {
        const isGreenState = isSpeaking;
        const isBlueState = enhancedAudioLevel > 0.001 && !isProcessing && !isSpeaking;
        
        return (
          <motion.div
            key={`outer-ring-${ringIndex}`}
            className="absolute rounded-full border-4"
            style={{
              width: `${300 + ringIndex * 40}px`,
              height: `${300 + ringIndex * 40}px`,
              borderColor: isGreenState
                ? `rgba(34, 197, 94, ${1.0 - ringIndex * 0.2})`
                : isBlueState
                  ? `rgba(59, 130, 246, ${1.0 - ringIndex * 0.2})`
                  : `rgba(156, 163, 175, ${0.6 - ringIndex * 0.1})`,
            }}
            animate={{
              scale: isGreenState
                ? [1, 1.2, 1]
                : isBlueState
                  ? [1, 1 + enhancedAudioLevel * 1.5, 1]
                  : [1, 1.03, 1],
              opacity: isGreenState
                ? [1, 0.6, 1]
                : isBlueState
                  ? [0.9, 0.4, 0.9]
                  : [0.5, 0.2, 0.5]
            }}
            transition={{
              duration: isGreenState ? 0.4 : 0.6,
              repeat: Infinity,
              delay: ringIndex * 0.1,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* MAIN AUDIO VISUALIZER BARS - WITH DETAILED DEBUG */}
      <div className="absolute w-80 h-80 rounded-full">
        {[...Array(barCount)].map((_, i) => {
          const angle = (i * 360) / barCount;
          
          let baseHeight = 35;
          let dynamicHeight = 0;
          let barColor = 'rgba(156, 163, 175, 0.7)';
          let barWidth = '8px';
          let glowEffect = 'none';
          let debugState = 'IDLE';
          
          if (isSpeaking) {
            // GREEN BARS - Bot speaking
            debugState = 'GREEN_BOT_SPEAKING';
            dynamicHeight = 40 + Math.sin(Date.now() / 100 + i * 0.5) * 35;
            barColor = 'rgba(34, 197, 94, 1)';
            barWidth = '10px';
            glowEffect = '0 0 25px rgba(34, 197, 94, 1)';
          } else if (enhancedAudioLevel > 0.001 && !isProcessing) {
            // BLUE BARS - User speaking
            debugState = 'BLUE_USER_SPEAKING';
            const frequencyVariation = 0.5 + (i % 5) * 0.3;
            dynamicHeight = 25 + enhancedAudioLevel * 300 * frequencyVariation;
            barColor = 'rgba(59, 130, 246, 1)';
            barWidth = '9px';
            glowEffect = '0 0 20px rgba(59, 130, 246, 0.8)';
          } else {
            debugState = 'IDLE_STATE';
            dynamicHeight = 15 + Math.sin(Date.now() / 3000 + i * 0.1) * 5;
          }

          const totalHeight = baseHeight + dynamicHeight;

          // Debug logging for first bar only to avoid spam
          if (i === 0 && (isSpeaking || enhancedAudioLevel > 0.001 || Math.random() < 0.05)) {
            console.log(`🎨 BAR DEBUG [${i}]:`, {
              debugState,
              baseHeight,
              dynamicHeight: dynamicHeight.toFixed(1),
              totalHeight: totalHeight.toFixed(1),
              barColor,
              isSpeaking,
              enhancedAudioLevel: enhancedAudioLevel.toFixed(4),
              conditions: {
                isSpeaking,
                audioLevelCheck: enhancedAudioLevel > 0.001,
                notProcessing: !isProcessing,
                combined: enhancedAudioLevel > 0.001 && !isProcessing
              }
            });
          }

          return (
            <motion.div
              key={`visualizer-bar-${i}`}
              className="absolute"
              style={{
                height: `${totalHeight}px`,
                width: barWidth,
                borderRadius: '12px',
                background: `linear-gradient(to top, transparent 0%, ${barColor} 10%, ${barColor} 100%)`,
                transformOrigin: 'bottom center',
                transform: `rotate(${angle}deg) translateY(-150px)`,
                boxShadow: glowEffect,
                filter: 'blur(0.2px)',
              }}
              animate={{
                height: [
                  `${totalHeight}px`,
                  `${totalHeight + (isSpeaking ? 30 : enhancedAudioLevel > 0.001 && !isProcessing ? enhancedAudioLevel * 120 : 5)}px`,
                  `${totalHeight}px`
                ],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: isSpeaking ? 0.2 : 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.01,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* CENTER AVATAR WITH DEBUG INFO */}
      <motion.div
        className="relative w-48 h-48 rounded-full overflow-hidden border-6 flex items-center justify-center z-20"
        style={{
          borderColor: isSpeaking 
            ? '#22c55e' 
            : isProcessing 
              ? '#f59e0b' 
              : enhancedAudioLevel > 0.001 && !isProcessing
                ? '#3b82f6'
                : '#e5e7eb',
          boxShadow: isSpeaking 
            ? '0 0 50px rgba(34, 197, 94, 0.8)'
            : isProcessing 
              ? '0 0 50px rgba(245, 158, 11, 0.8)'
              : enhancedAudioLevel > 0.001 && !isProcessing
                ? '0 0 40px rgba(59, 130, 246, 0.7)'
                : '0 0 25px rgba(0, 0, 0, 0.2)'
        }}
        animate={{
          scale: isSpeaking
            ? [1, 1.1, 1]
            : enhancedAudioLevel > 0.001 && !isProcessing
              ? [1, 1 + enhancedAudioLevel * 0.5, 1]
              : [1, 1.02, 1]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={avatarSrc} 
          alt="Bot Avatar" 
          className="w-full h-full object-cover"
        />
        
        {/* Status indicator overlay with debug info */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white/95 drop-shadow-2xl"
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isSpeaking && <Volume2 className="w-14 h-14" />}
            {isProcessing && <Zap className="w-14 h-14" />}
            {isListening && !isSpeaking && !isProcessing && enhancedAudioLevel > 0.001 && (
              <Activity className="w-14 h-14" />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ENHANCED DEBUG STATUS DISPLAY */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm text-white font-bold">
              {isSpeaking ? '🟢 GREEN - Bot Speaking' : 
               isProcessing ? '🟡 YELLOW - Processing' : 
               enhancedAudioLevel > 0.001 ? '🔵 BLUE - User Voice!' : '⚪ IDLE - Ready'}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-300">Raw:</span>
              <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-75"
                  style={{ width: `${Math.max(audioLevel * 1000, 2)}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{(audioLevel * 1000).toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-300">Enhanced:</span>
              <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-75 ${
                    isSpeaking ? 'bg-green-500' :
                    isProcessing ? 'bg-yellow-500' :
                    enhancedAudioLevel > 0.001 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${Math.max(enhancedAudioLevel * 100, 2)}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{(enhancedAudioLevel * 100).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FIXED DEBUGGING COMPONENT - Monitors and logs state changes
const AudioStateDebugger = ({ isSpeaking, isProcessing, isListening, audioLevel, currentAudioRef, mediaRecorderRef }) => {
  React.useEffect(() => {
    console.log('🔍 STATE DEBUG:', {
      timestamp: new Date().toISOString(),
      isSpeaking,
      isProcessing,
      isListening,
      audioLevel: audioLevel.toFixed(4),
      enhancedAudioLevel: (audioLevel * 50).toFixed(4),
      shouldShowGreen: isSpeaking,
      shouldShowBlue: audioLevel * 50 > 0.001 && !isProcessing && !isSpeaking,
      currentAudioExists: !!currentAudioRef.current,
      mediaRecorderState: mediaRecorderRef.current?.state || 'not-initialized'
    });
  }, [isSpeaking, isProcessing, isListening, audioLevel]);

  return null;
};

// TESTING COMPONENT - Monitors and logs state changes
const AudioLevelTester = () => {
  React.useEffect(() => {
    // Force some test audio levels to see if the visualization works
    const testLevels = () => {
      const randomLevel = Math.random() * 0.5; // Random level between 0 and 0.5
      console.log('🧪 TEST: Setting random audio level:', randomLevel.toFixed(4));
      setAudioLevel(randomLevel);
    };
    
    // Test every 2 seconds
    const testInterval = setInterval(testLevels, 2000);
    
    // Clean up after 30 seconds
    setTimeout(() => {
      clearInterval(testInterval);
      console.log('🧪 TEST: Audio level testing stopped');
    }, 30000);
    
    return () => clearInterval(testInterval);
  }, []);
  
  return null;
};

// =====================================
// MAIN VOICE CALL COMPONENT
// =====================================

const VoiceCallUltra = ({ 
  isOpen, 
  onClose, 
  onMessageReceived, 
  audioContextRef: externalAudioContextRef,
  connectionQuality: externalConnectionQuality
}) => {
  const { selectedBotId } = useBot();
  const { userDetails } = useUser();
  
  // Component states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [responseStarted, setResponseStarted] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState(externalConnectionQuality || 'excellent');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);

  // Audio refs
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(externalAudioContextRef?.current || null);
  const analyserRef = useRef(null);
  const audioChunksRef = useRef([]);
  const currentAudioRef = useRef(null);
  const silenceDetectionIntervalRef = useRef(null);
  const processAudioRef = useRef(null);
  const requestInProgress = useRef(false);
  
  const voiceActivityRef = useRef({
    isDetected: false,
    silenceTimer: null,
    isRecording: false
  });

  const performanceMetrics = useRef({
    requestStartTime: 0,
    requestCount: 0,
    ultraFastTargetsMet: 0,
    errorCount: 0
  });

  // Memoized bot name
  const botName = useMemo(() => {
    const bot = BOT_DETAILS.find(b => b.bot_id === selectedBotId);
    return bot ? bot.name : 'AI Assistant';
  }, [selectedBotId]);

  // =====================================
  // AUDIO FUNCTIONS
  // =====================================

  const enableAudioForBrowser = useCallback(async () => {
    try {
      console.log('🎵 ULTRA: Enabling browser audio...');
      
      if (externalAudioContextRef?.current) {
        audioContextRef.current = externalAudioContextRef.current;
      } else if (!audioContextRef.current) {
        const AudioContext = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
        if (AudioContext) {
          audioContextRef.current = new AudioContext(AUDIO_CONTEXT_CONFIG);
        }
      }
      
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current?.resume();
      }
      
      setAudioEnabled(true);
      setUserInteracted(true);
      setShowAudioPrompt(false);
      
      return true;
    } catch (error) {
      console.error('❌ ULTRA: Audio enable failed:', error);
      return false;
    }
  }, [externalAudioContextRef]);

  const playAudioResponse = useCallback(async (audioBase64) => {
    if (!audioBase64) {
      console.warn('🎵 DEBUG: No audio data provided');
      return;
    }

    try {
      console.log('🎵 DEBUG: Starting audio playback...');
      console.log('🎵 DEBUG: Audio data length:', audioBase64.length);
      
      if (!audioEnabled) {
        console.log('🎵 DEBUG: Enabling audio...');
        setAudioEnabled(true);
        setUserInteracted(true);
        setShowAudioPrompt(false);
      }

      if (audioContextRef.current?.state === 'suspended') {
        console.log('🎵 DEBUG: Resuming audio context...');
        await audioContextRef.current?.resume();
      }

      console.log('🎵 DEBUG: Setting isSpeaking to TRUE');
      setIsSpeaking(true);
      
      const base64Data = audioBase64.includes(',') ? audioBase64.split(',')[1] : audioBase64;
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.volume = 1.0;
      
      const audioDataUrl = `data:audio/wav;base64,${base64Data}`;
      currentAudioRef.current = audio;
      
      // Add event listeners for debugging
      audio.onloadstart = () => console.log('🎵 DEBUG: Audio load started');
      audio.onloadeddata = () => console.log('🎵 DEBUG: Audio data loaded');
      audio.oncanplay = () => console.log('🎵 DEBUG: Audio can play');
      audio.onplay = () => console.log('🎵 DEBUG: Audio play started');
      audio.onplaying = () => console.log('🎵 DEBUG: Audio is playing');
      audio.onpause = () => console.log('🎵 DEBUG: Audio paused');
      audio.onended = () => console.log('🎵 DEBUG: Audio ended');
      audio.onerror = (e) => console.error('🎵 DEBUG: Audio error:', e);
    
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          console.error('🎵 DEBUG: Audio timeout after 8 seconds');
          reject(new Error('Audio timeout'));
        }, 8000);
        
        let resolved = false;
        const resolveOnce = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            console.log('🎵 DEBUG: Audio playback completed');
            resolve();
          }
        };
        
        audio.onloadeddata = () => {
          console.log('🎵 DEBUG: Audio loaded, attempting to play...');
          const playPromise = audio.play();
          if (playPromise?.then) {
            playPromise.then(() => {
              console.log('🎵 DEBUG: Audio play promise resolved');
              // Don't resolve immediately, wait for ended event
            }).catch((playError) => {
              console.error('🎵 DEBUG: Audio play promise rejected:', playError);
              if (!resolved) {
                resolved = true;
                clearTimeout(timeoutId);
                reject(playError);
              }
            });
          }
        };
        
        audio.onended = () => {
          console.log('🎵 DEBUG: Audio ended naturally');
          resolveOnce();
        };
        
        audio.onerror = (e) => {
          console.error('🎵 DEBUG: Audio error occurred:', e);
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            reject(new Error('Audio error'));
          }
        };
        
        console.log('🎵 DEBUG: Setting audio source...');
        audio.src = audioDataUrl;
      });
    
    } catch (error) {
      console.error('❌ ULTRA: Audio playback failed:', error);
      if (error.message.includes('NotAllowedError')) {
        setShowAudioPrompt(true);
      }
      setError('Audio failed');
      setTimeout(() => setError(null), 2000);
    } finally {
      console.log('🎵 DEBUG: Setting isSpeaking to FALSE');
      setIsSpeaking(false);
      setAudioLevel(0);
      currentAudioRef.current = null;
    }
  }, [audioEnabled]);

  const processWithBackend = useCallback(async (audioBlob) => {
    if (requestInProgress.current) {
      console.log('🚀 ULTRA: Request already in progress, skipping...');
      return;
    }
    
    console.log('🚀 BACKEND: Starting processing with blob size:', audioBlob.size);
    requestInProgress.current = true;
    setIsProcessing(true);
    performanceMetrics.current.requestCount++;
    
    try {
      const formData = new FormData();
      formData.append('audio_file', audioBlob, `ultra_${Date.now()}.webm`);
      formData.append('bot_id', selectedBotId || 'delhi_mentor_male');
      formData.append('email', userDetails?.email || 'test@example.com');
      formData.append('platform', 'web_voice_ultra_v13_fixed');
      
      console.log('🚀 BACKEND: Sending request to backend...');
      
      const response = await fetch('http://127.0.0.1:8000/voice-call-ultra-fast', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(30000), // Increased timeout
      });
      
      console.log('🚀 BACKEND: Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🚀 BACKEND: Response data:', data);
      
      if (data.transcript) {
        console.log('📝 TRANSCRIPT:', data.transcript);
        onMessageReceived?.({
          text: data.transcript,
          sender: 'user',
          timestamp: new Date(),
          isVoiceMessage: true,
        });
      }
      
      if (data.text_response) {
        console.log('🤖 BOT RESPONSE:', data.text_response);
        onMessageReceived?.({
          text: data.text_response,
          sender: 'bot',
          timestamp: new Date(),
          bot_id: selectedBotId,
          isVoiceMessage: true,
        });
        
        if (data.audio_base64 && data.audio_base64.length > 100) {
          console.log('🎵 PLAYING: Bot audio response');
          await playAudioResponse(data.audio_base64);
        } else {
          console.warn('⚠️ No audio response received');
        }
      }
      
    } catch (error) {
      console.error('❌ ULTRA: Processing failed:', error);
      setError(`Processing failed: ${error.message}`);
      setTimeout(() => setError(null), 4000);
      performanceMetrics.current.errorCount++;
    } finally {
      requestInProgress.current = false;
      setIsProcessing(false);
      setResponseStarted(false);
      console.log('🚀 BACKEND: Processing completed');
    }
  }, [selectedBotId, userDetails, onMessageReceived, playAudioResponse]);

  const setupMicrophone = useCallback(async () => {
    try {
      console.log('🎤 SETUP: Starting microphone setup...');
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1,
          sampleRate: 48000, // Changed from 16000 to 48000 for better compatibility
        }
      });

      console.log('🎤 SETUP: Got media stream successfully');
      streamRef.current = stream;

      // Setup MediaRecorder with better options
      const options = { 
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 32000 // Increased for better quality
      };
      
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.warn('⚠️ Opus codec not supported, using default');
        options.mimeType = 'audio/webm';
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      console.log('🎤 SETUP: MediaRecorder created successfully');

      // Setup audio analysis
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      try {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 512; // Increased for better analysis
        analyserRef.current.smoothingTimeConstant = 0.3;
        source.connect(analyserRef.current);
        console.log('🎤 SETUP: Audio analysis connected successfully');
      } catch (analysisError) {
        console.error('❌ Audio analysis setup failed:', analysisError);
      }

      // Setup MediaRecorder event handlers
      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log('🎤 DATA: Received audio data:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log('🎤 STOP: Recording stopped, processing audio...');
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          console.log('🎤 BLOB: Created audio blob:', audioBlob.size, 'bytes');
          audioChunksRef.current = [];
          
          if (processAudioRef.current && audioBlob.size > 1000) {
            console.log('🎤 PROCESSING: Sending to backend...');
            await processAudioRef.current(audioBlob);
          } else {
            console.warn('⚠️ Audio blob too small or no processor:', audioBlob.size);
          }
        } else {
          console.warn('⚠️ No audio chunks collected');
        }
      };

      mediaRecorderRef.current.onstart = () => {
        console.log('🎤 START: Recording started successfully');
      };

      mediaRecorderRef.current.onerror = (error) => {
        console.error('❌ MediaRecorder error:', error);
      };
      
      console.log('🎤 SETUP: Microphone setup completed successfully');
      return true;
    } catch (error) {
      console.error('❌ ULTRA: Microphone setup failed:', error);
      setError('Microphone access denied - please allow microphone permissions');
      setTimeout(() => setError(null), 5000);
      return false;
    }
  }, []);

  const startVoiceActivityDetection = useCallback(() => {
    console.log('🎤 VAD: Starting voice activity detection...');

    const checkVoiceActivity = () => {
      if (!isCallActive || isMuted) {
        console.log('🎤 VAD: Skipping - not active or muted');
        return;
      }
      
      if (analyserRef.current) {
        try {
          analyserRef.current.getByteFrequencyData(REUSABLE_FREQUENCY_BUFFER);
          
          let sum = 0;
          let max = 0;
          let activeFrequencies = 0;
          
          // Analyze frequency data
          for (let i = 0; i < REUSABLE_FREQUENCY_BUFFER.length; i++) {
            const value = REUSABLE_FREQUENCY_BUFFER[i];
            sum += value;
            max = Math.max(max, value);
            if (value > 2) activeFrequencies++; // Very low threshold
          }
          
          const average = sum / REUSABLE_FREQUENCY_BUFFER.length;
          
          // ULTRA SENSITIVE audio level calculation
          const rawLevel = Math.max(average / 3, max / 8, activeFrequencies / 10); // Super sensitive
          const amplifiedLevel = Math.min(Math.pow(rawLevel, 0.2) * 5, 1); // Massive amplification
          
          // ALWAYS update audio level - this is the key fix!
          setAudioLevel(amplifiedLevel);
          
          // Detailed logging every time
          console.log('🎤 VAD LIVE:', {
            average: average.toFixed(1),
            max: max.toFixed(1),
            activeFreqs: activeFrequencies,
            rawLevel: rawLevel.toFixed(4),
            amplifiedLevel: amplifiedLevel.toFixed(4),
            currentStates: {
              isSpeaking,
              isProcessing,
              isListening,
              isMuted,
              isCallActive
            }
          });
          
          // Voice detection for recording
          const voiceDetected = average > 5 || max > 15 || activeFrequencies > 8; // Very sensitive
          
          // Recording logic
          if (voiceDetected && !isSpeaking && !isProcessing) {
            if (!voiceActivityRef.current.isDetected) {
              voiceActivityRef.current.isDetected = true;
              console.log('🎤 VOICE: Voice activity detected!');
              
              if (!voiceActivityRef.current.isRecording && 
                  mediaRecorderRef.current && 
                  mediaRecorderRef.current.state === 'inactive') {
                try {
                  console.log('🎤 START: Starting recording...');
                  mediaRecorderRef.current.start();
                  voiceActivityRef.current.isRecording = true;
                } catch (startError) {
                  console.error('❌ Recording start failed:', startError);
                }
              }
            }
            
            // Clear any existing silence timer
            if (voiceActivityRef.current.silenceTimer) {
              clearTimeout(voiceActivityRef.current.silenceTimer);
              voiceActivityRef.current.silenceTimer = null;
            }
          } else if (voiceActivityRef.current.isDetected && !voiceDetected && !isSpeaking) {
            // Start silence timer
            if (!voiceActivityRef.current.silenceTimer) {
              voiceActivityRef.current.silenceTimer = setTimeout(() => {
                console.log('🤫 SILENCE: Stopping recording due to silence');
                voiceActivityRef.current.isDetected = false;
                
                if (voiceActivityRef.current.isRecording && 
                    mediaRecorderRef.current && 
                    mediaRecorderRef.current.state === 'recording') {
                  try {
                    mediaRecorderRef.current.stop();
                    voiceActivityRef.current.isRecording = false;
                  } catch (stopError) {
                    console.error('❌ Recording stop failed:', stopError);
                  }
                }
              }, SILENCE_DURATION);
            }
          }
          
        } catch (error) {
          console.error('❌ Audio analysis error:', error);
          // Set a test level even on error
          setAudioLevel(0.1);
        }
      } else {
        console.warn('⚠️ No audio analyser available');
        // Set a test level when no analyser
        setAudioLevel(0.05);
      }
    };
    
    const interval = setInterval(checkVoiceActivity, CHECK_INTERVAL);
    silenceDetectionIntervalRef.current = interval;
    
    console.log('🎤 VAD: Voice activity detection started');
  }, [isCallActive, isSpeaking, isMuted, isProcessing, isListening]); // Added all dependencies

  // =====================================
  // CALL MANAGEMENT
  // =====================================

  const startCall = useCallback(async () => {
    try {
      await enableAudioForBrowser();
      
      const micSetup = await setupMicrophone();
      if (!micSetup) return;
      
      processAudioRef.current = processWithBackend;
      setIsCallActive(true);
      setIsListening(true);
      
      startVoiceActivityDetection();
      
    } catch (error) {
      console.error('❌ ULTRA: Start call failed:', error);
      setError('Failed to start call');
      setTimeout(() => setError(null), 3000);
    }
  }, [enableAudioForBrowser, setupMicrophone, processWithBackend, startVoiceActivityDetection]);

  const endCall = useCallback(() => {
    setIsCallActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsProcessing(false);
    setAudioLevel(0);
    
    if (silenceDetectionIntervalRef.current) {
      clearInterval(silenceDetectionIntervalRef.current);
      silenceDetectionIntervalRef.current = null;
    }
    
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    onClose?.();
  }, [onClose]);

  // =====================================
  // EFFECTS
  // =====================================

  useEffect(() => {
    if (isOpen && !isCallActive) {
      startCall();
    }
    return () => {
      if (isCallActive) {
        endCall();
      }
    };
  }, [isOpen]);

  // =====================================
  // RENDER
  // =====================================

  if (!isOpen) return null;

  const enhancedAudioLevel = Math.min(Math.pow(audioLevel * 3, 0.7), 1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: '#f8fafc' }}
      >
        {/* Header */}
        <motion.div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <h1 className="text-gray-700 text-lg font-semibold tracking-wide">
              {botName}
            </h1>
            <div className="flex items-center justify-center mt-1 space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">
                {connectionQuality} connection
              </span>
            </div>
          </div>
        </motion.div>

        {/* Processing indicator */}
        <AnimatePresence>
          {(isProcessing || responseStarted) && (
            <motion.div
              className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-xl">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {isProcessing ? 'Processing...' : 'Responding...'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main avatar */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <EnhancedBotAvatar
              audioLevel={audioLevel}
              isListening={isListening && !isSpeaking}
              isSpeaking={isSpeaking}
              isProcessing={isProcessing}
              botId={selectedBotId}
            />
          </motion.div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </motion.button>

            {/* 🧪 TEST RECORDING BUTTON - REMOVE AFTER TESTING */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                console.log('🧪 TEST: Manual recording test...');
                if (mediaRecorderRef.current?.state === 'inactive') {
                  try {
                    console.log('🧪 TEST: Starting 3 second recording');
                    mediaRecorderRef.current.start();
                    setTimeout(() => {
                      if (mediaRecorderRef.current?.state === 'recording') {
                        console.log('🧪 TEST: Stopping recording');
                        mediaRecorderRef.current.stop();
                      }
                    }, 3000);
                  } catch (error) {
                    console.error('🧪 TEST: Manual recording failed:', error);
                  }
                } else {
                  console.log('🧪 TEST: MediaRecorder state:', mediaRecorderRef.current?.state);
                }
              }}
              className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg"
              title="Test 3s Recording"
            >
              🎤
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center transition-all duration-200 shadow-lg"
            >
              <X className="w-7 h-7" />
            </motion.button>
          </motion.div>
        </div>

        {/* Status indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-colors duration-200 ${
                  isSpeaking ? 'bg-green-500' :
                  isProcessing ? 'bg-yellow-500' :
                  enhancedAudioLevel > 0.02 ? 'bg-blue-500' : 'bg-gray-400'
                }`}
                style={{
                  width: `${Math.min(audioLevel * 100, 100)}%`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-red-500 text-white rounded-xl shadow-xl max-w-sm"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
            >
              <p className="text-sm text-center font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio prompt */}
        {showAudioPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4">
                Enable Audio Playback
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                To hear responses, please enable audio playback in your browser.
              </p>
              <button
                onClick={enableAudioForBrowser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
              >
                Enable Audio
              </button>
            </div>
          </div>
        )}

        {/* DEBUG PANEL - Remove after testing */}
        <div className="absolute top-32 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs">
          <div className="space-y-1">
            <div>🎤 Audio Level: {(audioLevel * 1000).toFixed(2)}</div>
            <div>🔊 Enhanced: {((audioLevel * 50) * 100).toFixed(2)}%</div>
            <div>🎵 Speaking: {isSpeaking ? 'TRUE' : 'FALSE'}</div>
            <div>⚡ Processing: {isProcessing ? 'TRUE' : 'FALSE'}</div>
            <div>👂 Listening: {isListening ? 'TRUE' : 'FALSE'}</div>
            <div>🎯 Should Show Green: {isSpeaking ? 'YES' : 'NO'}</div>
            <div>🎯 Should Show Blue: {(audioLevel * 50 > 0.001 && !isProcessing && !isSpeaking) ? 'YES' : 'NO'}</div>
            <div>🎪 Current State: {
              isSpeaking ? 'GREEN_BARS' : 
              (audioLevel * 50 > 0.001 && !isProcessing && !isSpeaking) ? 'BLUE_BARS' : 'IDLE'
            }</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceCallUltra;










