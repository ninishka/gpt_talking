"use client";
import { useEffect, useRef, useState } from "react";

import styled from 'styled-components'
import Image from 'next/image'
import Microphone from '@/app/icons/microphone.png';

const MicrophoneIcon = styled(Image)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const VoiceRecorder = ({ onTranscript }) => {
  const recognitionRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;


      recognition.onstart = () => {
        console.log("Speech recognition started");
      };
      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      
        if (event.error === "network") {
          alert("Speech recognition failed due to network issues. Make sure you're using HTTPS.");
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
    
  }, [onTranscript]);
  

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      console.warn("Speech recognition not supported.");
      return;
    }
  
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  
    setIsRecording(!isRecording);
  };  

  

  return (
    <MicrophoneIcon
      src={Microphone.src} 
      alt={isRecording ? "Stop recording" : "Start recording"}
      onClick={toggleRecording}
      priority
      width={30}
      height={30}
      style={{
        opacity: isRecording ? 0.5 : 1,
      }}

    />
  );
};

export default VoiceRecorder;