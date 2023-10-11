// import the modules
import { StyleSheet, Image } from 'react-native';

// functional component
const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
    // define image source
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    // return jsx
    return (
        <Image source={imageSource} style={styles.image}/>
    );
}

// define the style
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    }
});

// export the component
export default ImageViewer;