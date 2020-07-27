import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { darkGrey, lightGrey, white } from '../utils/colors';

const AddDeck = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>What is the title of your new deck?</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonLabel}>Create Deck</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: white,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    //color: darkGrey,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputText: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: darkGrey,
    borderRadius: 5,
    margin: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: darkGrey,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 7,
  },
  buttonLabel: {
    fontSize: 22,
    textAlign: 'center',
    color: lightGrey,
  },
});

export default AddDeck;
