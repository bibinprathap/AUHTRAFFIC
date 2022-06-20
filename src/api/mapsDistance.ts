import { request } from './api'
import { API } from '@/api/apiUrls'

export const distancematrix = async (destinations: string, origins: string) => {
  // 'ABU DHABI', 'ABU DHABI'
  const res = await request.get(API.mapDistance(destinations, origins))
  const data = await res.data
  return {
    data,
  }
}
