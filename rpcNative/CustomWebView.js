import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { createBridge } from './rpcBridge';

export default function CustomWebView({ route }) {
    const webViewRef = useRef(null)
    const bridge = createBridge(webViewRef)


    const testing = () => {
        bridge.sendRequestToWeb("Sum", { a: 9, b: 3 }, (reponse_data) => {
            console.log("Some reponse data to the sum funcions 12", reponse_data)
        })
    }

    const onMessage = (event) => {
        bridge.listenMessagesFromWeb(event);
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