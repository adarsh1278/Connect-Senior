'use client'
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface PlayerAnimationProps {
  link: string; // Assuming link is a string
}

const PlayerAnimation: React.FC<PlayerAnimationProps> = ({ link }) => {
  return (
    <Player
      autoplay
      controls
      loop
      mode="normal"
      src={link}
    />
  );
}

export default PlayerAnimation;
