import React, { useState, useEffect } from 'react';
import { createBridge } from './rpcBridge';
import bridgeFunctions from "./bridgeFunctions"

const App = () => {
    const bridge = createBridge();
    window.listenMessagesFromApp = function (request) {
        bridge.listenMessagesFromNative(request)
    }
    const [listenChange, setListenChange] = useState(false)
    const [showImages, setShowImages] = useState(false);

    useEffect(() => {
        if (listenChange) {
            setShowImages(sessionStorage?.getItem('imageUrl') ? true : false)
            setListenChange(false)
        }
    }, [listenChange])

    const sumFromNativeApp = () => {
        bridge.sendRequestToNative("Sum", { a: 9, b: 3 }, (response) => {
            bridgeFunctions.PrintLog(response);
        })
    }

    const checkCameraPermission = () => {
        bridge.sendRequestToNative("Camera", null, async (response) => {
            await bridgeFunctions.StoreImageInWeb(response)
            setListenChange(true)
        })
    }

    return (
        <div style={{ backgroundColor: "yellow" }}>
            <h1 id='testBridge'>Hello, World!</h1>
            <p>This is a basic React Web App.</p>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={() => { sumFromNativeApp() }}>{"Trigger Example Method"}</button>
                <button type="button" onClick={() => { checkCameraPermission() }}>{"Camera Permission Method"}</button>
            </div>
            {showImages && <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ paddingTop: '8px' }}>{"Captured Image"}</label>
                <img src={sessionStorage?.getItem('imageUrl')} alt="Captured Image" style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '8px' }} />
            </div>}
        </div>
    );
};

export default App;
