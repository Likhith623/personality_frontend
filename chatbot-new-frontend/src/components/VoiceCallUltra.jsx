// VoiceCallUltra.jsx
// 🚀 ULTRA-OPTIMIZED VOICE CALL V3: Maximum Performance Edition
// Enhanced version with additional optimizations and error handling

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, X, Zap, Activity } from "lucide-react";
import { useBot } from '@/support/BotContext';
import { useUser } from '@/support/UserContext';

// ===========================================
// CONSTANTS AND CONFIGURATIONS
// ===========================================

const AUDIO_CONTEXT_CONFIG = {
  latencyHint: 'interactive',
  sampleRate: 8000, // Match backend's ultra-fast format
  echoCancellation: false,
  noiseSuppression: false,
  autoGainControl: false,
  channelCount: 1
};

const VOICE_THRESHOLD = 0.0003;
const INTERRUPTION_THRESHOLD = 0.025;
const SILENCE_DURATION = 200; // Reduced from 300 to 200ms for faster response
const CHECK_INTERVAL = 4; // Reduced from 6 to 4ms for faster polling
const VOICE_START = 5;
const VOICE_END = 22;

// Pre-allocated buffers for zero garbage collection
const REUSABLE_FREQUENCY_BUFFER = new Uint8Array(128);

// Enhanced performance metrics
const globalPerformanceMetrics = {
  cacheOptimizationLevel: 'ultra',
  useOptimizedDeepgramKey: true,
  deepgramPerformance: null,
  redisPerformance: null,
  correctInstantPredictions: 0,
  instantPatternMatches: 0,
  totalOptimizationsSaved: 0,
  ultraFastHits: 0,
  smartAudioFormatOptimizations: 0
};

// Bot details for name resolution
const BOT_DETAILS = [
  { bot_id: "delhi_mentor_male", name: "Delhi Mentor" },
  { bot_id: "delhi_mentor_female", name: "Delhi Mentor" },
  { bot_id: "delhi_friend_male", name: "Delhi Friend" },
  { bot_id: "delhi_friend_female", name: "Delhi Friend" },
  { bot_id: "delhi_romantic_male", name: "Delhi Romantic" },
  { bot_id: "delhi_romantic_female", name: "Delhi Romantic" },
  { bot_id: "japanese_mentor_male", name: "Japanese Mentor" },
  { bot_id: "japanese_mentor_female", name: "Japanese Mentor" },
  { bot_id: "japanese_friend_male", name: "Japanese Friend" },
  { bot_id: "japanese_friend_female", name: "Japanese Friend" },
  { bot_id: "japanese_romantic_male", name: "Japanese Romantic" },
  { bot_id: "japanese_romantic_female", name: "Japanese Romantic" },
  { bot_id: "parisian_mentor_male", name: "Parisian Mentor" },
  { bot_id: "parisian_mentor_female", name: "Parisian Mentor" },
  { bot_id: "parisian_friend_male", name: "Parisian Friend" },
  { bot_id: "parisian_friend_female", name: "Parisian Friend" },
  { bot_id: "parisian_romantic_male", name: "Parisian Romantic" },
  { bot_id: "parisian_romantic_female", name: "Parisian Romantic" },
  { bot_id: "berlin_mentor_male", name: "Berlin Mentor" },
  { bot_id: "berlin_mentor_female", name: "Berlin Mentor" },
  { bot_id: "berlin_friend_male", name: "Berlin Friend" },
  { bot_id: "berlin_friend_female", name: "Berlin Friend" },
  { bot_id: "berlin_romantic_male", name: "Berlin Romantic" },
  { bot_id: "berlin_romantic_female", name: "Berlin Romantic" },
  { bot_id: "Krishna", name: "Krishna" },
  { bot_id: "Rama", name: "Rama" },
  { bot_id: "Shiva", name: "Shiva" },
  { bot_id: "Trimurti", name: "Trimurti" },
  { bot_id: "Hanuman", name: "Hanuman" }
];

// =====================================
// HELPER FUNCTIONS
// =====================================

// 🚀 FASTAPI INTEGRATION 2: Enhanced instant response prediction with FastAPI patterns
const INSTANT_PATTERNS = {
  'hello': "Hello! How can I help you today?",
  'hi': "Hi there! What can I do for you?",
  'hey': "Hey! What's on your mind?",
  'good morning': "Good morning! Hope you're having a great day!",
  'good afternoon': "Good afternoon! How can I assist you?",
  'good evening': "Good evening! What can I help you with?",
  'how are you': "I'm doing great, thank you for asking!",
  'thank you': "You're very welcome!",
  'thanks': "You're welcome!",
  'bye': "Goodbye! Have a wonderful day!",
  'goodbye': "Goodbye! Take care!",
  'yes': "Great!",
  'no': "I understand.",
  'okay': "Perfect!",
  'ok': "Got it!",
  'help': "I'm here to help! What do you need assistance with?",
  'sorry': "No worries at all!",
  'wow': "I'm glad you think so!",
  'cool': "Thanks! I'm happy to help!",
  'awesome': "That's wonderful to hear!",
  'great': "Fantastic!",
  'nice': "Thank you!",
  'perfect': "Excellent!",
  'sure': "Absolutely!",
  'exactly': "You got it!",
  'right': "That's correct!",
  'correct': "Exactly right!",
  'wrong': "Let me help clarify that.",
  'maybe': "What are you thinking about?",
  'perhaps': "Tell me more about that.",
  'definitely': "I love your certainty!",
  'absolutely': "Completely agree!",
  'of course': "Naturally!"
};

