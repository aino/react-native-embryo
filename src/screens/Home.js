// @flow

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { autobind } from 'core-decorators'
// $FlowFixMe
import { observer } from 'mobx-react/native'
import Button from '../components/Button'
import config from '../config'
import exception from '../stores/exception'
import { screenIds } from '../constants'

type Props = {
  navigator: Object,
};

const raiseWarning = () => {
  exception.warn(new Error('This is a not so terrible warning!'))
}

const raiseError = () => {
  exception.raise(new Error('Hi! This is a fatal error and it has been reported. You may now reload the app.'), 'Example error')
}

@observer
export default class Home extends React.Component<Props> {
  static navigatorStyle = {
    navBarHidden: true,
  }
  @autobind
  gotoTwo() {
    this.props.navigator.push({
      screen: screenIds.PAGE,
      title: 'An example page',
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to {config.APP_NAME}!</Text>
        <Text style={styles.version}>Version {config.VERSION} build {config.BUILD}</Text>
        <View style={styles.buttons}>
          <View style={styles.button}><Button title="Go to another page" onPress={this.gotoTwo} /></View>
          <View style={styles.button}><Button style={styles.button} title="Raise warning" onPress={raiseWarning} /></View>
          <View style={styles.button}><Button style={styles.button} title="Raise error" color="red" onPress={raiseError} /></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginTop: 100,
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    paddingBottom: 14,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 40,
  },
  buttons: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bbb',
    paddingTop: 32,
  },
})
