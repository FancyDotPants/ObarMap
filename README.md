#Address Management Application

A Vue.js application for managing addresses. This project was built as part of a frontend test.

## Features

- Address entry form with validation
- Map integration for location selection
- Address list display
- Search functionality for addresses

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### API Integration
The application integrates with the Achareh API for address management. The API endpoints used are:
- GET https://stage.achareh.ir/api/karfarmas/address - To fetch all saved addresses
- POST https://stage.achareh.ir/api/karfarmas/address - To save a new address
### Google Maps Integration
This application uses Google Maps API for location selection. Make sure to:
1. Replace the API key in `src/config/index.js` with your own Google Maps API key
2. Enable the Maps JavaScript API in your Google Cloud Console
Setting up the Project
Create a new project using Vue CLI:
```
npm create vue@latest vue-maps-project
```
Navigate to the project directory:
```
cd vue-maps-project
```
Install dependencies:
```
npm install axios
```
Add all the files described above to their respective locations.

Replace YOUR_GOOGLE_MAPS_API_KEY in src/config/index.js with your actual Google Maps API key.

Start the development server:
```
npm run serve
```