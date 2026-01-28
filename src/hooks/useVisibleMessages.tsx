import { useEffect, useRef, useState } from 'react';
import { Message } from '../types';

interface UseVisibleMessagesProps {
  chat: Message[];
  typingSpeed?: number;
}

export const useVisibleMessages = ({
  chat,
  typingSpeed = 50,
}: UseVisibleMessagesProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [simulatedInput, setSimulatedInput] = useState('');

  const isMounted = useRef(true);

  const delay = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    isMounted.current = true;

    const runSimulation = async () => {
      for (const msg of chat) {
        if (!isMounted.current) break;

        if (msg.from === 1) {
          if (msg.type !== 1) {
            setIsTyping(true);
            const randomDelay = Math.floor(Math.random() * 3000) + 1000;
            await delay(randomDelay);
            setIsTyping(false);
          } else {
            await delay(500);
          }
        } else {
          if (msg.type !== 1 && msg.text) {
            for (let i = 0; i <= msg.text.length; i++) {
              if (!isMounted.current) break;

              setSimulatedInput(msg.text.substring(0, i));
              await delay(typingSpeed);
            }
            await delay(600);
            setSimulatedInput('');
          }
        }

        if (isMounted.current) {
          setVisibleMessages(prev => [...prev, msg]);
        }
      }
    };

    runSimulation();

    return () => {
      isMounted.current = false;
    };
  }, [chat, typingSpeed]);

  return { visibleMessages, isTyping, simulatedInput };
};
