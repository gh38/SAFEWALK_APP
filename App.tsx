import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Platform,
  PermissionsAndroid
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';
import {Notifications} from 'react-native-notifications';

function App(): JSX.Element {

  const checkPermissions = async() => {
    try{
      const locationGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      const notificationGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if(!locationGranted || !notificationGranted){
        requestPermissions();
      }
    } catch(error){
      console.warn(error);
    }
  };

  const requestPermissions = async () => {
    try{
      const locationResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: 'SAfE WALK는 사용자의 위치 권한을 요청합니다',
          buttonNegative: '거부',
          buttonPositive: '허용'
        }
      );

      if(locationResult === PermissionsAndroid.RESULTS.GRANTED){
        const notificationResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: '알림 권한 요청',
            message: 'SAfE WALK는 사용자의 알림 권한을 요청합니다',
            buttonNegative: '거부',
            buttonPositive: '허용'
          }
        );

        if(notificationResult === PermissionsAndroid.RESULTS.GRANTED){
          console.log('권한 허용');
        }else{
          console.log('알림 권한 거부');
        }

      }else{
        console.log('위치 권한 거부');
      }
    }catch(error){
      console.warn(error);
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      
      try{
        await checkPermissions();
        SplashScreen.hide();
      }catch(e){
        console.log(e);
      }
    }
    initializeApp();
    
  },[]);

      
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const webview = useRef<WebView>(null);
  const onAndroidBackPress = (): boolean => {
    if (webview.current) {
      webview.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  const handleMessage = (message : Object) => {
    // 메시지 처리, 알림 실행

    var key = Object.values(message)[0];
    var value = Object.values(message)[1];

    // console.log(key);
    // console.log(value);

    if(key === 'NOTIFICATION'){
      if(Platform.OS === 'ios'){
        const tDate = new Date()

        Notifications.postLocalNotification({
          body: `현 위치 등급 : ${value}급`,
          title: "범죄 주의 구간 알림",
          sound: "",
          type: "??",
          payload: "??",
          thread: "??",
          badge: 5,
          // userInfo: { },
          identifier: "??",
        });  
      }else if (Platform.OS === 'android') {
        const tDate = new Date()
        Notifications.postLocalNotification({
          body: `현 위치 등급 : ${value}급`,
          title: "범죄 주의 구간 알림",
          sound: "",
          type: "??",
          payload: "??",
          thread: "??",
          badge: 5,
          // userInfo: { },
          identifier: "??",
        });
      }
    }

  };

  const handleNotification = (notification:any, completion: () => void) => {
    console.log(`Notification opened: ${notification.title}`);
    completion();
  };

  useEffect((): (() => void) => {
    const notificationOpenedListener = Notifications.events().registerNotificationOpened(handleNotification);
  
    // BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return (): void => {
      notificationOpenedListener.remove();
      // BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // 다시 랜더링하지 않음
  
  return (
    <SafeAreaView style={styles.container}>
      <WebView
          style={styles.webview}
          source={{ uri: '[URL]' }}    // [URL] : 배포한 웹 사이트 주소 
          javaScriptEnabled={true}
          onMessage={(event) => handleMessage(JSON.parse(event.nativeEvent.data))}
          ref={webview}
          />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    opacity: 0.99,
    minHeight: 1,
  },
});

export default App;
