import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import reducer from '../reducers';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import Deck from './Deck';
import AddCard from './AddCard';
import Quiz from './Quiz';

const TabNav = createBottomTabNavigator();
const DeckStackNav = createStackNavigator();

const DeckStackScreen = () => {
  return (
    <DeckStackNav.Navigator>
      <DeckStackNav.Screen
        name="DeckList"
        component={DeckList}
        options={{ headerShown: false, title: 'Decks' }}
      />
      <DeckStackNav.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({ title: route.params.title })}
      />
      <DeckStackNav.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: 'Add Card' }}
      />
      <DeckStackNav.Screen name="Quiz" component={Quiz} />
    </DeckStackNav.Navigator>
  );
};

class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={styles.statusBar}>
            <StatusBar />
          </View>
          <TabNav.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                return route.name === 'Decks' ? (
                  <FontAwesome5 name="layer-group" size={20} color={color} />
                ) : (
                  <FontAwesome name="plus-square" size={20} color={color} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
            }}
          >
            <TabNav.Screen name="Decks" component={DeckStackScreen} />
            <TabNav.Screen name="Create" component={AddDeck} />
          </TabNav.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: 'tomato',
  },
});
