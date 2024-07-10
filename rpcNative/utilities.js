import { PermissionsAndroid, Platform } from "react-native";
import { launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export function Sum(params) {
    console.log(params, "RN SUM")
    return params?.a + params?.b;
};

export function PrintLog(message) {
    console.log(`${message} from React Native as CallBack!`);
    return message;
};

export function PrintLocation(location) {
    console.log(`Location => latitude: ${location.latitude} , logitude: ${location.longitude}`)
    return location
}

const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app requires access to your camera.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true; // Permission granted
            } else {
                return false; // Permission denied
            }
        } catch (err) {
            console.warn(err);
            return false; // Permission request failed
        }
    }
};

const convertToBase64 = async (imageUrl) => {
    try {
        const res = await RNFetchBlob.fs.readFile(imageUrl, 'base64');
        return `data:image/jpeg;base64,${res}`;
    } catch (error) {
        console.error('Failed to convert image to base64:', error);
        return null;
    }
};

export const Camera = async () => {
    try {
        const hasPermission = await checkCameraPermission();
        if (!hasPermission) {
            console.log('Camera permission denied');
            return null;
        }

        const options = {
            mediaType: 'photo',
            quality: 0.5,
            maxWidth: 800,
            maxHeight: 600,
        };

        const response = await new Promise((resolve, reject) => {
            launchCamera(options, (response) => {
                resolve(response);
            });
        });

        if (response.didCancel) {
            console.log('User cancelled camera picker');
            return null;
        } else if (response.error) {
            console.log('Camera Error: ', response.error);
            return null;
        } else {
            const imageUrl = response?.assets[0].uri;
            const base64Url = await convertToBase64(imageUrl);
            if (base64Url) {
                return base64Url;
            } else {
                console.log('Failed to convert image to base64');
                return null;
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};