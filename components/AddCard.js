import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCard as apiAddCard } from '../utils/api';
import { grey, darkGrey } from '../utils/colors';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleTextChange = (field) => (text) => {
    this.setState(() => ({
      [field]: text,
    }));
  };

  handleSubmit = () => {
    const { route, navigation, dispatch } = this.props;
    const { deckId } = route.params;
    const { question, answer } = this.state;
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    apiAddCard(trimmedQuestion, trimmedAnswer, deckId);
    dispatch(addCard(trimmedQuestion, trimmedAnswer, deckId));
    navigation.goBack();

    this.setState(() => ({
      question: '',
      answer: '',
    }));
  };

  render() {
    const { questions } = this.props;
    const { question, answer } = this.state;
    const buttonDisabled =
      !(question.length > 0 && answer.length > 0) ||
      questions.includes(question.trim());

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.text}>Question</Text>
        <TextInput
          style={styles.inputText}
          value={question}
          onChangeText={this.handleTextChange('question')}
        />
        <Text style={styles.text}>Answer</Text>
        <TextInput
          style={styles.inputText}
          value={answer}
          onChangeText={this.handleTextChange('answer')}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: buttonDisabled ? 0.5 : 1 }]}
          disabled={buttonDisabled}
          onPress={this.handleSubmit}
        >
          <Text style={[styles.text, styles.buttonLabel]}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  text: {
    fontSize: 18,
    color: darkGrey,
  },
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    questions: decks[deckId].questions.map((q) => q.question),
  };
}

export default connect(mapStateToProps)(AddCard);
