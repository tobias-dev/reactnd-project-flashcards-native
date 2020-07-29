import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { grey, darkGrey, red, green } from '../utils/colors';

const QUIZ_COMPLETED = -1;

class Quiz extends Component {
  state = {
    cardNumber: 1,
    correctAnswerCount: 0,
    showAnswer: false,
    bounceValue: new Animated.Value(1),
  };

  handleTurnCard = () => {
    this.setState(
      (state) => ({
        showAnswer: !state.showAnswer,
      }),
      () => {
        const { bounceValue } = this.state;
        Animated.sequence([
          Animated.timing(bounceValue, {
            duration: 200,
            toValue: 1.13,
            useNativeDriver: true,
          }),
          Animated.spring(bounceValue, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
        ]).start();
      }
    );
  };

  handleNextCard = (hasAnsweredCorrectly) => () => {
    const { cardNumber, correctAnswerCount } = this.state;
    const { questions } = this.props;
    const newCardNumber =
      cardNumber < questions.length ? cardNumber + 1 : QUIZ_COMPLETED;
    const newCorrectAnswerCount = hasAnsweredCorrectly
      ? correctAnswerCount + 1
      : correctAnswerCount;

    this.setState(() => ({
      cardNumber: newCardNumber,
      correctAnswerCount: newCorrectAnswerCount,
      showAnswer: false,
    }));
  };

  handleRestart = () => {
    this.setState(() => ({
      cardNumber: 1,
      correctAnswerCount: 0,
      showAnswer: false,
    }));
  };

  render() {
    const {
      cardNumber,
      showAnswer,
      bounceValue,
      correctAnswerCount,
    } = this.state;
    const { questions, route, navigation } = this.props;
    const { deckId } = route.params;

    if (cardNumber === QUIZ_COMPLETED) {
      return (
        <View style={styles.container} behavior="padding">
          <View style={styles.headerContainer}>
            <Text style={[styles.header]}>
              You have answered {correctAnswerCount} questions out of{' '}
              {questions.length} correctly!
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                navigation.navigate('Deck', { title: deckId, deckId })
              }
            >
              <Text style={styles.buttonLabel}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={this.handleRestart}
            >
              <Text style={styles.buttonLabel}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const { question, answer } = questions[cardNumber - 1];

    return (
      <View style={styles.container} behavior="padding">
        <View style={styles.progressContainer}>
          <Text>
            {cardNumber} / {questions.length}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Animated.Text
            style={[styles.header, { transform: [{ scale: bounceValue }] }]}
          >
            {showAnswer ? answer : question}
          </Animated.Text>
        </View>
        <TouchableOpacity
          style={styles.textButton}
          onPress={this.handleTurnCard}
        >
          <Text style={[styles.textButtonLabel]}>
            Show {showAnswer ? 'Question' : 'Answer'}
          </Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: green }]}
            onPress={this.handleNextCard(true)}
          >
            <Text style={styles.buttonLabel}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: red }]}
            onPress={this.handleNextCard(false)}
          >
            <Text style={styles.buttonLabel}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'stretch',
  },
  progressContainer: {
    padding: 0,
  },
  headerContainer: {
    alignItems: 'center',
    margin: 40,
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  contentContainer: {
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    color: darkGrey,
    textAlign: 'center',
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
  textButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    borderColor: darkGrey,
    margin: 10,
    marginBottom: 0,
  },
  textButtonLabel: {
    color: darkGrey,
    fontSize: 18,
  },
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    questions: decks[deckId].questions,
  };
}

export default connect(mapStateToProps)(Quiz);
