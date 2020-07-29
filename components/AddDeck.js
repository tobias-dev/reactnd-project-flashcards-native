import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { addDeck as apiAddDeck } from '../utils/api';
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
    const { navigation, dispatch } = this.props;
    const { deckTitle } = this.state;
    const trimmedDeckTitle = deckTitle.trim();

    apiAddDeck(trimmedDeckTitle);
    dispatch(addDeck(trimmedDeckTitle));

    navigation.navigate('Deck', {
      title: trimmedDeckTitle,
      deckId: trimmedDeckTitle,
    });

    this.setState(() => ({
      deckTitle: '',
    }));
  };

  render() {
    const { deckIds } = this.props;
    const { deckTitle } = this.state;
    const buttonDisabled =
      !(deckTitle.length > 0) || deckIds.includes(deckTitle.trim());

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
          <TouchableOpacity
            style={[styles.button, { opacity: buttonDisabled ? 0.5 : 1 }]}
            disabled={buttonDisabled}
            onPress={this.handleSubmit}
          >
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
    opacity: 0.5,
  },
  buttonLabel: {
    fontSize: 20,
  },
});

function mapStateToProps(decks) {
  return {
    deckIds: Object.keys(decks),
  };
}

export default connect(mapStateToProps)(AddDeck);
