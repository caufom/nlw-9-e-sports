import { StatusBar } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { useEffect, useRef } from "react";
import { Subscription } from 'expo-modules-core';
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";
import * as Notification from 'expo-notifications';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notification.addNotificationReceivedListener((Notification) => {

    });

    responseNotificationListener.current = Notification.addNotificationResponseReceivedListener((response) => {

    });

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notification.removeNotificationSubscription(getNotificationListener.current);
        Notification.removeNotificationSubscription(responseNotificationListener.current);
      }
    };
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}