import { GET_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions/index';

function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deckId]: {
          title: action.deckId,
          questions: [],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            { question: action.question, answer: action.answer },
          ],
        },
      };
    case REMOVE_DECK:
      const decks = { ...state };
      delete decks[action.deckId];
      return decks;
    default:
      return state;
  }
}

export default decks;
