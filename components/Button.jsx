// import the modules
import { StyleSheet, Pressable, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "./Colors";

// functional component
const Button = ({ label, theme, onPress }) => {
    // on press function
    const handleOnPress = () => {
        alert('You have pressed a button!');
    }

    // handle hover event
    const handleHoverEvent = () => {

    }

    // check the theme
    if (theme === 'primary') {
        return (
            <View style={[ styles.buttonContainer, { borderWidth: 4, borderColor: Colors.light, borderRadius: 18 }]}>
                <Pressable style={[ styles.button, { backgroundColor: Colors.dark }]} onPress={onPress}>
                    <FontAwesome 
                        name='picture-o'
                        size={18}
                        color={ Colors.secondary }
                        style={ styles.buttonIcon }
                    />
                    <Text style={ styles.buttonLabel }>{ label }</Text>
                </Pressable>
            </View>
        );
    }

    // return the jsx
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{ label }</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 60,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonIcon: {
        paddingRight: 10
    },
    buttonLabel: {
        fontSize: 16,
        color: Colors.light
    }
});

// export the button component
export default Button;