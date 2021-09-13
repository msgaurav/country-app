/* eslint-disable no-alert */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

import * as countryActions from '../../redux/actions/countryActions'
import styles from './ListCountry.module.scss'

const ListCountry = (props) => {
  const { countryData, createCountry, removeCountry } = props

  const [query, setQuery] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [countryName, setCountryName] = useState('')
  const [countryRank, setCountryRank] = useState('')
  const [continentVal, setContinentVal] = useState('Asia')
  const [flagImg, setFlagImg] = useState('')

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

  const handleImg = (e) => {
    const imgObj = e.target.files[0]
    const maxSize = 1024 * 4 // 4 MB
    const imgSize = imgObj.size / 1024

    if (imgSize > maxSize) {
      alert('Maximum file size exceed, Please upload image max 4 MB')
    } else {
      const flagImgUrl = URL.createObjectURL(imgObj)
      setFlagImg(flagImgUrl)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCountryName('')
    setIsModal(false)
    setCountryRank('')

    createCountry({
      name     : countryName,
      continent: continentVal,
      flag     : flagImg,
      rank     : countryRank,
      id       : `${countryName}-${countryRank}`,
    })
  }

  const handleRemover = (e) => {
    removeCountry(e.target.id)
  }

  // Display queried country
  let showingCountryData
  if (query) {
    const patt = new RegExp(query, 'i')
    showingCountryData = countryData.filter((e) => patt.test(e.name))
  } else {
    showingCountryData = countryData
  }

  return (
    <div className={styles.ListCountry_wrapper}>

      <div className={styles.searchInput_Container}>
        <SearchIcon className={styles.search_icon} />

        <input
          className={styles.inputSearch_country}
          type="text"
          placeholder="Search Country"
          value={query}
          onChange={handleQuery}
        />

        <div className={styles.icon_container}>
          {query ? (
            <CancelIcon
              className={styles.cancel_icon}
              onClick={() => setQuery('')}
            />
          ) : (
            <>
              <AddCircleIcon
                className={styles.add_icon}
                onClick={() => setIsModal(true)}
              />

              {isModal && (
                <div className={styles.addFlag_modal_container}>
                  <div className={styles.addFlag_modal_content}>

                    <CloseIcon
                      className={styles.closeModal_icon}
                      onClick={() => setIsModal(false)}
                    />

                    <h2>Fill Your Country Data</h2>
                    <form
                      onSubmit={handleSubmit}
                      className={styles.inputForm_Container}
                    >
                      <input
                        type="text"
                        placeholder="country name"
                        minLength="3"
                        maxLength="20"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        required
                      />

                      <input
                        type="number"
                        placeholder="country rank"
                        value={countryRank}
                        onChange={(e) => setCountryRank(
                          Number(e.target.value),
                        )}
                        required
                      />

                      <select
                        value={continentVal}
                        onChange={(e) => setContinentVal(e.target.value)}
                      >
                        <option value="asia">Asia</option>
                        <option value="oceania">Oceania</option>
                        <option value="europe">Europe</option>
                        <option value="africa">Africa</option>
                      </select>

                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImg}
                        required
                      />

                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ul className={styles.countryList_container}>
        {showingCountryData.map((element) => (
          <li
            key={element.id}
            className={styles.countryList_item}
          >
            <div className={styles.countryList_flag}>
              <img alt={element.name} src={element.flag} />
            </div>

            <div className={styles.countryList_details}>
              <p>{`Country: ${element.name}`}</p>
              <p>{`Rank: ${element.rank}`}</p>
              <p>{`Continent: ${element.continent}`}</p>
            </div>

            <div className={styles.removeCountyList_icon}>
              <button
                type="button"
                id={element.id}
                title="Delete"
                onClick={handleRemover}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    countryData: state.countryDataReducer,
  }
}

const mapDispatchToProps = {
  createCountry: countryActions.createCountry,
  removeCountry: countryActions.removeCountry,
}

ListCountry.propTypes = {
  countryData: PropTypes.arrayOf(
    PropTypes.shape({
      name     : PropTypes.string,
      continent: PropTypes.string,
      flag     : PropTypes.string,
      rank     : PropTypes.number,
    }),
  ).isRequired,
  createCountry: PropTypes.func.isRequired,
  removeCountry: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListCountry)
