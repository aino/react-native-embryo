// @flow

import * as React from 'react'
import { View, Text } from 'react-native'

const page = () => (
  <View style={{ padding: 40 }}>
    <Text style={{ textAlign: 'center' }}>This is another page</Text>
  </View>
)

page.navigatorStyle = {}

export default page