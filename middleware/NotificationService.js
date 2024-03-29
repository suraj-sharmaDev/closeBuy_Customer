import firebase from 'react-native-firebase';
import { UpdateToken } from './API';

const NotificationService = (userId, onDataNotifs) => {
  const channel = new firebase.notifications.Android.Channel(
    'insider',
    'insider channel',
    firebase.notifications.Android.Importance.Max,
  );
  firebase.notifications().android.createChannel(channel);
  // firebase.messaging().subscribeToTopic('user_Suraj');  //to receive message for individual users
  const checkPermission = async () => {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          getToken();
      } else {
          requestPermission();
      }
  }

  const saveToken = (fcmToken) => {
    let formData = new FormData();
    formData.append('customerId', userId.toString());
    formData.append('token', fcmToken);
    UpdateToken(formData)
    .then((result)=>{
      // console.warn(result);
    })
    .catch((err)=>{
      // console.warn('Notification Service Error');
    })
  }

  //Get token from firebase
  const getToken = async () => {
    try{
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        saveToken(fcmToken);
      } else {
        //error occurred
      }
    }catch(err){
      console.warn('No Internet!');
    }
  }

  //Request permission for firebase
  const requestPermission = async () => {
      try {
          await firebase.messaging().requestPermission();
          getToken();
      } catch (error) {
          console.log('permission rejected');
      }
  }

  const createNotificationListeners = () => {

      //We have to check for refreshed tokens
      onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        subscribe(fcmToken);
      });

      //Listen for notifications
      firebase.notifications().onNotificationOpened((notificationOpen) => {
          console.warn('poda');
          const { title, body, _data} = notification;
          console.warn(JSON.stringify(_data));
      });    
      firebase.messaging().onMessage((message) => {
          console.warn(JSON.stringify(message));
      });
      firebase.notifications().onNotification(notification => {
          if(notification._data){
            onDataNotifs(notification._data);
          }else{
            const localNotification = new firebase.notifications.Notification()
              .setNotificationId(notification.notificationId)
              .setTitle(notification.title)
              .setBody(notification.body)
              .setSound('default')            
              .android.setChannelId('insider')
              .android.setAutoCancel(true);

            firebase.notifications().displayNotification(localNotification);
          }
      });
  }

  checkPermission();
  createNotificationListeners();
}

export default NotificationService;