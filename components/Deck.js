import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { grey, darkGrey, lightGrey } from '../utils/colors';

const Deck = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Title</Text>
        <Text style={styles.text}>10 cards</Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCard')}
        >
          <Text style={[styles.text, styles.buttonLabel]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Quiz', { title: 'My Title' })}
        >
          <Text style={[styles.text, styles.buttonLabel]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton}>
          <Text style={[styles.text, styles.textButtonLabel]}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'stretch',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  contentContainer: {
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    color: darkGrey,
  },
  button: {
    padding: 20,
    backgroundColor: grey,
    alignItems: 'center',
    borderRadius: 7,
    margin: 20,
    marginBottom: 0,
  },
  textButton: {
    padding: 20,
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
  },
  buttonLabel: {
    fontSize: 20,
  },
  text: {
    color: darkGrey,
  },
  textButtonLabel: {
    color: lightGrey,
    fontSize: 18,
  },
});

export default Deck;
