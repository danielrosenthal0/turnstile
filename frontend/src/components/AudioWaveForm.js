import React, { useRef } from 'react';
import { useWavesurfer } from '@wavesurfer/react';

const AudioWaveForm = ({ audioUrl }) => {
  const containerRef = useRef(null);

  useWavesurfer({
    container: containerRef,
    waveColor: 'violet',
    progressColor: 'purple',
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