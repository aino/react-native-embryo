// @flow

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props: { onPress: () => void, color?: string, title: string }) => (
  <TouchableOpacity
    accessibilityComponentType="button"
    onPress={props.onPress}
  >
    <View>
      <Text style={[styles.buttonText, { color: props.color }]}>{props.title}</Text>
    </View>
  </TouchableOpacity>
)

Button.defaultProps = {
  color: '#007AFF',
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    padding: 12,
    fontSize: 18,
  },
})

export default Button