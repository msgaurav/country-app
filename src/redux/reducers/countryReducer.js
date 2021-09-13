import { CREATE_COUNTRY, REMOVE_COUNTRY } from '../actions/actionTypes'
import data from '../../../public/data'

const initalState = data.countries.map((element) => ({
  ...element,
  id: `${element.name}-${element.rank}`,
})).sort((a, b) => (a.rank) - (b.rank))

export default function countryReducer(state = initalState, action) {
  switch (action.type) {
  case CREATE_COUNTRY:
    return [...state, { ...action.country }]

  case REMOVE_COUNTRY:
    return state.filter((e) => e.id !== action.id)

  default:
    return state
  }
}
