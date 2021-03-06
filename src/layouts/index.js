import React from 'react'
import PropTypes from 'prop-types'

export default function Layout({ children }) {
  return (
    <>
      {/* <div>Header</div> */}
      {children}
      {/* <div>Footer</div> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.node), PropTypes.node],
  ).isRequired,
}
