/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import Base from './Screen/Base/Base';
import Home from './Screen/Home/Home';
import DetailBrew from './Screen/Home/Detail/DetailBrew';
import AppSplash from './Screen/roflix/AppSplash';
import MovieHome from './Screen/roflix/Home/MovieHome';

const Stack = createStackNavigator();

const initialState = {
  bookmark: [],
  theme: 'dark',
  bigData: {},
  popularMovieData: [],
  topRateMovieData: [],

}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_BOOKMARK':
      const { bookmark } = action.payload;
      return { ...state, bookmark };
    case 'UPDATE_BIGDATA':
      const { bigData } = action.payload;
      return { ...state, bigData };
    case 'UPDATE_POPULARMOVIE':
      const { popularMovieData } = action.payload;
      return { ...state, popularMovieData };
    case 'UPDATE_TOPRATEMOVIE':
      const { topRateMovieData } = action.payload;
      return { ...state, topRateMovieData };
    default:
      return state;
  }
}
const store = createStore(rootReducer);

export default class App extends React.Component {

  render() {

    return (
      // <Root>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              }}
            >
              <Stack.Screen
                name="AppSplash"
                component={AppSplash}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="MovieHome"
                component={MovieHome}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="DetailBrew"
                component={DetailBrew}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
      // </Root>
    )
  }
}
