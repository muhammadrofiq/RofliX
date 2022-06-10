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
import MovieList from './Screen/roflix/MovieList/MovieList';
import DetailMovie from './Screen/roflix/Detail/DetailMovie';

const Stack = createStackNavigator();

const initialState = {
  bookmark: [],
  theme: 'dark',
  bigData: {},
  TVBigData: {},
  popularMovieData: [],
  topRateMovieData: {
    data: [],
    page: 0
  },
  popularTVData: {
    data: [],
    page: 0
  },
  watchList: {
    data: [],
  },
  selectedItemId: 0,
  selectedList: 0

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
    case 'UPDATE_SELECTEDITEM':
      const { selectedItemId } = action.payload;
      return { ...state, selectedItemId };
    case 'UPDATE_SELECTEDLIST':
      const { selectedList } = action.payload;
      return { ...state, selectedList };
    case 'UPDATE_POPULARTV':
      const { popularTVData } = action.payload;
      return { ...state, popularTVData };
    case 'UPDATE_WATCHLIST':
      const { watchList } = action.payload;
      return { ...state, watchList };
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
                name="MovieList"
                component={MovieList}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="DetailMovie"
                component={DetailMovie}
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
