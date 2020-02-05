import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid} from 'react-native';

const GeolocationService = (mounted, onPermissionDenial, onLocation) => {
	const requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'CloseBuy Location Permission',
					message:
						'CloseBuy needs to access your Geolocation' +
						' so you can access nearby shops.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				getCurrentLocation();
			} else {
				onPermissionDenial();
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const getCurrentLocation = () => {
		Geolocation.getCurrentPosition(
			position => {
				let region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};
				onLocation(region); //pass the region data back 
			},
			error => {
				onPermissionDenial();
			},
			{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter:5},
		);
	};
//Start geolocation services function
	if(mounted){
		requestPermission();
	}
}

export default GeolocationService;