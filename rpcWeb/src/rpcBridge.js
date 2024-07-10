import bridgeFunctions from "./bridgeFunctions"
import uuid from 'uuid-random'

const createBridge = () => {

    const bridge = {}
    const callbacks = {}

    bridge._createRpcRequestBody = (method_name, params) => {
        let id = uuid()
        let callback_id = uuid()
        const request = {
            id,
            method_name,
            params,
            callback_id
        }
        return request;
    }

    bridge._createRpcResponseBody = (id, params, callback_id) => {
        const request = {
            id,
            params,
            callback_id
        }
        return request;
    }

    bridge._sendRpcMessage = (request) => {
        window.ReactNativeWebView.postMessage(JSON.stringify(request));
    }

    bridge.sendRequestToNative = (method_name, params, callback) => {
        let request_data = bridge._createRpcRequestBody(method_name, params);
        let callback_id = request_data['callback_id']
        callbacks[callback_id] = callback
        bridge._sendRpcMessage(request_data)
    }

    bridge._sendResponseToWeb = (id, response, callback_id) => {
        let response_data = bridge._createRpcResponseBody(id, response, callback_id)
        bridge._sendRpcMessage(response_data)
    }

    bridge.listenMessagesFromNative = async (request) => {

        const parseRequest = JSON.parse(request)
        let { id, method_name, params, callback_id } = parseRequest;

        if (callbacks.hasOwnProperty(callback_id)) {
            // This means this message is a response to some earlier request
            callbacks[callback_id](params);
            delete callbacks[callback_id]
        } else {
            // This is a new request to the app side
            if (method_name) {
                const response = await bridgeFunctions[method_name](params)
                bridge._sendResponseToWeb(id, response, callback_id);
            }
        }
    };

    return bridge;
}

export { createBridge };