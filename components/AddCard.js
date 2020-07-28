import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
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
    // @todo
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;
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
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
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

export default AddCard;
