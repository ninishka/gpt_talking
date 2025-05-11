"use client";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Microphone from "@/app/icons/microphone.png";

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
  const [isRecording, setIsRecording] = useState(false);

  const handleOnRecord = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      onTranscript(transcript); 
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <>
      {isRecording && (
        <div style={{ color: "white", fontSize: "12px", position: "absolute", top: "-20px", left: "50px" }}>
          🎤 Listening...
        </div>
      )}
      <MicrophoneIcon
        src={Microphone.src}
        alt={isRecording ? "Stop recording" : "Start recording"}
        onClick={handleOnRecord}
        width={30}
        height={30}
        style={{ opacity: isRecording ? 0.5 : 1 }}
      />
    </>
  );
};

export default VoiceRecorder;
