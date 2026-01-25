import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';
import { Button } from '../components/Button';

export default function HomeScreen({navigation}) {

  const buttonPressHandler = () => {
    navigation.navigate("Chat");
  }

  return (
    <View style={styles.container}>
      <Button text='Go to Chat' onPress={buttonPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  button: {
    backgroundColor: Colors.accent,
  }
});
