import React, { useCallback } from 'react'
import { CFormLabel, CRow } from '@coreui/react';
import PropTypes from 'prop-types'

import axios from 'axios';
import constant from '../../../constant'

export default function FileUploaderInput({
  updateLoader, setResponseUrl, Label, isMultiple = false,required
}) {
  const handleFileChange = useCallback(
    async (e) => {
      e.preventDefault()
      const { files } = e.target;
      const fileArray = Object.values(files);
      try {

        if (updateLoader) updateLoader(true)
        const allActions = fileArray.map((fileData) => {
          const formData = new FormData()
          formData.append('profileImg', fileData)
          return axios.post(`${constant.apiurl}/api/upload/uploadFile`, formData)
        })
        const result = await Promise.all(allActions);
        const urls = [];
        //console.log( "result >>", result);
        result.forEach(({ data }) => urls.push(data.fileurl))
        setResponseUrl(urls)

      }
      catch (ex) {
        if (updateLoader) updateLoader(false)
        //console.log( ex)
      }
    },
    [],
  );

  return (
    <div>
      <CFormLabel htmlFor={"Destination Picture"}>{Label}</CFormLabel>
      <input
        multiple={isMultiple}
        type="file" className="form-control bg-light" onChange={handleFileChange} id="customFile" required={required} />
    </div>
  )
}


FileUploaderInput.propTypes = {
  updateLoader: PropTypes.func,
  setResponseUrl: PropTypes.func,
  Label: PropTypes.string,
  isMultiple: PropTypes.bool,
  value: PropTypes.any,
  required: PropTypes.bool
}
