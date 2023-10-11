import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ImageViewer from './components/ImageViewer';
import Colors from './components/Colors';
import Button from './components/Button';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

// import image
const PlaceholderImage = require('./assets/me_taipei.jpeg');

export default function App() {
  // define states
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  // check request to access photo library status
  if (status === null) {
    requestPermission();
  }

  // image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    // check if result is cancelled
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowOptions(true);
      console.log(result);
    } else {
      alert('Please select an image.')
    }
  }

  // reset function
  const onReset = () => {
    setShowOptions(false);
  }

  // add sticker function
  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  // close the modal function
  const onCloseModal = () => {
    setIsModalVisible(false);
  }

  // save image function
  const onSaveImage = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1
        });
  
        // save to local folder
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Image saved!');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const dataUri = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          height: 440,
          width: 320
        });

        // download the link
        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUri;
        link.click();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // return jsx
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji !== null ? <EmojiSticker stickerSource={pickedEmoji} imageSize={40} /> : null}
        </View>
      </View>

      {showOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme='primary' label='Choose an image' onPress={ pickImage }/>
          <Button label='Use this image' onPress={() => setShowOptions(true)}/>
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.light
  },
  imageContainer: {
    padding: 58,
    flex: 1
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
