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
  Play
} from "lucide-react";
import { useBot } from '@/support/BotContext';
import { useUser } from '@/support/UserContext';

// Import avatar images
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
                ? 'bg-gradient-to-t from-purple-500 via-purple-400 to-pink-400 shadow-purple-500/20' 
                : isActive 
                  ? 'bg-gradient-to-t from-emerald-500 via-green-400 to-teal-400 shadow-green-500/20' 
                  : isListening 
                    ? 'bg-gradient-to-t from-blue-500 via-cyan-400 to-sky-400 shadow-blue-500/20'
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
          className="relative bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.8, y: 30, opacity: 0 }}
          animate={{ 
            scale: 1, 
            y: 0, 
            opacity: 1,
            boxShadow: isBotSpeaking 
              ? "0 0 100px rgba(168, 85, 247, 0.4), 0 0 50px rgba(236, 72, 153, 0.3)" 
              : isRecording 
                ? "0 0 100px rgba(34, 197, 94, 0.4), 0 0 50px rgba(59, 130, 246, 0.3)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          exit={{ scale: 0.8, y: 30, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom ease curve instead of easeOutBack
            boxShadow: { duration: 0.6 }
          }}
        >
          {/* Enhanced Dynamic Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {/* Animated Gradient Orbs with State-Aware Colors */}
            <motion.div
              className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full filter blur-xl ${
                isBotSpeaking 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
                  : isRecording
                    ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30'
                    : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'
              }`}
              animate={{
                scale: isBotSpeaking ? [1, 1.4, 1] : isRecording ? [1, 1.3, 1] : [1, 1.1, 1],
                rotate: [0, 180, 360],
                x: isBotSpeaking ? [0, 10, 0] : [0, 5, 0],
                y: isBotSpeaking ? [0, -10, 0] : [0, -5, 0],
              }}
              transition={{
                duration: isBotSpeaking ? 3 : isRecording ? 4 : 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full filter blur-xl ${
                isBotSpeaking 
                  ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30' 
                  : isRecording
                    ? 'bg-gradient-to-r from-blue-500/30 to-teal-500/30'
                    : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
              }`}
              animate={{
                scale: isBotSpeaking ? [1.2, 1, 1.2] : isRecording ? [1.1, 1, 1.1] : [1, 1.1, 1],
                rotate: [360, 180, 0],
                x: isBotSpeaking ? [0, -10, 0] : [0, -5, 0],
                y: isBotSpeaking ? [0, 10, 0] : [0, 5, 0],
              }}
              transition={{
                duration: isBotSpeaking ? 2.5 : isRecording ? 3.5 : 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Additional floating particles for bot speaking state */}
            {isBotSpeaking && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 8}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      y: [0, -20, -40],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}
          </div>
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
          
          {/* Content Container */}
          <div className="relative z-10 text-center">
            {/* Avatar Section with Enhanced Animations */}
            <div className="relative mb-6">
              {/* Enhanced Pulse Rings with Dynamic Colors */}
              <AnimatePresence>
                {(isRecording || isBotSpeaking) && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full border-2 ${
                          isBotSpeaking 
                            ? 'border-purple-400/70 bg-purple-400/10' 
                            : 'border-green-400/70 bg-green-400/10'
                        }`}
                        style={{
                          width: '7rem',
                          height: '7rem',
                          left: '50%',
                          top: '50%',
                          marginLeft: '-3.5rem',
                          marginTop: '-3.5rem',
                        }}
                        initial={{ scale: 1, opacity: 0.9 }}
                        animate={{ 
                          scale: [1, 1.4 + i * 0.2, 2.2 + i * 0.3],
                          opacity: [0.9, 0.5, 0],
                          rotate: isBotSpeaking ? [0, 180, 360] : [0, 90, 180]
                        }}
                        transition={{
                          duration: isBotSpeaking ? 2.5 : 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                        exit={{ opacity: 0, scale: 2 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Main Avatar Container with Enhanced Effects */}
              <motion.div 
                className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 shadow-2xl bg-gradient-to-br from-purple-200 to-pink-100"
                style={{
                  borderColor: isBotSpeaking 
                    ? '#a855f7' 
                    : isRecording 
                      ? '#22c55e' 
                      : 'rgba(255,255,255,0.4)'
                }}
                animate={{
                  scale: isBotSpeaking ? [1, 1.15, 1] : isRecording ? [1, 1.08, 1] : 1,
                  rotate: isBotSpeaking ? [0, 5, -5, 0] : 0,
                  y: isBotSpeaking ? [0, -3, 0] : 0,
                  borderWidth: isBotSpeaking ? [4, 6, 4] : isRecording ? [4, 5, 4] : 4,
                }}
                transition={{
                  duration: isBotSpeaking ? 1.2 : 0.6,
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
                    console.log('🎭 Avatar load error, falling back to default');
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                  onLoad={() => {
                    console.log('🎭 Avatar loaded successfully:', avatarSrc);
                  }}
                />
                
                {/* Enhanced Bot Speaking Overlays */}
                {isBotSpeaking && (
                  <>
                    {/* Primary animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full"
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-1 rounded-full"
                      style={{
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                        backgroundSize: '200% 200%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Pulsing border */}
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2 border-purple-400/60"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}
                
                {/* Recording overlay */}
                {isRecording && !isBotSpeaking && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-full"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
              
              {/* Connection Status Indicator - Enhanced */}
              <motion.div 
                className="absolute -bottom-1 -right-1 z-20"
                animate={{
                  scale: connectionStatus === 'connecting' ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: connectionStatus === 'connecting' ? Infinity : 0
                }}
              >
                <div className={`w-6 h-6 rounded-full border-3 border-white shadow-lg ${
                  connectionStatus === 'connected' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  connectionStatus === 'connecting' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-red-400 to-pink-500'
                }`} />
              </motion.div>
            </div>
          
            {/* Enhanced Title Section */}
            <motion.div
              className="mb-6"
              animate={{
                scale: isBotSpeaking ? [1, 1.02, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: isBotSpeaking ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {isCallActive ? '🎙️ Voice Call Active' : '💫 Voice Call'}
              </h3>
              
              {isCallActive && (
                <motion.p 
                  className="text-purple-200 text-sm font-mono bg-white/10 rounded-full px-4 py-1 inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ⏱️ Duration: {formatDuration(callDuration)}
                </motion.p>
              )}
            </motion.div>
            
            {/* Enhanced Status Display */}
            <motion.div 
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30 mb-6 shadow-lg"
              animate={{
                borderColor: isBotSpeaking ? ['rgba(255,255,255,0.3)', 'rgba(168,85,247,0.5)', 'rgba(255,255,255,0.3)'] : 'rgba(255,255,255,0.3)'
              }}
              transition={{
                duration: 2,
                repeat: isBotSpeaking ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <motion.p 
                className="text-white font-medium text-base mb-2"
                animate={{
                  color: isBotSpeaking ? ['#ffffff', '#c084fc', '#ffffff'] : '#ffffff'
                }}
                transition={{
                  duration: 1.5,
                  repeat: isBotSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {connectionStatus === 'connecting' ? '🔗 Connecting...' :
                 connectionStatus === 'connected' && !isCallActive ? '✅ Ready to start' :
                 isBotSpeaking ? '🤖 Bot is speaking...' :
                 isProcessing ? '🔄 Processing voice...' :
                 isRecording ? '👂 Listening...' :
                 isCallActive ? '🎯 Hold to speak' :
                 '🚀 Tap call to start'}
              </motion.p>
              
              <p className="text-white/80 text-sm leading-relaxed">
                {connectionStatus === 'connecting' ? '🎤 Setting up microphone access...' :
                 connectionStatus === 'connected' && !isCallActive ? '🎉 Connection established! Ready for conversation.' :
                 isBotSpeaking ? '👨‍💻 Your AI companion is responding with thoughtful insights...' :
                 isProcessing ? '🧠 Analyzing your voice and preparing an intelligent response...' :
                 isRecording ? '💭 I can hear you clearly, please continue speaking...' :
                 isCallActive ? '💡 Press and hold the blue button to speak your mind' :
                 '🌟 Start a voice call with your AI companion for natural conversation'}
              </p>
            </motion.div>
            
            {/* Enhanced Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-400/40 rounded-2xl p-4 mb-6 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-200 text-sm font-medium">
                    ⚠️ {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Enhanced Voice Visualizer */}
          {isCallActive && (
            <motion.div 
              className="flex justify-center my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl w-4/5">
                <VoiceVisualizer 
                  isActive={isRecording}
                  isListening={connectionStatus === 'connected'}
                  isBotSpeaking={isBotSpeaking}
                  audioLevel={audioLevelRef.current}
                />
              </div>
            </motion.div>
          )}
          
          {/* Enhanced Control Buttons */}
          <div className="flex flex-col space-y-6 relative z-10">
            
            {/* Push to Talk Button - Enhanced with better animations */}
            {isCallActive && (
              <motion.div 
                className="flex justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: isBotSpeaking ? 1 : 1.05 }}
                    whileTap={{ scale: isBotSpeaking ? 1 : 0.95 }}
                    onMouseDown={(e) => {
                      console.log('🖱️ Mouse down event triggered');
                      if (!isBotSpeaking) startRecording();
                    }}
                    onMouseUp={(e) => {
                      console.log('🖱️ Mouse up event triggered');
                      if (!isBotSpeaking) stopRecording();
                    }}
                    onTouchStart={(e) => {
                      console.log('👆 Touch start event triggered');
                      if (!isBotSpeaking) startRecording();
                    }}
                    onTouchEnd={(e) => {
                      console.log('👆 Touch end event triggered');
                      if (!isBotSpeaking) stopRecording();
                    }}
                    disabled={isProcessing || isBotSpeaking}
                    className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl border-4 transition-all relative overflow-hidden ${
                      isBotSpeaking
                        ? 'bg-gradient-to-br from-purple-500/60 to-pink-500/60 border-purple-300/50 cursor-not-allowed'
                        : isRecording 
                          ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-300 shadow-red-500/30' 
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-300 shadow-blue-500/30'
                    } ${isProcessing || isBotSpeaking ? 'opacity-75' : ''}`}
                    animate={{
                      boxShadow: isRecording 
                        ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 20px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0.4)']
                        : isBotSpeaking
                          ? ['0 0 0 0 rgba(168, 85, 247, 0.4)', '0 0 0 20px rgba(168, 85, 247, 0)', '0 0 0 0 rgba(168, 85, 247, 0.4)']
                          : '0 8px 32px rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{
                      duration: isRecording || isBotSpeaking ? 1.5 : 0.3,
                      repeat: isRecording || isBotSpeaking ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Animated background for bot speaking */}
                    {isBotSpeaking && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full"
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                    
                    <div className={`flex items-center justify-center z-10 ${isRecording ? 'animate-pulse' : ''}`}>
                      {isProcessing ? (
                        <Loader2 className="w-16 h-16 text-white animate-spin" />
                      ) : isBotSpeaking ? (
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Volume2 className="w-16 h-16 text-white" />
                        </motion.div>
                      ) : isRecording ? (
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <MicOff className="w-16 h-16 text-white" />
                        </motion.div>
                      ) : (
                        <Mic className="w-16 h-16 text-white" />
                      )}
                    </div>
                  </motion.button>
                  
                  <motion.span 
                    className="text-white/80 text-base font-semibold mt-3 bg-white/10 rounded-full px-4 py-1"
                    animate={{
                      color: isBotSpeaking ? ['#ffffff', '#c084fc', '#ffffff'] : '#ffffff'
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isBotSpeaking ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {isBotSpeaking ? '🤖 Bot Speaking' : isRecording ? '🔴 Release to Send' : '🎤 Hold to Speak'}
                  </motion.span>
                </div>
              </motion.div>
            )}
            
            {/* Enhanced Secondary Controls */}
            {isCallActive && (
              <motion.div 
                className="flex justify-center space-x-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Mute Toggle */}
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                      isMuted 
                        ? 'bg-gradient-to-br from-red-500/30 to-red-600/30 border-red-300/40 text-red-300' 
                        : 'bg-white/20 border-white/30 text-white shadow-white/10 hover:bg-white/30'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </motion.button>
                  <span className="text-white/70 text-sm mt-2 font-medium">
                    {isMuted ? 'Unmute' : 'Mute'}
                  </span>
                </div>
                
                {/* Speaker Toggle */}
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                      !isSpeakerOn 
                        ? 'bg-gradient-to-br from-red-500/30 to-red-600/30 border-red-300/40 text-red-300' 
                        : 'bg-white/20 border-white/30 text-white shadow-white/10 hover:bg-white/30'
                    }`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-8 h-8" /> : <VolumeX className="w-8 h-8" />}
                  </motion.button>
                  <span className="text-white/70 text-sm mt-2 font-medium">
                    {isSpeakerOn ? 'Speaker' : 'Muted'}
                  </span>
                </div>
              </motion.div>
            )}
            
            {/* Enhanced Call Control Button */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isCallActive ? endCall : startCall}
                disabled={connectionStatus === 'connecting'}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 transition-all relative overflow-hidden ${
                  isCallActive 
                    ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-300 shadow-red-500/40' 
                    : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-300 shadow-green-500/40'
                } ${connectionStatus === 'connecting' ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {connectionStatus === 'connecting' ? (
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                ) : isCallActive ? (
                  <PhoneOff className="w-10 h-10 text-white" />
                ) : (
                  <Phone className="w-10 h-10 text-white" />
                )}
              </motion.button>
              
              <motion.span 
                className="text-white/80 text-base font-semibold mt-3 bg-white/10 rounded-full px-6 py-2"
                animate={{
                  scale: connectionStatus === 'connecting' ? [1, 1.05, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: connectionStatus === 'connecting' ? Infinity : 0
                }}
              >
                {connectionStatus === 'connecting' ? '🔄 Connecting...' : isCallActive ? '📞 End Call' : '🚀 Start Call'}
              </motion.span>
            </motion.div>
            
            {/* Enhanced Instructions */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-inner">
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  {!isCallActive 
                    ? "🌟 Start a voice call to have natural, flowing conversations with your AI companion"
                    : "💡 Hold the blue microphone button to speak, then release to send your message"
                  }
                </p>
              </div>
            </motion.div>
            
            {/* Close Button - Enhanced for non-active calls */}
            {!isCallActive && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full py-4 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl text-white transition-all text-base font-semibold shadow-lg backdrop-blur-sm"
              >
                ✕ Close Voice Call
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceCall;
