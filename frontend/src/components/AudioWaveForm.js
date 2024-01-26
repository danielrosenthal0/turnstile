import { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioWaveForm = ({ audioUrl}) => {
  const waveformRef = useRef();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
    });

    wavesurfer.on('error', (error) => {
      console.error('Error loading audio:', error);
    });

    try {
      wavesurfer.load(audioUrl);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  

    return () => {
      wavesurfer.destroy();
    }
  }, [audioUrl]);

  return (
    <div ref={waveformRef} />
  )
}

export default AudioWaveForm;