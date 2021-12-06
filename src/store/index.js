import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import {debug} from '@/config'

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    user
  }
})
