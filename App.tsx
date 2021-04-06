import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import CarProvider from './src/context/CarContext';

import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <CarProvider>
      <StatusBar backgroundColor="#efefef" barStyle="dark-content" />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </CarProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
});
