import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { createBridge } from "./rpcBridge";
import bridgeFunctions from './bridgeFunctions';

export default function LocationWebView({ route }) {

    const webViewRef = useRef(null)
    const bridge = createBridge(webViewRef)

    const testing = () => {
        bridge.sendRequestToWeb("LocationPermissionAlert", null, (response) => { bridgeFunctions.PrintLocation(response) })
    }

    const onMessage = (event) => {
        bridge.listenMessagesFromWeb(event, webViewRef);
    }

    return (
        <WebView
            onMessage={event => {
                onMessage(event.nativeEvent.data)
            }}
            source={{ uri: 'http://localhost:3000' }} // Replace with your PWA URL
            ref={webViewRef}
            onLoad={testing}
        />
    )
}