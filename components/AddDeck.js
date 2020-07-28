import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { grey, darkGrey } from '../utils/colors';

class AddDeck extends Component {
  state = {
    deckTitle: '',
  };

  handleTextChange = (text) => {
    this.setState(() => ({
      deckTitle: text,
    }));
  };

  handleSubmit = () => {
    // @todo
    const { navigation } = this.props;
    navigation.navigate('Decks');
    this.setState(() => ({
      deckTitle: '',
    }));
  };

  render() {
    const { deckTitle } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.headerContainer}>
          <Text style={styles.header}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.inputText}
            value={deckTitle}
            onChangeText={this.handleTextChange}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonLabel}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    fontSize: 22,
    color: darkGrey,
  },
  inputText: {
    padding: 8,
    borderWidth: 1,
    borderColor: grey,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    padding: 20,
    backgroundColor: grey,
    alignItems: 'center',
    borderRadius: 7,
    margin: 20,
    marginBottom: 0,
  },
  buttonLabel: {
    fontSize: 20,
  },
});

export default AddDeck;
