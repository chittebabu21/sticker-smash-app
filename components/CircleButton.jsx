// import the modules
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from './Colors';

// functional component
const CircleButton = ({ onPress }) => {
    // return jsx
    return (
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <MaterialIcons name='add' size={38} color={Colors.secondary} />
            </Pressable>
        </View>
    );
}

// style template
const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: Colors.light,
        borderRadius: 42,
        padding: 3
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: Colors.dark
    }
});

// export the component
export default CircleButton;