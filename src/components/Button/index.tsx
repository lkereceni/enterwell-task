import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface ButtonProps {
    text: string;
    onPress: () => void;
}

export const Button = ({ text, onPress }: ButtonProps) => {
    return (
        <Pressable style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Colors.accent,
        paddingBlock: 8,
        paddingInline: 16,
        borderRadius: 8
    },
    buttonText: {
        color: "white"
    }
})