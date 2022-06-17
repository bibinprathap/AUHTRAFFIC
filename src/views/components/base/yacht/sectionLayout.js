import React from 'react'
import { CCardHeader, CCard, CCardBody, CCollapse } from '@coreui/react'
import PropTypes from 'prop-types'

const SectionLayout = ({
  handleToggles,
  collapseStates,
  type,
  cardHeaderText,
  cardBody,
  saveButton,
}) => {
  const isVisible = collapseStates[type]
  return (
    <CCard>
      <CCardHeader className="btn textLeft" onClick={() => handleToggles({ type })}>
        <div className="header-section">
          {cardHeaderText}
          {saveButton}
        </div>
      </CCardHeader>
      <CCollapse visible={isVisible}>
        <CCardBody>{cardBody}</CCardBody>
      </CCollapse>
    </CCard>
  )
}

SectionLayout.propTypes = {
  handleToggles: PropTypes.any,
  collapseStates: PropTypes.any,
  type: PropTypes.any,
  cardHeaderText: PropTypes.any,
  cardBody: PropTypes.any,
  saveButton: PropTypes.any,
}
export default SectionLayout
