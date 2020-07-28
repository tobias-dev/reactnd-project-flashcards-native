import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { darkGrey } from '../utils/colors';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import Deck from './Deck';
import AddCard from './AddCard';
import Quiz from './Quiz';

const Tab = createBottomTabNavigator();
const DeckListStack = createStackNavigator();

const DeckListStackScreen = () => {
  return (
    <DeckListStack.Navigator>
      <DeckListStack.Screen
        name="DeckList"
        component={DeckList}
        options={{ headerShown: false, title: 'Decks' }}
      />
      <DeckListStack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({ title: route.params.title })}
      />
      <DeckListStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ title: 'Add Card' }}
      />
      <DeckListStack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => ({ title: route.params.title })}
      />
    </DeckListStack.Navigator>
  );
};

export default App = () => {
  return (
    <NavigationContainer>
      <View style={styles.statusBar}>
        <StatusBar />
      </View>
      <Tab.Navigator
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
        <Tab.Screen name="Decks" component={DeckListStackScreen} />
        <Tab.Screen name="Create" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: darkGrey,
  },
});
