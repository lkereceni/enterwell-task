import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { chatHistory } from '../utils';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import { TypingAnimation } from '../components/TypingAnimation';

export default function ChatScreen() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const showMessagesSequentially = async () => {
      for (let i = 0; i < chatHistory.length; i++) {
        if (chatHistory[i].from === 1) {
          setIsTyping(true);
        }

        const randomDelay =
          Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        await new Promise<void>(resolve => {
          setTimeout(() => resolve(), randomDelay);
        });

        setVisibleMessages(prev => [...prev, chatHistory[i]]);
        setIsTyping(false);
      }
    };

    showMessagesSequentially();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleMessages.map((message, index) => (
          <Chat key={index} message={message} />
        ))}
        {isTyping && (
          <View style={styles.leftChat}>
            <TypingAnimation />
          </View>
        )}
      </ScrollView>
      <View style={styles.textInputContainer}>
        <View style={styles.sendButton}>
          <Ionicons name="send" color="white" size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leftChat: {
    maxWidth: '60%',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  textInputContainer: {
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 24,
    padding: 2,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignSelf: 'flex-end',
  },
});
