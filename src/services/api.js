import axios from 'axios'
import config from '../config'

const apiClient = axios.create({
  baseURL: config.API.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': config.API.AUTH_TOKEN
  },
  timeout: config.API.TIMEOUT
})

// Error handler helper
const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || 'خطا در برقراری ارتباط با سرور';
  console.error('API Error:', error);
  throw new Error(errorMessage);
}

export const getAddresses = async () => {
  try {
    const response = await apiClient.get('')
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const addAddress = async (addressData) => {
  try {
    // Ensure region is set to 1 for test as specified
    const data = {
      ...addressData,
      region: 1
    }
    
    const response = await apiClient.post('', data)
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}