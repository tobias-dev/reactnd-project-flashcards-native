import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { grey, darkGrey } from '../utils/colors';

const DeckList = ({ navigation }) => {
  const deckList = [
    {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  ];

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
            onPress={() => navigation.navigate('Deck', { title })}
          >
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.text}>
              {questions.length} card{questions.length > 1 && 's'}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

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

export default DeckList;
