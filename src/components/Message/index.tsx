import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <View
      style={
        message.from === 1
          ? styles.leftMessageContainer
          : styles.rightMessageContainer
      }
    >
      {message.type === 1 && message.url ? (
        <Image
          style={styles.image}
          width={300}
          height={200}
          src={message.url}
        />
      ) : (
        <Text style={message.from === 1 ? styles.leftText : styles.rightText}>
          {message.text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftMessageContainer: {
    maxWidth: '90%',
    backgroundColor: Colors.secondary,
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'flex-start',
  },
  leftText: {
    color: Colors.onSecondary,
  },
  rightMessageContainer: {
    maxWidth: '90%',
    backgroundColor: Colors.accent,
    padding: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: 'flex-end',
  },
  rightText: {
    color: Colors.onAccent,
  },
  image: {
    borderRadius: 8,
  },
});
