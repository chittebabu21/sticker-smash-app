// import the modules
import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

// functional component
const EmojiList = ({ onSelect, onCloseModal }) => {
    // define emojis
    const [emoji] = useState([
        require('../assets/emojis/cry-sad.png'),
        require('../assets/emojis/laugh-tears.png'),
        require('../assets/emojis/love-eyes.png'),
        require('../assets/emojis/sunglasses-cool.png'),
        require('../assets/emojis/wink-cheeky.png')
    ]);

    // return jsx
    return (
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return (
                    <Pressable
                        onPress={() => {
                            onSelect(item);
                            onCloseModal();
                        }}
                    >
                        <Image source={item} key={index} style={styles.image} />
                    </Pressable>
                );
            }}
        />
    );
}

// style template
const styles = StyleSheet.create({
    listContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 20
    }
});

// export the component
export default EmojiList;