import { useState } from 'react';
import { useRef, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';


import { 
LayoutContainer,
ChatContainer,
ChatBox,
InputWrapper,
TextInput,
MicrophoneIcon,
HelloIng,
MessageIcon,
HiThere,
SendArrow
} from './styled';
import Microphone from '@/app/icons/microphone.png';
import message from '@/app/icons/message.png';




const Layout = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);


  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]); 
    setInput('');
    setIsTyping(true);
  
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
  




    const data = await res.json();
    const assistantMessage = { role: 'assistant', content: data.reply };
  
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);


  return (
    <LayoutContainer>
      <ChatContainer>
        <HelloIng>
          <MessageIcon src={message} alt='message icon'/>
          <HiThere>
            <h1>Hi there! <br/>What would you like to know?</h1>
          </HiThere>
          <p style={{color:"white"}}>Use one of the most common prompts below or ask your own question</p>
        </HelloIng>
        <ChatBox>
          {messages.length === 0 ? (
            <p style={{ color: '#aaa', textAlign: 'center', marginTop: '40px' }}>
              👋 Start a conversation below. Messages will appear here.
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  color: msg.role === 'user' ? 'cyan' : 'white',
                  marginBottom: '12px',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                <ReactMarkdown
                  children={msg.content}
                  components={{
                    p: ({ children }) => <p style={{ margin: '4px 0' }}>{children}</p>,
                    li: ({ children }) => <li style={{ marginLeft: '20px' }}>• {children}</li>,
                  }}
                />
              </div>
            ))
          )}
        </ChatBox>

        <InputWrapper>
          <MicrophoneIcon src={Microphone} alt="Mic" />
          <TextInput
            ref={textAreaRef}
            placeholder="Ask whatever you want" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
          <SendArrow onClick={sendMessage}>^</SendArrow>
        </InputWrapper>
      </ChatContainer>
    </LayoutContainer>
  );
};

export default Layout;
