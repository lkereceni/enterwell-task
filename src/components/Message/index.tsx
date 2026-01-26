import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Message as MessageType } from '../../types';
import { memo } from 'react';

interface MessageProps {
  message: MessageType;
  lookup?: Map<number, MessageType>;
  onReplyPress?: (repliedId: number) => void;
}

const MessageComponent = ({ message, lookup, onReplyPress }: MessageProps) => {
  const repliedMessage =
    message.replyTo && lookup ? lookup.get(message.replyTo) : null;

  return (
    <View
      style={
        message.from === 1
          ? styles.leftMessageContainer
          : styles.rightMessageContainer
      }
    >
      {message.replyTo !== null ? (
        <Pressable
          style={styles.messageReplyContainer}
          onPress={() => message.replyTo && onReplyPress?.(message.replyTo)}
        >
          <Text
            style={styles.messageReplyText}
            numberOfLines={5}
            lineBreakMode="tail"
          >
            {repliedMessage?.text}
          </Text>
        </Pressable>
      ) : null}
      {message.type === 1 && message.url ? (
        <Image
          style={styles.image}
          width={300}
          height={200}
          source={{ uri: message.url }}
        />
      ) : (
        <Text style={message.from === 1 ? styles.leftText : styles.rightText}>
          {message.text}
        </Text>
      )}
    </View>
  );
};

export const Message = memo(MessageComponent);

const styles = StyleSheet.create({
  leftMessageContainer: {
    maxWidth: '90%',
    backgroundColor: Colors.secondary,
    padding: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignSelf: 'flex-start',
  },
  leftText: {
    color: Colors.onSecondary,
    padding: 4,
  },
  rightMessageContainer: {
    maxWidth: '90%',
    backgroundColor: Colors.accent,
    padding: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    alignSelf: 'flex-end',
  },
  rightText: {
    color: Colors.onAccent,
    padding: 4,
  },
  image: {
    borderRadius: 8,
  },
  messageReplyContainer: {
    backgroundColor: Colors.overlay,
    padding: 8,
    borderRadius: 8,
  },
  messageReplyText: {
    color: Colors.textSecondary,
  },
});
