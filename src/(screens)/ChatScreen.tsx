import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useMemo, useRef, useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { chatHistory } from '../utils';
import { Message } from '../components/Message';
import { Message as MessageType } from '../types';
import { TypingAnimation } from '../components/TypingAnimation';

export default function ChatScreen() {
  const [visibleMessages, setVisibleMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showMessagesSequentially = async () => {
      for (let i = 0; i < chatHistory.length; i++) {
        const msg = chatHistory[i];

        if (msg.from === 1) {
          if (msg.type === 1) {
            await new Promise<void>(resolve => setTimeout(resolve, 500));
          } else {
            setIsTyping(true);
            const randomDelay =
              Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
            await new Promise<void>(resolve =>
              setTimeout(() => resolve(), randomDelay),
            );
            setIsTyping(false);
          }
        } else {
          if (msg.type === 1) {
            await new Promise<void>(resolve => setTimeout(resolve, 500));
          } else {
            const textToType = msg.text || '';

            for (let j = 0; j <= textToType.length; j++) {
              setInputText(textToType.substring(0, j));
              await new Promise<void>(resolve => setTimeout(resolve, 30));
            }

            await new Promise<void>(resolve => setTimeout(resolve, 500));
            setInputText('');
          }
        }

        setVisibleMessages(prev => [...prev, msg]);
      }
    };

    showMessagesSequentially();
  }, []);

  const renderItem = ({ item }: { item: MessageType }) => (
    <Message message={item} lookup={messageLookup} />
  );
  const renderFooter = () => {
    if (!isTyping) return null;
    return (
      <View style={styles.leftChat}>
        <TypingAnimation />
      </View>
    );
  };

  const messageLookup = useMemo(() => {
    return new Map(visibleMessages.map(m => [m.id, m]));
  }, [visibleMessages]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.scrollContent}
        data={visibleMessages}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={renderFooter}
      />
      <View style={styles.textInputContainer}>
        <Text style={styles.fakeInputText}>{inputText}</Text>
        <View style={styles.sendButton}>
          <Ionicons name="send" color="white" size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    minHeight: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 24,
    paddingStart: 12,
    paddingEnd: 4,
    paddingVertical: 4,
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
  fakeInputText: {
    flex: 1,
    color: 'white',
  },
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
});
