import { useState } from 'react';
import { useRef, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder'; 


import { 
LayoutContainer,
ChatContainer,
ChatBox,
InputWrapper,
TextInput,
HelloIng,
MessageIcon,
HiThere,
SendArrow,
TypingDots
} from './styled';
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
  const lastAssistantRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    if (isTyping && typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isTyping]);


  useEffect(() => {
    if (lastAssistantRef.current) {
      lastAssistantRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages]);
  
  

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
          <MessageIcon
           src={message} 
           alt='message icon'
           width={30}
           height={30}
           priority
           />
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
                ref={msg.role === 'assistant' && index === messages.length - 1 ? lastAssistantRef : null}
                style={{
                  color: msg.role === 'user' ? 'darklatestgrey' : '#0f172a',
                  background: msg.role === 'user' ? 'lightgrey' : 'lightslategray',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p style={{ margin: '4px 0' }}>{children}</p>,
                    li: ({ children }) => <li style={{ marginLeft: '20px' }}>• {children}</li>,
                  }}
                >
                  {msg.content}
              </ReactMarkdown>
              </div>
            ))
          )}
      {isTyping && (
        <div ref={typingRef} style={{ color: 'white', marginBottom: '12px' }}>
          <strong color='#0f172a'>AI:</strong> <TypingDots>Typing</TypingDots >
        </div>
      )}
        </ChatBox>

        <InputWrapper>
          <VoiceRecorder  />
          <TextInput
            name="chat"
            ref={textAreaRef}
            placeholder="Ask whatever you want" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            />
          <SendArrow onClick={sendMessage}>^</SendArrow>
        </InputWrapper>
      </ChatContainer>
    </LayoutContainer>
  );
};

export default Layout;