// Enhanced instant response detection with FastAPI integration
const checkForInstantResponse = (transcript) => {
  const instantPatterns = [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
    'how are you', 'thank you', 'thanks', 'bye', 'goodbye', 'yes', 'no',
    'okay', 'ok', 'help', 'sorry', 'wow', 'cool', 'awesome', 'great',
    'nice', 'perfect', 'sure', 'exactly', 'right', 'correct', 'wrong',
    'maybe', 'perhaps', 'definitely', 'absolutely', 'of course'
  ];
  
  const normalized = transcript.toLowerCase().trim();
  const isInstant = instantPatterns.some(pattern => normalized.includes(pattern));
  
  if (isInstant) {
    globalPerformanceMetrics.instantPatternMatches++;
    globalPerformanceMetrics.ultraFastHits++;
  }
  
  return { isInstant, pattern: isInstant ? normalized : null };
};

// 🚀 FASTAPI INTEGRATION 2: Enhanced instant response prediction
const predictInstantResponse = (transcript) => {
  const normalized = transcript.toLowerCase().trim();
  if (INSTANT_PATTERNS[normalized]) {
    return { isInstant: true, response: INSTANT_PATTERNS[normalized] };
  }
  return { isInstant: false, response: null };
};

// 🚀 BACKEND-ALIGNED: TTS Cache Prediction matching backend's cache strategy
const predictBackendTTSCache = (text, botId) => {
  const commonBackendCached = [
    'hello', 'hi', 'how can i help', 'thank you', 'you\'re welcome',
    'goodbye', 'i understand', 'great', 'perfect', 'got it', 'exactly',
    'that\'s right', 'wonderful', 'amazing', 'interesting', 'i see',
    'absolutely', 'of course', 'naturally', 'fantastic', 'excellent'
  ];
  
  const normalized = text.toLowerCase();
  const cacheHit = commonBackendCached.some(cached => normalized.includes(cached));
  
  return cacheHit;
};

// 🚀 BACKEND-ALIGNED: Instant Response Detection matching backend's INSTANT_RESPONSES
const checkInstantResponseWithBackend = (transcript) => {
  // This matches your backend's INSTANT_RESPONSES exactly
  const backendInstantResponses = {
    "hello": "Hello! How can I help you today?",
    "hi": "Hi there! What can I do for you?",
    "good morning": "Good morning! How are you doing today?",
    "good afternoon": "Good afternoon! How can I assist you?",
    "good evening": "Good evening! What brings you here today?",
    "how are you": "I'm doing great, thank you for asking! How are you?",
    "thank you": "You're very welcome! Is there anything else I can help you with?",
    "thanks": "You're welcome! Happy to help!",
    "bye": "Goodbye! Have a wonderful day!",
    "goodbye": "Goodbye! It was great talking with you!",
    "help": "I'm here to help! What would you like to know?",
    "what's your name": "I'm your AI assistant. What's your name?",
    "who are you": "I'm an AI assistant here to help you with any questions you might have."
  };
  
  const normalized = transcript.toLowerCase().trim();
  return backendInstantResponses[normalized] || null;
};

// 🚀 BACKEND-ALIGNED: Instant Response Checker for backend compatibility
const shouldUseInstantResponseBackend = (transcript) => {
  const instantResponse = checkInstantResponseWithBackend(transcript);
  return instantResponse !== null;
};

// 🚀 SMART AUDIO FORMAT INTEGRATION: Match backend's get_smart_audio_format() for maximum performance
const getSmartAudioFormatBackend = (performanceMetricsRef) => {
  // This function matches the backend's smart audio format selection logic
  // Based on connection quality, device capabilities, and performance metrics
  
  // Check connection quality and performance metrics
  const connectionQuality = performanceMetricsRef?.current?.connectionQuality || 'good';
  const networkLatency = performanceMetricsRef?.current?.networkLatency || 500;
  const audioProcessingTime = performanceMetricsRef?.current?.audioProcessingTime || 200;
  
  // Track smart audio format optimization usage
  globalPerformanceMetrics.smartAudioFormatOptimizations++;
  globalPerformanceMetrics.totalOptimizationsSaved++;
  
  // Backend's smart format selection logic
  if (networkLatency < 200 && audioProcessingTime < 100) {
    // Ultra-fast connection: use highest quality format
    return 'wav_48khz_stereo';
  } else if (networkLatency < 500 && audioProcessingTime < 300) {
    // Good connection: use balanced format
    return 'wav_44khz_mono';
  } else if (networkLatency < 1000) {
    // Average connection: use compressed format
    return 'opus_32kbps_mono';
  } else {
    // Slow connection: use most compressed format
    return 'mp3_24kbps_mono';
  }
};

// Legacy function for backward compatibility
const getInstantResponseLocally = (transcript) => {
  return checkInstantResponseWithBackend(transcript);
};

// Enhanced audio format validator with better browser compatibility checking
const validateAudioFormat = (base64Data) => {
  try {
    if (!base64Data || base64Data.length < 100) {
      console.warn('⚠️ ULTRA: Audio data too short or missing');
      return false;
    }
    
    const binaryString = atob(base64Data);
    if (binaryString.length < 100) {
      console.warn('⚠️ ULTRA: Decoded audio data too short');
      return false;
    }
    
    const header = binaryString.substring(0, 12);
    const headerBytes = Array.from(header).map(c => c.charCodeAt(0));
    
    // Enhanced format detection with better logging
    const isWAV = headerBytes[0] === 0x52 && headerBytes[1] === 0x49; // "RI" from "RIFF"
    const isMP3 = headerBytes[0] === 0xFF && (headerBytes[1] & 0xE0) === 0xE0;
    const isOGG = headerBytes[0] === 0x4F && headerBytes[1] === 0x67; // "Og"
    const isMP4 = headerBytes[4] === 0x66 && headerBytes[5] === 0x74; // "ft" from "ftyp"
    
    const isValid = isWAV || isMP3 || isOGG || isMP4;
    
    if (isValid) {
      const format = isWAV ? 'WAV' : isMP3 ? 'MP3' : isOGG ? 'OGG' : 'MP4';
      console.log(`✅ ULTRA: Valid ${format} audio format detected`);
    } else {
      console.warn('⚠️ ULTRA: Unknown audio format, proceeding anyway');
      // Return true anyway - browser might still be able to play it
      return true;
    }
    
    return isValid;
  } catch (error) {
    console.warn('⚠️ ULTRA: Audio validation error:', error.message);
    return true; // Allow playback attempt even if validation fails
  }
};

