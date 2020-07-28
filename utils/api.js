import AsyncStorage from '@react-native-community/async-storage';
import dummyData from './_DATA';

const DECKS_STORAGE_KEY = 'Flashcards:decks';

function initDecks() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    return decks === null ? initDecks() : JSON.parse(decks);
  });
}

export function addDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        ...(JSON.parse(decks) || []),
        [deckId]: {
          title: deckId,
          questions: [],
        },
      })
    );
  });
}

export function addCard(question, answer, deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    const decksObj = JSON.parse(decks);
    const deckObj = decksObj[deckId];
    AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        ...decksObj,
        [deckId]: {
          ...deckObj,
          questions: [...deckObj.questions, { question, answer }],
        },
      })
    );
  });
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
    const decksObj = JSON.parse(decks);
    delete decksObj[deckId];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksObj));
  });
}
