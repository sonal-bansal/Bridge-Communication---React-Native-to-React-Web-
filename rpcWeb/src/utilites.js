export function Sum(params) {
    return params?.a + params?.b;
};

export function PrintLog(message) {
    console.log(message);
};

export function ShowAlert(message) {
    alert(`${message} from Web!`)
};

export async function StoreImageInWeb(params) {
    if (params) {
        alert(`Check Callback ${params}`)
        sessionStorage.setItem('imageUrl', params)
    }
    return true
}

export async function getLocation(params) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Location access granted');
                console.log(position.coords, "+++++++")
                // Resolve the promise with position.coords
                resolve(position.coords);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    console.log('Location access denied');
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    console.log('Location information is unavailable');
                } else if (error.code === error.TIMEOUT) {
                    console.log('The request to get user location timed out');
                } else {
                    console.log('An unknown error occurred while getting user location');
                }
                // Reject the promise with the error
                reject(error);
            }
        );
    });
}

export async function LocationPermissionAlert(params) {
    try {
        const coords = await getLocation(params);
        console.log('Received coordinates:', coords);
        return { latitude: coords.latitude, longitude: coords.longitude }
    } catch (error) {
        console.log('Error getting location!');
        throw error
    }
}