import React, { useEffect, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';

const AudioWaveForm = ({ audioUrl }) => {
  const containerRef = useRef(null);
  const [waveColor, setWaveColor] = useState('');
  const [progressColor, setProgressColor] = useState('');

  useEffect(() => {
    const computedStyle = getComputedStyle(document.documentElement);
    setWaveColor(computedStyle.getPropertyValue('--primary-color'));
    setProgressColor(computedStyle.getPropertyValue('--primary-color'));
  }, []);

  useWavesurfer({
    container: containerRef,
    waveColor: waveColor,
    progressColor: progressColor,
    mediaControls: true,
    normalize: false,
    height: 75,
    url: audioUrl,
  });



  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
}

export default AudioWaveForm;