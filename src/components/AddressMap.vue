<template>
    <div class="map-container">
      <div class="map-header">
        <h3>انتخاب موقعیت</h3>
        <button class="back-button" @click="$emit('back-step')">
          <span>→</span>
        </button>
      </div>
      
      <div v-if="mapError" class="map-error">
        <p>خطا در بارگذاری نقشه. لطفا صفحه را رفرش کنید.</p>
      </div>
      
      <div v-else-if="isLoading" class="map-loading">
        <loading-spinner />
        <p>در حال بارگذاری نقشه...</p>
      </div>
      
      <div v-else id="map" ref="mapRef" class="map"></div>
      
      <div class="location-info" v-if="selectedLocation.lat && selectedLocation.lng">
        <p>موقعیت انتخاب شده: {{ selectedLocation.lat.toFixed(6) }}, {{ selectedLocation.lng.toFixed(6) }}</p>
      </div>
      
      <button 
        class="submit-location-btn" 
        @click="submitLocation"
        :disabled="isSubmitting || !mapLoaded"
      >
        {{ isSubmitting ? 'در حال ثبت...' : 'ثبت و ادامه' }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { addAddress } from '../services/api'
  import LoadingSpinner from './ui/LoadingSpinner.vue'
  import config from '../config'
  
  const props = defineProps({
    formData: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['back-step', 'address-added'])
  
  const mapRef = ref(null)
  const isLoading = ref(true)
  const mapError = ref(false)
  const mapLoaded = ref(false)
  const isSubmitting = ref(false)
  
  let map = null
  let marker = null
  const selectedLocation = ref({ ...config.MAPS.DEFAULT_CENTER })
  
  // Initialize map
  const initMap = () => {
    if (!window.google || !mapRef.value) {
      mapError.value = true
      isLoading.value = false
      return
    }
  
    try {
      map = new window.google.maps.Map(mapRef.value, {
        center: { lat: selectedLocation.value.lat, lng: selectedLocation.value.lng },
        zoom: config.MAPS.DEFAULT_ZOOM,
        streetViewControl: false,
        mapTypeControl: false
      })
      
      marker = new window.google.maps.Marker({
        position: { lat: selectedLocation.value.lat, lng: selectedLocation.value.lng },
        map: map,
        draggable: true,
        animation: window.google.maps.Animation.DROP
      })
      
      map.addListener('click', (event) => {
        updateMarkerPosition(event.latLng)
      })
      
      marker.addListener('dragend', () => {
        updateMarkerPosition(marker.getPosition())
      })
      
      mapLoaded.value = true
      isLoading.value = false
    } catch (error) {
      console.error('Error initializing map:', error)
      mapError.value = true
      isLoading.value = false
    }
  }
  
  // Update marker position
  const updateMarkerPosition = (latLng) => {
    marker.setPosition(latLng)
    selectedLocation.value = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
  }
  
  // Submit location and form data
  const submitLocation = async () => {
    if (isSubmitting.value || !mapLoaded.value) return
    
    isSubmitting.value = true
    try {
      const formDataWithLocation = {
        ...props.formData,
        lat: selectedLocation.value.lat,
        lng: selectedLocation.value.lng
      }
      
      const result = await addAddress(formDataWithLocation)
      emit('address-added', result)
    } catch (error) {
      console.error('Error submitting address:', error)
      alert('خطا در ثبت آدرس. لطفا دوباره تلاش کنید.')
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Load Google Maps with error handling
  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      try {
        const script = document.createElement('script')
        script.id = 'google-maps-script'
        // Use callback parameter for safer initialization
        const callbackName = 'initGoogleMaps_' + Math.random().toString(36).substring(2, 15)
        window[callbackName] = () => {
          resolve()
          delete window[callbackName]
        }
        
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAPS.API_KEY}&callback=${callbackName}`
        script.async = true
        script.defer = true
        
        // Add error handler
        script.onerror = () => {
          reject(new Error('Failed to load Google Maps'))
        }
        
        document.head.appendChild(script)
        
        // Add timeout for script loading
        setTimeout(() => {
          if (!window.google) {
            reject(new Error('Timeout loading Google Maps'))
          }
        }, 10000)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  onMounted(async () => {
    isLoading.value = true
    mapError.value = false
    
    try {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initMap()
      } else {
        await loadGoogleMapsScript()
        initMap()
      }
    } catch (error) {
      console.error('Error loading Google Maps:', error)
      mapError.value = true
      isLoading.value = false
    }
  })
  
  onUnmounted(() => {
    // Clean up any global variables or event listeners
    if (window.google && map) {
      // Google Maps doesn't have a specific cleanup method
      // but we can remove event listeners if needed
    }
  })
  </script>
  
  <style scoped>
  .map-container {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .map-header h3 {
    margin: 0;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #333;
  }
  
  .map {
    height: 400px;
    width: 100%;
  }
  
  .map-loading, .map-error {
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    color: #666;
  }
  
  .location-info {
    padding: 0.5rem 1rem;
    background-color: #f9f9f9;
    border-top: 1px solid #eee;
  }
  
  .location-info p {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
  }
  
  .submit-location-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #4ECDC4;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .submit-location-btn:hover {
    background-color: #3dbdb5;
  }
  
  .submit-location-btn:disabled {
    background-color: #a0e2dc;
    cursor: not-allowed;
  }
  </style>