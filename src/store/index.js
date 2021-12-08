import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'

import {debug} from '@/config'

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    user,
    app
  },
  getters
})
