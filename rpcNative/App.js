import React from 'react';
import { View } from 'react-native';
import CustomWebView from './CustomWebView';
import LocationWebView from './LocationWebView';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WebView" component={CustomWebView} />
          <Stack.Screen name="LocationWebView" component={LocationWebView} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
