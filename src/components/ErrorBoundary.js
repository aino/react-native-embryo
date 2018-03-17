// @flow

import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { autobind } from 'core-decorators'
import RNRestart from 'react-native-restart'
// $FlowFixMe
import { observer } from 'mobx-react/native'
import Button from '../components/Button'
import config from '../config'
import exception from '../stores/exception'

// Styles and logic for UI error handling
// Also catches internal react errors and passes it as exception

type Props = {
  children?: React.Node,
};

type State = {
  width: number,
  height: number,
};

@observer
export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0,
  }
  componentDidCatch(err: Error, context: string) { // eslint-disable-line class-methods-use-this
    exception.raise(err, context)
  }
  @autobind
  onLayout(e: Object) {
    const { width, height } = e.nativeEvent.layout
    this.setState({
      width: width,
      height: height,
    })
  }
  render() {
    const { width, height } = this.state
    const backdropStyles = [styles.backdrop, { width: width, height: height }]
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        <ScrollView>{this.props.children}</ScrollView>
        {config.DEVELOPMENT && exception.warnings.length ? (
          <View style={{ height: exception.warnings.length * 45 }}>
            {exception.warnings.map((warning: *, index: number) => (
              <TouchableOpacity
                key={warning.timestamp}
                style={styles.devWarning}
                onPress={() => { exception.dismissWarning(index) }}
              >
                <Text style={styles.devWarningText}>
                  <Text style={{ fontWeight: 'bold' }}>Warning: </Text>
                  {warning.error.message}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!(config.PRODUCTION && exception.lastWarning)}
        >
          <TouchableWithoutFeedback onPress={exception.resetWarnings}>
            <View style={backdropStyles} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={[styles.title, { color: 'orange' }]}>Warning</Text>
                <Text style={styles.content}>{exception.lastWarning ? exception.lastWarning.error.message : ''}</Text>
              </View>
              <Button title="OK" onPress={exception.resetWarnings} />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={!!(config.PRODUCTION && exception.error)}
        >
          <View style={backdropStyles} />
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={[styles.title, { color: 'red' }]}>Error</Text>
                <Text style={styles.content}>{exception.error ? exception.error.error.message : ''}</Text>
              </View>
              <Button title="Restart App" color="red" onPress={() => { RNRestart.Restart() }} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
    marginBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    textAlign: 'center',
  },
  devWarning: {
    height: 44,
    marginTop: 1,
    backgroundColor: '#f1d563',
    justifyContent: 'center',
    flex: 1,
  },
  devWarningText: {
    opacity: 0.8,
    fontSize: 14,
    paddingHorizontal: 20,
  },
})