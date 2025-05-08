
import styled from 'styled-components'
import Image from 'next/image'

export const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1d33;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

export const ChatContainer = styled.div`
  background-color: #2e3148;
  width: 100%;
  max-width: 1000px;
  padding: 36px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 59px;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
`;

export const ChatBox = styled.div`
  background-color: #3c4058;
  padding: 50px;
  border-radius: 30px;
  height: 450px;
  overflow-y: scroll;
  scrollbar-width: none;
  margin-bottom: 10px;
  box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.2);
  border-left: 3px solid #5a5a5a;
  border-right: 3px solid #5a5a5a;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TextInput = styled.textarea`
  width: 100%;
  padding-left: 50px;
  padding-right: 50px; 
  padding-top: 22px;
  padding-bottom: 12px;
  background-color: #3c4058;
  color: white;
  height: 50px;
  max-height: 150px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  resize: none;
  overflow-y: auto;
  line-height: 1.4;
  scrollbar-width: none;
  border-left: 3px solid #5a5a5a;
  border-right: 3px solid #5a5a5a;
  box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const MicrophoneIcon = styled(Image)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const HelloIng = styled.div`
  display: flex;
  flex-direction: column;
`
export const MessageIcon = styled(Image)`
  width: 30px;
  height: 30px;
`;
export const HiThere = styled.div`
  color: white;
  line-height: 50px;
`
export const SendArrow = styled.button`
  position: absolute;
  right: -2px;
  top: 49%;
  font-size: 2vw;
  color: white;
  background-color: #1a1d33;
  border: none;
  transform: translateY(-50%);
  width: 5vw;
  height: 3.7vw;
  cursor: pointer;
  border-radius: 30px;
  border-right: 3px solid #5a5a5a;
  box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.2);


  &:hover{
    background-color: #2e3148;
  }
`