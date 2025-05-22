
import React, { useState,useEffect } from 'react';
import { IconLoader, IconPlayerPlayFilled } from '@tabler/icons-react';

const PlayAudio = ({ text,bot_id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState(null);

 const [voice_id, setVoiceId] = useState(null);

//  map voice id to bot id
  const voiceIdMap = {
    'delhi_mentor_male': 'arvind',
    'delhi_mentor_female': 'meera',
    'delhi_friend_male': 'amol',
    'delhi_friend_female': 'pavithra',
    'delhi_romantic_male': 'neel',
    'delhi_romantic_female': 'maitreyi',
  };

  useEffect(() => {
    setVoiceId(voiceIdMap[bot_id]);
  }, [bot_id]);

  const handlePlay = async () => {
    try {
      // If audio hasn't been fetched yet, get it from API
      if (!audio) {
        setIsLoading(true);
        const response = await fetch('https://novi.aigurukul.dev/v2/generate-audio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text, speaker: voice_id }),
        });

        const audioData = await response.arrayBuffer();
        const blob = new Blob([audioData], { type: 'audio/wav' });
        const newAudio = new Audio(URL.createObjectURL(blob));
        
        // Handle audio end
        newAudio.addEventListener('ended', () => {
          setIsPlaying(false);
        });

        setAudio(newAudio);
        setIsLoading(false);
        
        // Play the audio
        await newAudio.play();
        setIsPlaying(true);
      } else {
        // If audio exists, toggle play/pause
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error handling audio:', error);
      setIsLoading(false);
    }
  };

  // Cleanup function when component unmounts
  React.useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
    };
  }, [audio]);

  return (
    <button 
      onClick={handlePlay}
      className="focus:outline-none"
      disabled={isLoading}
    >
      {isLoading ? (
        <IconLoader 
          size={22} 
          className="text-purple-400/100 mt-[-2px] animate-spin"
        />
      ) : isPlaying ? (
        <IconPlayerPlayFilled 
          size={22} 
          className="text-purple-400/100 mt-[-2px] cursor-pointer hover:scale-125 transition-transform"
        />
      ) : (
        <IconPlayerPlayFilled 
          size={22} 
          className="text-purple-400/100 mt-[-2px] cursor-pointer hover:scale-125 transition-transform"
        />
      )}
    </button>
  );
};

export default PlayAudio;