import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Message } from '../../types';

interface ChatProps {
  message: Message;
}

export const Chat = ({ message }: ChatProps) => {
  return (
    <View style={message.from === 1 ? styles.leftChat : styles.rightChat}>
      <Text style={message.from === 1 ? styles.leftText : styles.rightText}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  leftChat: {
    maxWidth: '60%',
    backgroundColor: Colors.secondary,
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'flex-start',
  },
  leftText: {
    color: Colors.onSecondary,
  },
  rightChat: {
    maxWidth: '60%',
    backgroundColor: Colors.accent,
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: 'flex-end',
  },
  rightText: {
    color: Colors.onAccent,
  },
});
