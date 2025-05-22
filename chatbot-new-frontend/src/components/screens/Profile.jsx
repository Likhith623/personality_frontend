"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/support/UserContext';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useBot } from '@/support/BotContext';
import {supabase} from '../../../supabaseClient'
import { IconLoader, IconExclamationCircle, IconProgressCheck } from '@tabler/icons-react';

function Profile() {
  const router = useRouter();
  const { userDetails } = useUser();
  const[session , setSession] = useState(); 
  const { selectedBotId } = useBot();
  const [text, setText] = useState("")
  const [status, setStatus] = useState("")

  

  const handleLogout = async () => {
    localStorage.removeItem('userDetails');
    await supabase.auth.signOut();
    setSession(null);
    window.location.reload();
    router.push("/signup");
  };

  return (
    <div suppressHydrationWarning className='bg-white/20 p-8 rounded-lg shadow-md'>
      <div className='flex flex-col items-center p-3 gap-4'>
        <div className='text-center'>
          <p className='font-semibold'>{userDetails.name}</p>
          <p className='text-xs'>{userDetails.email}</p>
        </div>
      </div>
      <p className='text-center text-sm underline cursor-pointer mt-2' onClick={handleLogout}>
        Log out
      </p>
    </div>
  );
}

export default Profile;