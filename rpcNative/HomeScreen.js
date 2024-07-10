//HomeScreen.js

import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const navigateToWebView = () => {
        navigation.navigate('WebView');
    };

    const navigateToLocationPermission = () => {
        navigation.navigate("LocationWebView")
    }

    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <Button title="Go to WebView" onPress={navigateToWebView} />
            <Button title="Check Location Permsiion" onPress={navigateToLocationPermission} />
        </View>
    );
};

export default HomeScreen;
