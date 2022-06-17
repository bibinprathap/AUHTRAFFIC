import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import gql from 'graphql-tag'
import { stateToHTML } from 'draft-js-export-html'
import { useQuery } from '@apollo/react-hooks'
import CreateBooking from './newbooking'
import EditBooking from './editbooking'
import { updateBooking } from 'src/apiActions/booking'
import { format } from 'date-fns'
const dateFormat = 'MMM d, yyyy'
export const BOOKING_QUERY = gql`
  {
    yachtMany {
      booking {
        userid
        username
        avathar
        message
        yatchpoints
        bookingdate
        fromdate
        todate
        emptylegs
        _id
        status
        statusComment
      }
      name
    }
  }
`

const Tables = () => {
  const editorRef = React.useRef(null)
  const [visible, setVisible] = useState(false)
  const [editorData, updateEditor] = useState(() => EditorState.createEmpty())
  const [formState, setFormState] = useState({
    new: false,
    edit: false,
    id: null,
  });
  const [actionState, updateAction] = useState(null)

  const [yatchTypedata, setYachtTypedata] = useState([])
  const { loading, error, data, refetch } = useQuery(BOOKING_QUERY)

  const reloaddata = useCallback(() => {
    setFormState({
      new: false,
      edit: false,
      id: null,
    })
  }, [])

  const handleBookingUpdate = async () => {
    const htmlData = stateToHTML(editorData.getCurrentContent())
    const { id, action } = actionState
    const body = {
      status: action === 'Reject' ? 'rejected' : 'accepted',
      statusComment: htmlData,
    }
    try {
      const result = await updateBooking(id, body)
      refetch()
    } catch (error) {
      //console.log( 'error >>>', error)
    }
    updateAction(false)
  }

  const handleAction = ({ id, action }) => {
    updateAction({ id, action })
  }

  const handleEditorChange = (state) => updateEditor(state)

  const modalTitle = actionState ? `${actionState.action} Bookings` : ''

  const formatDate = (date) => {
    return format(new Date(date), dateFormat)
  }

  if (loading) return <CSpinner />
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <CModal fullscreen={true} visible={!!actionState} onDismiss={() => updateAction(false)}>
        <CModalHeader onDismiss={() => updateAction(false)}>
          <CModalTitle>{modalTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Editor
            ref={editorRef}
            placeholder="Enter Custom Message"
            editorState={editorData}
            onEditorStateChange={handleEditorChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => updateAction(false)}>
            Cancel Action
          </CButton>
          <CButton onClick={handleBookingUpdate} color="primary">
            Send Mail
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        {formState.new ? (
          <CCol xs={12}>
            <CRow className="justify-content-md-between">
              <CCol>
                <CreateBooking onCreate={reloaddata}></CreateBooking>
              </CCol>
            </CRow>
          </CCol>
        ) : null}
        {formState.edit ? (
          <CCol xs={12}>
            <CRow className="justify-content-md-between">
              <CCol>
                <EditBooking yachtId={formState.id} onCreate={reloaddata}></EditBooking>
              </CCol>
            </CRow>
          </CCol>
        ) : null}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className="justify-content-md-between">
                <CCol sm="auto">
                  <strong>Exchanges</strong>
                </CCol>
                <CCol sm="auto">
                  <CButton
                    onClick={() => {
                      setFormState({
                        new: !formState.new,
                        edit: false,
                      })
                    }}
                  >
                    {formState.new ? 'Close' : 'Add'}
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">Exchanges List</p>

              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">YachtName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Booking Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">To Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Accept</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.yachtMany.map((yatchtype, index) => {
                    return (
                      <>
                        {yatchtype.booking.map((yatchbooking, sIndex) => {
                          return (
                            <CTableRow key={sIndex + 1}>
                              <CTableHeaderCell scope="row">{sIndex + 1}</CTableHeaderCell>
                              <CTableDataCell>{yatchtype.name}</CTableDataCell>
                              <CTableDataCell>{yatchbooking.username}</CTableDataCell>
                              <CTableDataCell>{yatchbooking.bookingdate}</CTableDataCell>
                              <CTableDataCell>{formatDate(yatchbooking.fromdate)}</CTableDataCell>
                              <CTableDataCell>{formatDate(yatchbooking.todate)}</CTableDataCell>
                              <CTableDataCell>{yatchbooking.status}</CTableDataCell>
                              <CTableDataCell>
                                {' '}
                                <CButton
                                  disabled={yatchbooking.status === 'accepted'}
                                  onClick={() =>
                                    handleAction({
                                      id: yatchbooking._id,
                                      action: 'Accept',
                                    })
                                  }
                                >
                                  {yatchbooking.status === 'accepted' ? 'Accepted' : 'Accept'}
                                </CButton>
                              </CTableDataCell>
                              <CTableDataCell>
                                {' '}
                                <CButton
                                  disabled={yatchbooking.status === 'rejected'}
                                  onClick={() =>
                                    handleAction({
                                      id: yatchbooking._id,
                                      action: 'Reject',
                                    })
                                  }
                                >
                                  {yatchbooking.status === 'rejected' ? 'Rejected' : 'Reject'}
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })}
                      </>
                    )
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Tables