// =====================================
// ENHANCED CHATGPT CIRCLE COMPONENT
// =====================================

const EnhancedChatGPTCircle = ({ audioLevel = 0, isListening, isSpeaking, isProcessing }) => {
  const baseSize = 280;
  
  const calculateSize = () => {
    if (isSpeaking) {
      return baseSize + (audioLevel * 80);
    } else if (isListening) {
      return baseSize + (audioLevel * 50);
    } else if (isProcessing) {
      return baseSize + 20;
    }
    return baseSize;
  };

  const currentSize = calculateSize();
  
  // Enhanced color scheme based on state
  const getGradient = () => {
    if (isSpeaking) {
      return 'linear-gradient(135deg, #10b981 0%, #059669 30%, #047857 70%, #065f46 100%)';
    } else if (isProcessing) {
      return 'linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #b45309 70%, #92400e 100%)';
    } else if (isListening) {
      return 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 30%, #2563eb 70%, #1d4ed8 100%)';
    }
    return 'linear-gradient(135deg, #6b7280 0%, #4b5563 30%, #374151 70%, #1f2937 100%)';
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          background: getGradient(),
          boxShadow: isSpeaking 
            ? '0 0 100px rgba(16, 185, 129, 0.4)' 
            : isProcessing 
            ? '0 0 100px rgba(245, 158, 11, 0.4)'
            : '0 0 80px rgba(59, 130, 246, 0.25)',
        }}
        animate={{
          scale: [1, 1 + (audioLevel * 0.15), 1]
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {/* Enhanced ripple effects */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-white/15"
              style={{
                transform: `scale(${0.2 + (i * 0.08)})`,
              }}
              animate={{
                opacity: [0.05, 0.25, 0.05],
                scale: [0.2 + (i * 0.08), 0.3 + (i * 0.08), 0.2 + (i * 0.08)]
              }}
              transition={{
                duration: 2.5 + (i * 0.15),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08
              }}
            />
          ))}

          {/* Enhanced center visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-white/50 rounded-full"
                style={{
                  height: `${15 + (audioLevel * 80)}px`,
                  transform: `rotate(${i * 30}deg) translateY(-${50 + (audioLevel * 25)}px)`,
                  transformOrigin: 'center bottom',
                }}
                animate={{
                  scaleY: [0.3, 1.8 + audioLevel * 1.2, 0.3],
                  opacity: [0.3, 0.9, 0.3]
                }}
                transition={{
                  duration: 0.5 + (i * 0.05),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.03
                }}
              />
            ))}
          </div>

          {/* Enhanced glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.7 + audioLevel * 0.8, 0.3],
              scale: [0.85, 1.4 + audioLevel * 0.5, 0.85]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Ultra-fast pulse for high activity */}
          {audioLevel > 0.15 && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40"
              initial={{ scale: 0.7, opacity: 0.9 }}
              animate={{ 
                scale: [0.7, 1.6, 2.2], 
                opacity: [0.9, 0.3, 0] 
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </div>

        {/* State indicator in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white/80"
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isSpeaking && <Volume2 className="w-8 h-8" />}
            {isProcessing && <Zap className="w-8 h-8" />}
            {isListening && !isSpeaking && !isProcessing && <Activity className="w-8 h-8" />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
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
  const [audioFormat, setAudioFormat] = useState('wav_pcm_16khz');
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
  
  // 🚀 ADD: Request deduplication ref
  const requestInProgress = useRef(false);
  
  const voiceActivityRef = useRef({
    isDetected: false,
    silenceTimer: null,
    isRecording: false
  });

  // Enhanced performance metrics with FastAPI optimizations tracking
  const performanceMetrics = useRef({
    requestStartTime: 0,
    totalResponseTime: 0,
    requestCount: 0,
    averageResponseTime: 0,
    backendPerformance: null,
    ultraFastTargetsMet: 0,
    cacheHits: 0,
    instantResponseHits: 0,
    errorCount: 0,
    networkLatency: 0,
    audioProcessingTime: 0,
    totalOptimizations: 0,
    // 🚀 FASTAPI INTEGRATION 3: Performance tracking
    backendOptimizations: [],
    fastApiResponseTimes: [],
    optimizationsSaved: 0
  });

  // Memoized bot name for performance
  const botName = useMemo(() => {
    const bot = BOT_DETAILS.find(b => b.bot_id === selectedBotId);
    return bot ? bot.name : 'AI Assistant';
  }, [selectedBotId]);

  // Add this function BEFORE the playAudioResponse callback (around line 550)

// 🚀 CRITICAL FIX 1: Browser Audio Enablement - MOVED UP
const enableAudioForBrowser = useCallback(async () => {
  try {
    console.log('🎵 ULTRA: Attempting to enable browser audio...');
    
    // Use external audio context if available, otherwise create new one
    if (externalAudioContextRef?.current) {
      audioContextRef.current = externalAudioContextRef.current;
    } else if (!audioContextRef.current) {
      const AudioContext = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
      if (AudioContext) {
        audioContextRef.current = new AudioContext(AUDIO_CONTEXT_CONFIG);
      }
    }
    
    // Resume audio context if suspended (required for Chrome/Safari)
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current?.resume();
      console.log('🎵 ULTRA: Audio context resumed successfully');
    }
    
    // Test audio playback capability
    try {
      const testAudio = new Audio();
      testAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAAAQAAAREFUQQgAAAAA';
      await testAudio.play();
      testAudio.pause();
      console.log('🎵 ULTRA: Audio playback test successful');
    } catch (testError) {
      console.warn('⚠️ ULTRA: Audio playback test failed:', testError.message);
      // Continue anyway, might work for voice calls
    }
    
    setAudioEnabled(true);
    setUserInteracted(true);
    setShowAudioPrompt(false);
    
    return true;
  } catch (error) {
    console.error('❌ ULTRA: Audio enable failed:', error);
    setError('Failed to enable audio. Please allow audio access.');
    setTimeout(() => setError(null), 4000);
    return false;
  }
}, [externalAudioContextRef]);

  // =====================================
  // ENHANCED AUDIO FUNCTIONS
  // =====================================

  // 🚀 CRITICAL FIX 4: Enhanced Audio Playback with Maximum Browser Compatibility
  const playAudioResponse = useCallback(async (audioBase64) => {
    if (!audioBase64) {
      console.error('❌ ULTRA: No audio data provided');
      return;
    }

    try {
      // 🚀 OPTIMIZATION 1: Force enable audio without blocking checks
      if (!audioEnabled) {
        setAudioEnabled(true);
        setUserInteracted(true);
        setShowAudioPrompt(false);
      }

      // 🚀 OPTIMIZATION 2: Quick audio context resume
      if (audioContextRef.current?.state === 'suspended') {
        try {
          await audioContextRef.current?.resume();
        } catch (resumeError) {
          // Silent fail - continue anyway
        }
      }

      setIsSpeaking(true);
      const startTime = performance.now();

      // 🚀 OPTIMIZATION 3: Efficient base64 processing
      const base64Data = audioBase64.includes(',') ? audioBase64.split(',')[1] : audioBase64;
      
      // 🚀 OPTIMIZATION 4: Pre-optimized audio element
      const audio = new Audio();
      audio.preload = 'metadata'; // Changed from 'auto' for faster loading
      audio.volume = 1.0;
      
      const audioDataUrl = `data:audio/wav;base64,${base64Data}`;
      currentAudioRef.current = audio;
      
      // 🚀 OPTIMIZATION 5: Reduced timeout and streamlined playback
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Audio timeout'));
        }, 8000); // Reduced from 60s to 8s
        
        let resolved = false;
        
        const resolveOnce = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            const playTime = performance.now() - startTime;
            console.log(`✅ ULTRA: Audio played in ${playTime.toFixed(2)}ms`);
            resolve();
          }
        };
        
        // 🚀 OPTIMIZATION 6: Immediate playback on data load
        audio.onloadeddata = () => {
          console.log('🎵 ULTRA: Audio data loaded, playing immediately');
          const playPromise = audio.play();
          if (playPromise?.then) {
            playPromise.then(resolveOnce).catch((playError) => {
              if (!resolved) {
                resolved = true;
                clearTimeout(timeoutId);
                reject(playError);
              }
            });
          } else {
            resolveOnce();
          }
        };
        
        audio.onended = resolveOnce;
        audio.onerror = (e) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            reject(new Error(e.target?.error?.message || 'Audio error'));
          }
        };
        
        // 🚀 OPTIMIZATION 7: Direct source assignment
        audio.src = audioDataUrl;
      });
      
    } catch (error) {
      console.error('❌ ULTRA: Audio playback failed:', error);
      
      // 🚀 OPTIMIZATION 8: Faster error recovery
      if (error.message.includes('NotAllowedError')) {
        setError('Click to enable audio');
        setShowAudioPrompt(true);
      } else if (error.message.includes('timeout')) {
        setError('Audio timeout - retry');
      } else {
        setError('Audio failed');
      }
      
      setTimeout(() => setError(null), 2000); // Reduced from 4s to 2s
    } finally {
      setIsSpeaking(false);
      setAudioLevel(0);
      currentAudioRef.current = null;
    }
  }, [audioEnabled, userInteracted]);

  // 🚀 FIXED: TRUE STREAMING with proper chunk handling
const streamAudioFromBackend = useCallback(async (text) => {
  try {
    console.log('🎵 TRUE STREAMING: Starting for:', text.substring(0, 50));
    
    // Force enable audio if not already enabled
    if (!audioEnabled) {
      console.log('🚀 Force enabling audio for streaming');
      setAudioEnabled(true);
      setUserInteracted(true);
      setShowAudioPrompt(false);
    }
    
    // Ensure audio context is ready
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    // Start streaming audio immediately
    const streamResponse = await fetch('http://127.0.0.1:8000/stream-audio-raw', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        transcript: text,
        bot_id: selectedBotId || 'delhi_mentor_male',
        output_format: {
          container: "wav",
          encoding: "pcm_s16le", 
          sample_rate: 16000
        }
      })
    });
    
    if (!streamResponse.ok) {
      throw new Error(`Stream failed: ${streamResponse.status}`);
    }
    
    console.log('🎵 TRUE STREAMING: Response received, starting immediate playback...');
    setIsSpeaking(true);
    
    // 🚀 FIXED APPROACH: Collect ALL chunks then play (most reliable)
    const reader = streamResponse.body.getReader();
    const chunks = [];
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    // Combine all chunks into single audio blob
    const audioData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
      audioData.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Create audio blob and play immediately
    const audioBlob = new Blob([audioData], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audio.volume = 1.0;
    
    currentAudioRef.current = audio;
    
    // Play audio with proper error handling
    try {
      await audio.play();
      console.log('🎵 TRUE STREAMING: Audio playing successfully!');
    } catch (playError) {
      console.error('❌ TRUE STREAMING: Play failed:', playError);
      throw playError;
    }
    
    // Handle audio end
    audio.onended = () => {
      setIsSpeaking(false);
      setAudioLevel(0);
      URL.revokeObjectURL(audioUrl); // Clean up
      currentAudioRef.current = null;
      console.log('🎵 TRUE STREAMING: Audio completed');
    };
    
    audio.onerror = (error) => {
      console.error('❌ TRUE STREAMING: Audio error:', error);
      setIsSpeaking(false);
      URL.revokeObjectURL(audioUrl);
      currentAudioRef.current = null;
    };
    
  } catch (error) {
    console.error('❌ TRUE STREAMING: Failed:', error);
    setIsSpeaking(false);
    
    // Fallback to browser TTS
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      console.log('🎵 TRUE STREAMING: Using browser TTS fallback');
    }
  }
}, [selectedBotId, audioContextRef, audioEnabled, userInteracted]);

  // 🚀 ULTRA-OPTIMIZED: Single API call with intelligent audio handling + Request Deduplication
  const processWithBackend = useCallback(async (audioBlob) => {
    // 🚀 OPTIMIZATION 1: Prevent duplicate requests
    if (requestInProgress.current) {
      console.log('🚀 ULTRA: Request already in progress, skipping duplicate...');
      return;
    }
    
    requestInProgress.current = true;
    const startTime = performance.now();
    setIsProcessing(true);
    performanceMetrics.current.requestCount++;
    
    try {
      console.log(`🚀 ULTRA: processWithBackend called with blob size: ${audioBlob.size} bytes`);
      
      // 🚀 OPTIMIZATION 2: Single API Call to voice-call-ultra-fast (gets both text + audio)
      const formData = new FormData();
      formData.append('audio_file', audioBlob, `ultra_${Date.now()}.webm`);
      formData.append('bot_id', selectedBotId || 'delhi_mentor_male');
      formData.append('email', userDetails?.email || '');
      formData.append('platform', 'web_voice_ultra_v12_optimized');
      
      const response = await fetch('http://127.0.0.1:8000/voice-call-ultra-fast', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(20000), // Reduced timeout for faster failure detection
      });
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🎯 ULTRA: Complete response received in', (performance.now() - startTime).toFixed(2), 'ms');
      
      // Handle user message
      if (data.transcript) {
        onMessageReceived?.({
          text: data.transcript,
          sender: 'user',
          timestamp: new Date(),
          isVoiceMessage: true,
        });
      }
      
      // Handle bot response
      if (data.text_response) {
        onMessageReceived?.({
          text: data.text_response,
          sender: 'bot',
          timestamp: new Date(),
          bot_id: selectedBotId,
          isVoiceMessage: true,
        });
        
        // 🚀 OPTIMIZATION 3: Use audio from response OR fallback to streaming
        if (data.audio_base64 && data.audio_base64.length > 100) {
          // Use the audio returned by voice-call-ultra-fast (fastest path)
          console.log('🎯 ULTRA: Using backend audio response (fastest path)');
          performanceMetrics.current.cacheHits++; // Track cache usage
          await playAudioResponse(data.audio_base64);
        } else {
          // Fallback to streaming if no audio in response
          console.log('🔄 ULTRA: Fallback to streaming audio');
          await streamAudioFromBackend(data.text_response);
        }
      }
      
      const totalTime = performance.now() - startTime;
      
      // 🚀 OPTIMIZATION 4: Track performance metrics for backend cache optimization
      if (data.cached) {
        performanceMetrics.current.ultraFastTargetsMet++;
        console.log('✅ ULTRA: Backend TTS cache hit - ultra-fast response!');
      }
      
      if (data.performance) {
        performanceMetrics.current.backendPerformance = data.performance;
        if (data.performance.optimizations_applied) {
          performanceMetrics.current.backendOptimizations = data.performance.optimizations_applied;
        }
      }
      
      console.log(`✅ ULTRA: Total process completed in ${totalTime.toFixed(2)}ms`);
      
    } catch (error) {
      console.error('❌ ULTRA: Processing failed:', error);
      setError(`Processing failed: ${error.message}`);
      setTimeout(() => setError(null), 4000);
      performanceMetrics.current.errorCount++;
    } finally {
      // 🚀 OPTIMIZATION 5: Always clear request lock in finally block
      requestInProgress.current = false;
      setIsProcessing(false);
      setResponseStarted(false);
    }
  }, [selectedBotId, userDetails, onMessageReceived, playAudioResponse, streamAudioFromBackend]);

  // =====================================
  // ENHANCED MICROPHONE SETUP
  // =====================================


 

  // 🚀 CRITICAL FIX 2: Auto-enable audio on user interaction within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleUserInteraction = async (event) => {
      if (!userInteracted && isOpen) {
        console.log('🎵 ULTRA: User interaction detected, enabling audio...');
        const success = await enableAudioForBrowser();
        if (success) {
          // Remove listeners after successful audio enable
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        }
      }
    };

    // Add interaction listeners when modal is open
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isOpen, userInteracted, enableAudioForBrowser]);

  // 🚀 CRITICAL FIX 3: Enhanced Audio Context Initialization (No Blocking Checks)
  const initializeAudioContext = useCallback(async () => {
    try {
      // 🔧 REMOVED the audio enabled check that was blocking the call
      // Force audio enablement happens in startCall, so we proceed here

      // Use existing audio context or create new one
      if (!audioContextRef.current) {
        if (externalAudioContextRef?.current) {
          audioContextRef.current = externalAudioContextRef.current;
        } else {
          const AudioContext = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
          if (AudioContext) {
            audioContextRef.current = new AudioContext({
              ...AUDIO_CONTEXT_CONFIG,
              latencyHint: 'interactive',
              sampleRate: 16000
            });
          }
        }
      }
      
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current?.resume();
      }
      
      console.log('🎵 ULTRA: Audio context initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ ULTRA: Audio context initialization failed:', error);
      console.warn('⚠️ ULTRA: Continuing without audio context...');
      // Don't fail the call - continue without audio context
      return true;
    }
  }, [externalAudioContextRef]);



  // 🚀 CRITICAL FIX 5: Enhanced Microphone Setup (No Blocking Checks)
  const setupMicrophone = useCallback(async () => {
    try {
      // 🔧 REMOVED the audio enabled check that was blocking the call
      // Force audio enablement happens in startCall, so we proceed here

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Request microphone with enhanced error handling
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('getUserMedia not supported in this browser');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1,
          sampleRate: 16000,
          latency: 0,
          volume: 1.0
        }
      });

      streamRef.current = stream;

      // Enhanced MediaRecorder setup
      if (typeof MediaRecorder === 'undefined') {
        throw new Error('MediaRecorder not supported in this browser');
      }
      
      const options = { 
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000
      };
      
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'audio/wav';
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      // Enhanced audio analysis setup
      if (audioContextRef.current) {
        try {
          const source = audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          analyserRef.current.smoothingTimeConstant = 0.1;
          source.connect(analyserRef.current);
        } catch (analysisError) {
          console.warn('⚠️ ULTRA: Audio analysis setup failed:', analysisError);
          // Continue without audio analysis
        }
      }

      // Enhanced data handling
      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log('🎤 ULTRA: ondataavailable fired, data size:', event.data.size);
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('🎤 ULTRA: Audio chunk added, total chunks:', audioChunksRef.current.length);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log('🎤 ULTRA: onstop fired, total chunks:', audioChunksRef.current.length);
        
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          console.log('🎤 ULTRA: Created audio blob, size:', audioBlob.size, 'bytes');
          audioChunksRef.current = [];
          
          if (processAudioRef.current && audioBlob.size > 1000) {
            console.log('🚀 ULTRA: Calling processAudioRef.current with blob');
            await processAudioRef.current(audioBlob);
          } else {
            console.error('❌ ULTRA: processAudioRef is null or blob too small:', {
              processAudioRef: !!processAudioRef.current,
              blobSize: audioBlob.size
            });
          }
        } else {
          console.warn('⚠️ ULTRA: No audio chunks available in onstop');
        }
        
        // Auto-restart for continuous listening
        if (isCallActive && !isMuted && mediaRecorderRef.current?.state === 'inactive') {
          setTimeout(() => {
            if (mediaRecorderRef.current?.state === 'inactive') {
              try {
                console.log('🔄 ULTRA: Auto-restarting MediaRecorder');
                mediaRecorderRef.current.start();
              } catch (restartError) {
                console.warn('⚠️ ULTRA: Failed to restart recording:', restartError);
              }
            }
          }, 50);
        }
      };
      
      // Add onstart and onerror handlers for complete debugging
      mediaRecorderRef.current.onstart = () => {
        console.log('🎤 ULTRA: MediaRecorder started successfully');
      };

      mediaRecorderRef.current.onerror = (error) => {
        console.error('❌ ULTRA: MediaRecorder error:', error);
      };
      
      return true;
    } catch (error) {
      console.error('❌ ULTRA: Microphone setup failed:', error);
      let errorMessage = 'Microphone setup failed';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Microphone is busy. Please close other applications using the microphone.';
      }
      
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
      return false;
    }
  }, [isCallActive, isMuted]);

  // =====================================
  // ENHANCED VOICE ACTIVITY DETECTION
  // =====================================

  // 🚀 CRITICAL FIX 7: Enhanced Voice Activity Detection with Improved Logic
  const startVoiceActivityDetection = useCallback(() => {
    console.log('🎤 ULTRA: Starting enhanced voice activity detection');
    console.log('🎤 ULTRA: mediaRecorderRef.current:', !!mediaRecorderRef.current);
    console.log('🎤 ULTRA: analyserRef.current:', !!analyserRef.current);

    if (!mediaRecorderRef.current) {
      console.error('❌ ULTRA: Cannot start voice activity detection - no MediaRecorder');
      return;
    }

    const checkVoiceActivity = () => {
      if (!isCallActive) {
        return;
      }
      
      if (analyserRef.current) {
        try {
          analyserRef.current.getByteFrequencyData(REUSABLE_FREQUENCY_BUFFER);
          
          let sum = 0;
          for (let i = VOICE_START; i < VOICE_END; i++) {
            sum += REUSABLE_FREQUENCY_BUFFER[i];
          }
          
          const average = sum / (VOICE_END - VOICE_START);
          const normalizedLevel = Math.min(average / 128, 1);
          
          // 🚀 OPTIMIZED: Dramatically reduced logging frequency for better performance
          if (Math.random() < 0.001) { // Log only 0.1% of the time (once every ~17 seconds instead of 2.5 times per second)
            console.log('🎤 Audio Level:', normalizedLevel.toFixed(4), 'Threshold:', VOICE_THRESHOLD, 'Speaking:', isSpeaking, 'Muted:', isMuted);
          }
          
          // Enhanced voice activity logic
          if (normalizedLevel > VOICE_THRESHOLD && !isSpeaking && !isMuted) {
            if (!voiceActivityRef.current.isDetected) {
              voiceActivityRef.current.isDetected = true;
              console.log('🎤 ULTRA: Voice activity detected - Starting recording');
              console.log('🎤 ULTRA: MediaRecorder state:', mediaRecorderRef.current?.state);
              
              if (!voiceActivityRef.current.isRecording && mediaRecorderRef.current?.state === 'inactive') {
                try {
                  console.log('🎤 ULTRA: Calling mediaRecorder.start()');
                  mediaRecorderRef.current.start();
                  voiceActivityRef.current.isRecording = true;
                  console.log('🎤 ULTRA: Recording started successfully');
                } catch (startError) {
                  console.error('❌ ULTRA: Failed to start recording:', startError);
                }
              }
            }
            
            // Clear silence timer
            if (voiceActivityRef.current.silenceTimer) {
              clearTimeout(voiceActivityRef.current.silenceTimer);
              voiceActivityRef.current.silenceTimer = null;
            }
          } else if (voiceActivityRef.current.isDetected && normalizedLevel <= VOICE_THRESHOLD && !isSpeaking) {
            if (!voiceActivityRef.current.silenceTimer) {
              console.log('🤫 ULTRA: Starting silence timer...');
              voiceActivityRef.current.silenceTimer = setTimeout(() => {
                console.log('🤫 ULTRA: Silence detected, stopping recording and processing audio');
                voiceActivityRef.current.isDetected = false;
                
                if (voiceActivityRef.current.isRecording && mediaRecorderRef.current?.state === 'recording') {
                  try {
                    console.log('🎤 ULTRA: Calling mediaRecorder.stop()');
                    mediaRecorderRef.current.stop();
                    voiceActivityRef.current.isRecording = false;
                    console.log('🎤 ULTRA: Recording stopped successfully');
                  } catch (stopError) {
                    console.error('❌ ULTRA: Failed to stop recording:', stopError);
                  }
                }
                
                voiceActivityRef.current.silenceTimer = null;
              }, SILENCE_DURATION);
            }
          }
          
          // Enhanced visual feedback with smoothing
          setAudioLevel(prevLevel => {
            const smoothingFactor = normalizedLevel > prevLevel ? 0.05 : 0.7;
            return prevLevel * smoothingFactor + normalizedLevel * (1 - smoothingFactor);
          });
        } catch (analyserError) {
          console.error('❌ ULTRA: Analyser error:', analyserError);
          console.log('🎤 FALLBACK: Using manual trigger mode');
          setAudioLevel(0.1);
          
          // 🚀 FALLBACK: Manual trigger every 10 seconds when analyser fails
          if (!voiceActivityRef.current.isRecording && mediaRecorderRef.current?.state === 'inactive' && !isSpeaking && !isMuted) {
            const now = Date.now();
            if (!voiceActivityRef.current.lastAutoTrigger || (now - voiceActivityRef.current.lastAutoTrigger) > 10000) {
              console.log('🎤 FALLBACK: Auto-triggering recording (analyser failed)');
              voiceActivityRef.current.lastAutoTrigger = now;
              
              try {
                mediaRecorderRef.current.start();
                voiceActivityRef.current.isRecording = true;
                console.log('🎤 FALLBACK: Recording started successfully');
                
                // Auto-stop after 3 seconds
                setTimeout(() => {
                  if (voiceActivityRef.current.isRecording && mediaRecorderRef.current?.state === 'recording') {
                    console.log('🎤 FALLBACK: Auto-stopping recording');
                    mediaRecorderRef.current.stop();
                    voiceActivityRef.current.isRecording = false;
                  }
                }, 3000);
              } catch (error) {
                console.error('❌ FALLBACK: Recording failed:', error);
              }
            }
          }
        }
      } else {
        console.log('🎤 No analyser available - using fallback');
        setAudioLevel(0.1);
      }
    };
    
    console.log('🎤 ULTRA: Setting up voice activity detection interval');
    const interval = setInterval(checkVoiceActivity, CHECK_INTERVAL);
    silenceDetectionIntervalRef.current = interval;
    
    console.log('🎤 ULTRA: Voice activity detection started with interval:', interval);
  }, []); // 🚀 FIXED: Empty dependencies to prevent closure issues

  // 🚀 CRITICAL FIX 6: Enhanced Call Starter with Forced Audio Enablement
  const startCall = useCallback(async () => {
    console.log('🚀 ULTRA: Starting ultra-optimized voice call with forced audio enablement');
    
    // Force audio enablement immediately when call starts
    if (!audioEnabled) {
      console.log('🚀 ULTRA: Force enabling audio for voice call');
      setAudioEnabled(true);
      setShowAudioPrompt(false);
    }
    
    const audioSuccess = await initializeAudioContext();
    if (!audioSuccess) {
      setError('Failed to initialize audio system');
      return;
    }
    
    const micSuccess = await setupMicrophone();
    if (!micSuccess) {
      setError('Failed to setup microphone');
      return;
    }
    
    setIsCallActive(true);
    setIsListening(true);
    startVoiceActivityDetection();
    
    console.log('✅ ULTRA: Voice call started successfully with forced audio enablement');
  }, [audioEnabled, initializeAudioContext, setupMicrophone, startVoiceActivityDetection]); // ✅ Added missing dependencies



  // 🚀 CRITICAL FIX 8: Enhanced Call End with Cleanup
  const endCall = useCallback(() => {
    console.log('🚀 ULTRA: Ending voice call with complete cleanup');
    
    try {
      // Stop all audio processing
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      
      // Stop voice activity detection
      if (silenceDetectionIntervalRef.current) {
        clearInterval(silenceDetectionIntervalRef.current);
        silenceDetectionIntervalRef.current = null;
      }
      
      // Stop recording
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      
      // Clean up voice activity state
      if (voiceActivityRef.current.silenceTimer) {
        clearTimeout(voiceActivityRef.current.silenceTimer);
        voiceActivityRef.current.silenceTimer = null;
      }
      voiceActivityRef.current.isDetected = false;
      voiceActivityRef.current.isRecording = false;
      
      // Close media stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('🎤 ULTRA: Stopped media track:', track.kind);
        });
        streamRef.current = null;
      }
      
      // Reset component states
      setIsCallActive(false);
      setIsListening(false);
      setIsSpeaking(false);
      setIsProcessing(false);
      setAudioLevel(0);
      setError(null);
      setResponseStarted(false);
      
      // Call external close handler
      onClose?.();
      
      console.log('✅ ULTRA: Voice call ended successfully with complete cleanup');
    } catch (error) {
      console.error('❌ ULTRA: Error ending call:', error);
      // Force close anyway
      onClose?.();
    }
  }, [onClose]);

  // =====================================
  // EFFECTS
  // =====================================

  // Auto-start call
  useEffect(() => {
    if (isOpen && !isCallActive) {
      startCall();
    }
  }, [isOpen, isCallActive, startCall]);

  // 🚀 CRITICAL FIX 9: Set processAudioRef for Backend Processing
  useEffect(() => {
    processAudioRef.current = processWithBackend;
  }, [processWithBackend, streamAudioFromBackend]); // ✅ Ensure streamAudioFromBackend is included

  // Enhanced connection optimization
  useEffect(() => {
    if (isOpen) {
      // Preconnect to backend
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'http://127.0.0.1:8000';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Prefetch critical endpoint
      fetch('http://127.0.0.1:8000/voice-call-ultra-fast', { 
        method: 'OPTIONS'
      }).catch(() => {});
      
      return () => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      };
    }
  }, [isOpen]);

  // Performance monitoring
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      const metrics = performanceMetrics.current;
      
      if (metrics.requestCount > 0) {
        const avgTime = metrics.totalResponseTime / metrics.requestCount;
        const ultraFastRate = (metrics.ultraFastTargetsMet / metrics.requestCount * 100).toFixed(1);
        const cacheHitRate = (metrics.cacheHits / metrics.requestCount * 100).toFixed(1);
        
        console.log('🚀 ULTRA PERFORMANCE DASHBOARD:');
        console.log(`📊 Requests: ${metrics.requestCount}`);
        console.log(`⚡ Ultra-Fast Rate: ${ultraFastRate}%`);
        console.log(`🎯 Cache Hit Rate: ${cacheHitRate}%`);
        console.log(`🌐 Avg Network Latency: ${metrics.networkLatency.toFixed(2)}ms`);
        console.log(`🎵 Avg Audio Processing: ${metrics.audioProcessingTime.toFixed(2)}ms`);
        console.log(`🔗 Connection Quality: ${connectionQuality}`);
        
        // 🚀 FASTAPI INTEGRATION 3: Enhanced performance tracking display
        if (metrics.backendOptimizations && metrics.backendOptimizations.length > 0) {
          console.log(`🔧 FastAPI Optimizations: ${metrics.backendOptimizations.join(', ')}`);
        }
        if (metrics.optimizationsSaved > 0) {
          console.log(`💡 Optimizations Saved: ${metrics.optimizationsSaved}`);
        }
      }
    }, 20000); // Every 20 seconds
    
    return () => clearInterval(interval);
  }, [isOpen, connectionQuality]);

  // =====================================
  // RENDER
  // =====================================

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: '#f8fafc' }}
      >
        {/* Enhanced header with connection quality */}
        <motion.div
          className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <h1 className="text-gray-700 text-base font-semibold tracking-wide">
              {botName}
            </h1>
            <div className="flex items-center justify-center mt-1 space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionQuality === 'excellent' ? 'bg-green-400' :
                connectionQuality === 'good' ? 'bg-yellow-400' :
                connectionQuality === 'fair' ? 'bg-orange-400' : 'bg-red-400'
              }`} />
              <span className="text-xs text-gray-500 capitalize">
                {connectionQuality} connection
              </span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced processing indicator */}
        <AnimatePresence>
          {(isProcessing || responseStarted) && (
            <motion.div
              className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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

        {/* Main enhanced visualization */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <EnhancedChatGPTCircle
              audioLevel={audioLevel}
              isListening={isListening && !isSpeaking}
              isSpeaking={isSpeaking}
              isProcessing={isProcessing}
            />
          </motion.div>
        </div>

        {/* Enhanced bottom controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Enhanced microphone button */}
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

            {/* Enhanced close button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center transition-all duration-200 shadow-lg"
            >
              <X className="w-7 h-7" />
            </motion.button>

            {/* 🧪 TEST: Manual recording trigger button */}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={async () => {
    console.log('🧪 MANUAL: Force starting 3-second recording...');
    if (mediaRecorderRef.current?.state === 'inactive') {
      try {
        mediaRecorderRef.current.start();
        console.log('🧪 MANUAL: Recording started');
        setTimeout(() => {
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
            console.log('🧪 MANUAL: Recording stopped');
          }
        }, 3000);
      } catch (error) {
        console.error('🧪 MANUAL: Recording failed:', error);
      }
    } else {
      console.log('🧪 MANUAL: MediaRecorder not inactive:', mediaRecorderRef.current?.state);
    }
  }}
  className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-all duration-200 shadow-lg"
  title="Manual 3s Recording"
>
  🎤
</motion.button>
          </motion.div>
        </div>

        {/* Enhanced status indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Audio level indicator */}
            <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-colors duration-200 ${
                  isSpeaking ? 'bg-green-500' :
                  isProcessing ? 'bg-yellow-500' :
                  isListening ? 'bg-blue-500' : 'bg-gray-400'
                }`}
                style={{
                  width: `${Math.min(audioLevel * 100, 100)}%`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Performance indicator */}
            <div className="text-xs text-gray-500">
              {performanceMetrics.current.requestCount > 0 && (
                <span>
                  {((performanceMetrics.current.ultraFastTargetsMet / performanceMetrics.current.requestCount) * 100).toFixed(0)}% ultra-fast
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced error message */}
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

        {/* Audio prompt for user interaction */}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceCallUltra;
//Likhith Lalith