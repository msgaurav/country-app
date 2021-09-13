import { combineReducers } from 'redux'
import countryDataReducer from './countryReducer'

const rootReducer = combineReducers({
  countryDataReducer,
})

export default rootReducer
