// @flow

import { Alert } from 'react-native'
import { observable, action, computed } from 'mobx'
import isEqual from 'lodash.isequal'
import RNRestart from 'react-native-restart'
import config from '../config'

type errorType = {|
  context: string,
  error: Error,
  timestamp: number,
|};

const MAX_WARNINGS = 10

class Exception {
  @observable error: errorType | null = null
  @observable warnings: Array<errorType> = []
  todos: Array<string> = []

  consoleError: (*) => void = console.error // eslint-disable-line no-console

  constructor() {
    /*
     * console settings to allow custom errors
     * In dev, all error levels will be printed in the console
     * ErrorBoundary handles the UI for dev and prod
     */
    /* eslint-disable no-console */
    // $FlowFixMe
    console.disableYellowBox = true
    if (config.DEVELOPMENT) {
      // This will still allow console.error in the console, but no red screen will be shown
      // $FlowFixMe
      console.error = (...errors: Array<*>) => {
        // $FlowFixMe
        console.reportErrorsAsExceptions = false
        this.consoleError.apply(console, errors)
        // $FlowFixMe
        console.reportErrorsAsExceptions = true
      }
    } else {
      // $FlowFixMe
      console.reportErrorsAsExceptions = false;
      ['log', 'error', 'warn', 'info'].forEach((logType: string) => {
        // $FlowFixMe
        console[logType] = () => {}
      })
    }
    /* eslint-enable no-console */
    ErrorUtils.setGlobalHandler(this.raiseAppError)
  }

  @action.bound
  raiseAppError(err: Error) {
    this.consoleError(err)
    if (this.error) {
      return
    }
    if (config.PRODUCTION) {
      // Global exceptions can prevent further rendering, so we need to show an alert instead
      Alert.alert(
        'Application Error',
        'We are very sorry about this and our dev team has been notified. Please restart and try again.',
        [
          { text: 'Restart App', onPress: () => { RNRestart.Restart() } },
        ],
        { cancelable: false }
      )
    }
    this.reportError(err, 'error', 'Application error')
  }

  @action.bound
  raise(err: Error, context?: string = '') {
    if (this.error && isEqual(this.error.error, err)) {
      return
    }
    this.reportError(err, 'error', context)
    if (config.DEVELOPMENT) {
      if (context) {
        console.log(`%cError: ${context}`, 'font-weight:bold;color:red') // eslint-disable-line no-console
      }
      this.consoleError(err)
    } else {
      this.error = {
        error: err,
        context: context,
        timestamp: Date.now(),
      }
    }
  }

  @action.bound
  warn(err: Error, context?: string = '') {
    // $FlowFixMe
    const throttled: boolean = this.lastWarning ? Date.now() - this.lastWarning.timestamp < 400 : false
    if (this.error || (this.lastWarning && isEqual(this.lastWarning.error, err) && (config.PRODUCTION || throttled))) {
      return
    }
    const warning: errorType = {
      error: err,
      context: context,
      timestamp: Date.now(),
    }
    this.warnings.push(warning)
    if (this.warnings.length > MAX_WARNINGS) {
      this.warnings.splice(0, this.warnings.length - MAX_WARNINGS)
    }
    this.reportError(err, 'warning', context)
    if (config.DEVELOPMENT) {
      console.warn(context, err) // eslint-disable-line no-console
    }
  }

  @action.bound
  info(err: Error, context?: string = '') { // eslint-disable-line class-methods-use-this
    this.reportError(err, 'info', context)
    if (config.DEVELOPMENT) {
      console.info(context, err) // eslint-disable-line no-console
    }
  }

  @action.bound
  todo(task: string) { // eslint-disable-line class-methods-use-this
    console.log(`%cTODO: ${task}`, 'color:blue;') // eslint-disable-line no-console
    if (!this.todos.includes(task)) {
      this.todos.push(task)
    }
  }

  @computed
  get lastWarning(): errorType | null {
    return this.warnings.length ? this.warnings[this.warnings.length - 1] : null
  }

  @action.bound
  dismissWarning(index: number) {
    this.warnings.splice(index, 1)
  }

  @action.bound
  resetWarnings() {
    this.warnings.splice(0, this.warnings.length)
  }

  reportError(err: Error, severity: string, context: *) { // eslint-disable-line no-unused-vars
    this.todo('add custom error reporting')
  }
}

export default new Exception()