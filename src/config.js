// @flow

import env from '../env'
import pkg from '../package.json'
import { envs } from './constants'

const [version, build] = pkg.version.split('+')

// $FlowFixMe
const config = Object.assign({}, {

  // Environments
  DEV: env === envs.DEV, 
  PROD: env === envs.PROD,

  // inherited from package.json
  APP_NAME: pkg.name,
  VERSION: version,
  BUILD: build,
  
})

export default config