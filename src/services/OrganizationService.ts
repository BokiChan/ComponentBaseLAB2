import axios from 'axios'
import type { Organization } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  saveOrganization(organization: Organization) {
    return apiClient.post('/organizers', organization)
  },
}
