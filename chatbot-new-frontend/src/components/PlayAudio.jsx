import React, { useState,useEffect, useRef } from 'react';
import { IconLoader, IconPlayerPlayFilled } from '@tabler/icons-react';

const PlayAudio = ({ text,bot_id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState(null);

  const [voice_id, setVoiceId] = useState(null);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);

//  map voice id to bot id
  /*
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
  */

  const handlePlay = async () => {
    console.log('Play button clicked', { text, bot_id });
    try {
      // Pause and reset if already playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setIsLoading(true);
      // Always fetch new audio for each click
      const response = await fetch('http://127.0.0.1:8000/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: text, bot_id: bot_id }),
      });
      if (!response.ok) throw new Error('Failed to generate audio');
      const data = await response.json();
      const { audio_base64 } = data;
      const audioSrc = `data:audio/wav;base64,${audio_base64}`;
      setAudioUrl(audioSrc);
      setIsLoading(false);
      // Play the audio after the src is set
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = audioSrc;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } catch (error) {
      console.error('Error handling audio:', error);
      setIsLoading(false);
    }
  };

  // Handle audio end
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Cleanup function when component unmounts
  React.useEffect(() => {
    return () => {
      if (audioUrl) {
        setIsPlaying(false);
        setAudioUrl(null);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <span>
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
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleEnded}
          style={{ display: 'none' }}
          onError={() => { console.error('Audio playback error'); }}
          onLoadedData={() => { console.log('Audio loaded and ready to play'); }}
        />
      )}
    </span>
  );
};

export default PlayAudio;