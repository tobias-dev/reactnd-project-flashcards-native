import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../actions';
import { getDecks as apiGetDecks } from '../utils/api';
import { grey, darkGrey } from '../utils/colors';

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    apiGetDecks().then((decks) => dispatch(getDecks(decks)));
  }

  render() {
    const { deckList, navigation } = this.props;
    return (
      <FlatList
        style={styles.list}
        data={deckList}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          const { title, questions } = item;
          return (
            <TouchableOpacity
              style={styles.deck}
              onPress={() =>
                navigation.navigate('Deck', { title, deckId: title })
              }
            >
              <Text style={styles.header}>{title}</Text>
              <Text style={styles.text}>
                {questions.length} card{questions.length !== 1 && 's'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: grey,
    alignItems: 'center',
    borderRadius: 7,
    margin: 20,
    marginBottom: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  header: {
    fontSize: 23,
    color: darkGrey,
  },
  text: {
    color: darkGrey,
  },
});

function mapStateToProps(decks) {
  return {
    deckList: Object.entries(decks).map(([key, deck]) => deck),
  };
}

export default connect(mapStateToProps)(DeckList);
