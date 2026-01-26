import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useMemo, useRef } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { chatHistory } from '../utils';
import { Message } from '../components/Message';
import { Message as MessageType } from '../types';
import { TypingAnimation } from '../components/TypingAnimation';
import { useVisibleMessages } from '../hooks/useVisibleMessages';

export default function ChatScreen() {
  const { visibleMessages, isTyping, simulatedInput } = useVisibleMessages({
    chatHistory,
  });

  const flatListRef = useRef<FlatList>(null);

  const messageLookup = useMemo(() => {
    return new Map(visibleMessages.map(m => [m.id, m]));
  }, [visibleMessages]);

  const scrollToMessageHandler = useCallback(
    (repliedId: number) => {
      const index = visibleMessages.findIndex(m => m.id === repliedId);

      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    },
    [visibleMessages],
  );

  const renderItem = useCallback(
    ({ item }: { item: MessageType }) => (
      <Message
        message={item}
        lookup={messageLookup}
        onReplyPress={scrollToMessageHandler}
      />
    ),
    [messageLookup, scrollToMessageHandler],
  );
  const renderFooter = () => {
    if (!isTyping) return null;
    return (
      <View style={styles.leftChat}>
        <TypingAnimation />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        ref={flatListRef}
        data={visibleMessages}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        onContentSizeChange={() => {
          if (visibleMessages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: false });
          }
        }}
        onScrollToIndexFailed={info => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
      <View style={styles.textInputContainer}>
        <Text style={styles.fakeInputText}>{simulatedInput}</Text>
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
