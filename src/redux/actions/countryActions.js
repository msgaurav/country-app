import { CREATE_COUNTRY, REMOVE_COUNTRY } from './actionTypes'

export function createCountry(country) {
  return {
    type: CREATE_COUNTRY,
    country,
  }
}

export function removeCountry(id) {
  return {
    type: REMOVE_COUNTRY,
    id,
  }
}
