import CallAPi from 'src/Utils/axios';
import apiUrls from 'src/Utils/apiUrls';

export const updateBooking = (id, body) => {
  return CallAPi.post(`${apiUrls.updateBooking}/${id}`, body)
}
export const deleteYatch = (body) => {
  return CallAPi.post(`${apiUrls.deleteYatch}`, body)
}
