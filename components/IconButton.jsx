// import modules
import { Text, Pressable, StyleSheet} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from './Colors';

// functional component
const IconButton = ({ icon, label, onPress }) => {
    // return the jsx
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color={Colors.dark} />
            <Text style={styles.iconButtonLabel}>{ label }</Text>
        </Pressable>
    );
}

// style template
const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    iconButtonLabel: {
        color: Colors.light,
        marginTop: 12
    }
});

// export the component
export default IconButton;