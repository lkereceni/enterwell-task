import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Message as MessageType } from '../../types';
import { memo } from 'react';
import { REACTION_ICONS } from '../../utils';

interface MessageProps {
  message: MessageType;
  lookup?: Map<number, MessageType>;
  onReplyPress?: (repliedId: number) => void;
}

const MessageComponent = ({ message, lookup, onReplyPress }: MessageProps) => {
  const repliedMessage =
    message.replyTo !== null ? lookup?.get(message.replyTo) : null;

  const hasReaction = message.reactions && message.reactions.count > 0;

  return (
    <View style={message.from === 1 ? styles.leftWrapper : styles.rightWrapper}>
      <View
        style={
          message.from === 1
            ? styles.leftMessageContainer
            : styles.rightMessageContainer
        }
      >
        {message.replyTo !== null && (
          <Pressable
            style={styles.messageReplyContainer}
            onPress={() => onReplyPress?.(message.replyTo!)}
            accessibilityLabel="Jump to original message!"
          >
            <Text
              style={styles.messageReplyText}
              numberOfLines={5}
              lineBreakMode="tail"
            >
              {repliedMessage?.text || 'Original message unavailable'}
            </Text>
          </Pressable>
        )}
        {message.type === 1 && message.url ? (
          <Image
            style={styles.image}
            width={300}
            source={{ uri: message.url }}
          />
        ) : (
          <Text style={message.from === 1 ? styles.leftText : styles.rightText}>
            {message.text}
          </Text>
        )}
      </View>

      {hasReaction && (
        <View style={styles.reactionContainer}>
          <Text style={styles.reactionEmoji}>
            {REACTION_ICONS[message.reactions.value]}
          </Text>
          <Text style={styles.reactionCount}>{message.reactions.count}</Text>
        </View>
      )}
    </View>
  );
};

export const Message = memo(MessageComponent, (prevProps, nextProps) => {
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.text === nextProps.message.text &&
    (prevProps.message.replyTo === null ||
      prevProps.lookup === nextProps.lookup)
  );
});

const styles = StyleSheet.create({
  leftWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    marginBottom: 16,
    maxWidth: '80%',
  },
  rightWrapper: {
    alignSelf: 'flex-end',
    position: 'relative',
    marginBottom: 16,
    maxWidth: '80%',
  },
  leftMessageContainer: {
    backgroundColor: Colors.secondary,
    padding: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  leftText: {
    color: Colors.onSecondary,
    padding: 6,
  },
  rightMessageContainer: {
    backgroundColor: Colors.accent,
    padding: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  rightText: {
    color: Colors.onAccent,
    padding: 6,
  },
  image: {
    borderRadius: 8,
    maxWidth: '100%',
    height: undefined,
    aspectRatio: 3 / 2,
  },
  messageReplyContainer: {
    backgroundColor: Colors.overlay,
    padding: 8,
    borderRadius: 8,
  },
  messageReplyText: {
    color: Colors.textSecondary,
  },
  reactionContainer: {
    position: 'absolute',
    bottom: -16,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  reactionEmoji: {
    fontSize: 12,
  },
  reactionCount: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '700',
    color: Colors.textMuted,
  },
});
