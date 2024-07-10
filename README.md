# Setting up bridge communication between React Native and React Web

This Repo explains on how to setup bridge between React Native App and React Web

## Steps to be followed:
1. Create the **rpcBridge.js** file in React Web and React Native respectively.
2. There are basically 2 functions we will need on each side.
   - Listener Function(to listen to any message from web/native)
   - Sender Function(to send a message with or without callback to web/native)
   
   Now lets see how to use rpcBridge file to send/listen messages on each side.
   
   ### **React Web:**
   
   In the file where you want to send/listen the messages:
   1. Import createBridge using => 
      ```js
      import { createBridge } from './rpcBridge';
      ```
   2. Create a bridge like => 
      ```js
      const bridge = createBridge();
      ```
   3. Attach a listener function to window object as shown below:
      ```js
      //This function will be responsible for listening message from App
      window.listenMessagesFromApp = function (request) {    
        bridge.listenMessagesFromNative(request)
      }
      ```
   4. To send a message from Web to Native we use the **bridge.sendRequestToNative** function wherein we pass the first parameter as method_name,seconde parameter is the arguments for the method to be, and third parameter is the callback to be triggered when the response has been received after method execution on native side.
   
      Example a: 
      ```js
      const sumFromNativeApp = () => {
          bridge.sendRequestToNative("Sum", { a: 9, b: 3 }, (response) => {
            bridgeFunctions.PrintLog(response);
          })
        }
      ```

      Example b: 
      ```js
      const checkCameraPermission = () => {
          bridge.sendRequestToNative("Camera", null, async (response) => {
            await bridgeFunctions.StoreImageInWeb(response)
            setListenChange(true)
          })
        }
      ```

   ### **React Native:**

   In the file where you want to send/listen messages:

   1. Import createBridge using => 
      ```js 
      import { createBridge } from './rpcBridge'; 
      ```

   2. Create a bridge like => 
      ```js
      //here we pass webViewRef in createBridge for reference
      const bridge = createBridge(webViewRef); 
      ```

   3. To listen to the messages in the Native side we use the onMessage prop provided by **WebView(from 'react-native-webview')**

   4. To send message from Native to Web we use the **bridge.sendRequestToWeb**, wherein the first parameter is the method_name, second paramter is the arguments required fro for the method and third parameter is the callback to be triggered when the response is received from Web after method has been executed.

      Refer below file for example:
      ```js
      import { WebView } from 'react-native-webview';
      import { createBridge } from './rpcBridge';

      export default function CustomWebView({ route }) {
        const webViewRef = useRef(null)
        const bridge = createBridge(webViewRef)


        const testing = () => {
          //responsible for sending messages to the Web
            bridge.sendRequestToWeb("Sum", { a: 9, b: 3 }, (reponse_data) => {    
                console.log("Some reponse data to the sum funcions 12", reponse_data)
            })
        }

        const onMessage = (event) => {
          //listener message called from bridge file
            bridge.listenMessagesFromWeb(event);   
        }

        return (
            <WebView
                //responsible for listening to message from Web
                onMessage={(event) => { 
                    onMessage(event.nativeEvent.data)
                }}
                // Replace with your PWA URL
                source={{ uri: 'http://localhost:3000' }} 
                ref={webViewRef}
                onLoad={testing}
            />
          )
      }
      ```
   
