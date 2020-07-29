import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';
import { removeDeck as apiRemoveDeck } from '../utils/api';
import { grey, darkGrey, lightGrey } from '../utils/colors';

const Deck = ({ deck, navigation, dispatch }) => {
  if (typeof deck === 'undefined') {
    return <View></View>;
  }

  const { title, questions } = deck;
  const quizDisabled = questions.length < 1;

  const handleDeleteDeck = () => {
    apiRemoveDeck(title);
    dispatch(removeDeck(title));
    navigation.navigate('DeckList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.text}>
          {questions.length} card{questions.length !== 1 && 's'}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCard', { deckId: title })}
        >
          <Text style={[styles.text, styles.buttonLabel]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, , { opacity: quizDisabled ? 0.5 : 1 }]}
          disabled={quizDisabled}
          onPress={() => navigation.navigate('Quiz', { deckId: title })}
        >
          <Text style={[styles.text, styles.buttonLabel]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton} onPress={handleDeleteDeck}>
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

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Deck);
