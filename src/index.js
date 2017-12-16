// @flow

import * as React from 'react'
import { View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import ErrorBoundary from './components/ErrorBoundary'
import screens from './screens'
import { screenIds, animationTypes } from './constants'

type navigationProps = {
  navigator: Object,
};

Object.keys(screens).forEach((id: string) => {
  const Screen = screens[id]
  const Wrapper = (props: navigationProps) => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ErrorBoundary>
        <Screen navigator={props.navigator} />
      </ErrorBoundary>
    </View>
  )
  Wrapper.navigatorStyle = Object.assign({}, Screen.navigatorStyle)
  Navigation.registerComponent(id, () => Wrapper)
})

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: screenIds.HOME,
    },
    animationType: animationTypes.FADE,
  })
}

// start the app
startApp()

export default startApp