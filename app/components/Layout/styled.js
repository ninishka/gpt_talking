
import styled from 'styled-components'
import Image from 'next/image'
import { keyframes } from 'styled-components';

const dots = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

export const TypingDots = styled.span`
  &::after {
    content: '';
    animation: ${dots} 1.2s steps(3, end) infinite;
    display: inline-block;
    width: 1em;
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: teal;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

export const ChatContainer = styled.div`
  background-color: cadetblue;
  width: 100%;
  max-width: 900px;
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;



export const ChatBox = styled.div`
  background-color: teal;
  padding: 24px;
  border-radius: 20px;
  height: 450px;
  overflow-y: auto;
  margin-bottom: 10px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f7f9fc;
`;


export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TextInput = styled.textarea`
  flex-grow: 1;
  padding: 14px 60px 14px 50px;
  background-color: lightgrey;
  color: #1f2937;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  resize: none;
  overflow-y: auto;
  height: 50px;
  max-height: 150px;
  line-height: 1.4;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;



export const MicrophoneIcon = styled(Image)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const HelloIng = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageIcon = styled(Image)`
  width: 30px;
  height: 30px;
`;

export const HiThere = styled.div`
  color: white;
  line-height: 1.6;
`;

export const SendArrow = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 1.5rem;
  color: white;
  background-color: #3b82f6;
  border: none;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;
