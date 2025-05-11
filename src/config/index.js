export default {
    API: {
      BASE_URL: 'https://stage.achareh.ir/api/karfarmas/address',
      TIMEOUT: 10000,
      AUTH_TOKEN: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
    },
    MAPS: {
      API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
      DEFAULT_CENTER: {
        lat: 35.7717503,
        lng: 51.3365315
      },
      DEFAULT_ZOOM: 15
    },
    VALIDATION: {
      MIN_NAME_LENGTH: 3,
      MIN_ADDRESS_LENGTH: 10
    }
  }