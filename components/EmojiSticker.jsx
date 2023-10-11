// import the modules
import { View, Image, StyleSheet } from 'react-native';
import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

// create animated image component using image
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

// functional component
const EmojiSticker = ({ imageSize, stickerSource }) => {
    // create 2 shared value
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // use image size as scale
    const scaleImage = useSharedValue(imageSize);

    // on double tap function
    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
        }
    });

    // on drag function to handle panning
    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        }
    });

    // image style 
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    });

    // style for animated view
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        }
    });

    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[containerStyle, styles.stickerContainer]}>
                <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                    <AnimatedImage 
                        source={stickerSource}
                        resizeMode='contain'
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    );
}

// style template
const styles = StyleSheet.create({
    stickerContainer: {
        top: -350
    }
});

// export the component
export default EmojiSticker;