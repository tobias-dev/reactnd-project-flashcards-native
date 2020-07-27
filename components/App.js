import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import { darkGrey } from '../utils/colors';

const Tab = createBottomTabNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <View style={styles.statusBar}>
        <StatusBar />
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return route.name === 'Decks' ? (
              <FontAwesome5 name="layer-group" size={size} color={color} />
            ) : (
              <FontAwesome name="plus-square" size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: darkGrey,
        }}
      >
        <Tab.Screen name="Decks" component={DeckList} />
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
