// @flow

import Config from 'react-native-config'
import pkg from '../package.json'
import { envs } from './constants'

const env = Config.ENV
const [version, build] = pkg.version.split('+')

// $FlowFixMe
const config = Object.assign({}, {

  // Environments
  DEVELOPMENT: env === envs.DEVELOPMENT,
  PRODUCTION: env === envs.PRODUCTION,

  // inherited from package.json
  APP_NAME: pkg.name,
  VERSION: version,
  BUILD: build,

})

export default config
