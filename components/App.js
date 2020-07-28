import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDeckStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { darkGrey } from '../utils/colors';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import Deck from './Deck';
import AddCard from './AddCard';
import Quiz from './Quiz';

const TabNav = createBottomTabNavigator();
const DeckStackNav = createDeckStackNavigator();

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
      <DeckStackNav.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({ title: route.params.title })}
      />
    </DeckStackNav.Navigator>
  );
};

export default App = () => {
  return (
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
          activeTintColor: darkGrey,
        }}
      >
        <Tab.Screen name="Decks" component={DeckStackScreen} />
        <Tab.Screen name="Create" component={AddDeck} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: darkGrey,
  },
});
