import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Nav } from './Nav';

export const SpeechToText = () => {
  const [hindiTranscript, setHindiTranscript] = useState('');
  const [englishTranscript, setEnglishTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const englishCommands = [
    {
      command: 'reset',
      callback: () => {
        setEnglishTranscript('');
        resetTranscript('en');
      }
    },
    {
      command: 'open *',
      callback: (site) => {
        window.open('http://' + site);
      }
    }
  ];

  const hindiCommands = [
    {
      command: 'रीसेट',
      callback: () => {
        setHindiTranscript('');
        resetTranscript('hi');
      }
    },
    {
      command: 'खोलो *',
      callback: (site) => {
        window.open('http://' + site);
      }
    }
  ];

  const {
    transcript: enTranscript,
    listening: enListening,
    resetTranscript: resetEnTranscript,
    browserSupportsSpeechRecognition: enBrowserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands: englishCommands });

  const {
    transcript: hiTranscript,
    listening: hiListening,
    resetTranscript: resetHiTranscript,
    browserSupportsSpeechRecognition: hiBrowserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands: hindiCommands });

  useEffect(() => {
    if (enListening) {
      setEnglishTranscript(enTranscript);
    }
  }, [enTranscript, enListening]);

  useEffect(() => {
    if (hiListening) {
      setHindiTranscript(hiTranscript);
    }
  }, [hiTranscript, hiListening]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    SpeechRecognition.startListening({ continuous: true, language: 'hi-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const resetTranscript = (language) => {
    if (language === 'en') {
      resetEnTranscript();
      setEnglishTranscript('');
    } else if (language === 'hi') {
      resetHiTranscript();
      setHindiTranscript('');
    }
  };

  const resetTranscripts = () => {
    resetTranscript('en');
    resetTranscript('hi');
  };

  if (!enBrowserSupportsSpeechRecognition || !hiBrowserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
    <Nav/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
        
        <div>
          <p>Microphone: {isListening ? 'on' : 'off'}</p>
          <button onClick={startListening}>Start</button>
          <button onClick={stopListening} disabled={!isListening}>Stop</button>
          <button onClick={resetTranscripts}>Reset</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h2>English Section</h2>
          <p>Transcript: {englishTranscript}</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h2>Hindi Section</h2>
          <p>Transcript: {hindiTranscript}</p>
        </div>
      </div>
    
    </>
  );
};
