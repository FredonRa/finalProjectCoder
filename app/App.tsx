import { StatusBar } from 'expo-status-bar';

import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux'

import { store } from './redux/store';

import GlobalNavigation from './navigation/GlobalNavigation';

import { NavigationContainer } from '@react-navigation/native';

import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <Provider store={store} >
      <ToastProvider>
        <NavigationContainer>
          <GlobalNavigation />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
