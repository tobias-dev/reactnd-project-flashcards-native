import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import { grey, darkGrey, red, green } from '../utils/colors';

class Quiz extends Component {
  state = {
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

  render() {
    const { showAnswer, bounceValue } = this.state;

    return (
      <View style={styles.container} behavior="padding">
        <View style={styles.progressContainer}>
          <Text>1 / 2</Text>
        </View>
        <View style={styles.headerContainer}>
          <Animated.Text
            style={[styles.header, { transform: [{ scale: bounceValue }] }]}
          >
            {showAnswer ? 'My Answer' : 'What is the title of your new deck?'}
          </Animated.Text>
        </View>
        <TouchableOpacity
          style={styles.textButton}
          onPress={this.handleTurnCard}
        >
          <Text style={[styles.textButtonLabel]}>
            {showAnswer ? 'Question' : 'Answer'}
          </Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: green }]}>
            <Text style={styles.buttonLabel}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: red }]}>
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

export default Quiz;
