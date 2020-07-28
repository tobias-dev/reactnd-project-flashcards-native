export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_DECK = 'REMOVE_DECK';

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function addDeck(deckId) {
  return {
    type: ADD_DECK,
    deckId,
  };
}

export function addCard(question, answer, deckId) {
  return {
    type: ADD_CARD,
    question,
    answer,
    deckId,
  };
}
export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  };
}
