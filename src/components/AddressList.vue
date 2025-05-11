<template>
    <div class="address-list">
      <h2>آدرس ها و مشخصات</h2>
      
      <div class="address-controls" v-if="addresses.length > 0">
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="جستجو در آدرس ها..." 
          class="search-input"
        />
      </div>
      
      <div v-if="loading" class="loading-container">
        <loading-spinner />
        <p>در حال بارگذاری...</p>
      </div>
      
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchAddresses" class="retry-button">تلاش مجدد</button>
      </div>
      
      <div v-else-if="filteredAddresses.length === 0" class="no-addresses">
        <p v-if="searchTerm">نتیجه ای برای جستجوی شما یافت نشد.</p>
        <p v-else>آدرسی یافت نشد.</p>
      </div>
      
      <div v-else class="address-items">
        <div 
          v-for="address in filteredAddresses" 
          :key="address.id" 
          class="address-item"
        >
          <div class="address-row">
            <div class="address-label">نام و نام خانوادگی</div>
            <div class="address-value">{{ address.first_name }} {{ address.last_name }}</div>
          </div>
          
          <div class="address-row">
            <div class="address-label">جنسیت</div>
            <div class="address-value">{{ formatGender(address.gender) }}</div>
          </div>
          
          <div class="address-row">
            <div class="address-label">شماره تلفن همراه</div>
            <div class="address-value">{{ address.coordinate_mobile || '-' }}</div>
          </div>
          
          <div class="address-row">
            <div class="address-label">شماره تلفن ثابت</div>
            <div class="address-value">{{ address.coordinate_phone_number || '-' }}</div>
          </div>
          
          <div class="address-row address-full">
            <div class="address-label">آدرس</div>
            <div class="address-value">{{ address.address }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { getAddresses } from '../services/api'
  import LoadingSpinner from './ui/LoadingSpinner.vue'
  
  const addresses = ref([])
  const loading = ref(true)
  const error = ref(null)
  const searchTerm = ref('')
  
  // Computed property for filtered addresses
  const filteredAddresses = computed(() => {
    if (!searchTerm.value) return addresses.value
    
    const term = searchTerm.value.toLowerCase()
    return addresses.value.filter(address => 
      address.first_name?.toLowerCase().includes(term) ||
      address.last_name?.toLowerCase().includes(term) ||
      address.address?.toLowerCase().includes(term) ||
      (address.coordinate_mobile && address.coordinate_mobile.includes(term))
    )
  })
  
  const formatGender = (gender) => {
    if (gender === 'male') return 'آقا'
    if (gender === 'female') return 'خانم'
    return '-'
  }
  
  const fetchAddresses = async () => {
    loading.value = true
    error.value = null
    
    try {
      const result = await getAddresses()
      addresses.value = result || []
      loading.value = false
    } catch (err) {
      error.value = err.message || 'خطا در دریافت آدرس ها'
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchAddresses()
  })
  </script>
  
  <style scoped>
  .address-list {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: right;
  }
  
  .address-controls {
    margin-bottom: 1rem;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
  
  .loading-container p {
    margin-top: 1rem;
    color: #666;
  }
  
  .error-message, .no-addresses {
    text-align: center;
    padding: 2rem 0;
    color: #666;
  }
  
  .error-message {
    color: #e74c3c;
  }
  
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4ECDC4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .retry-button:hover {
    background-color: #3dbdb5;
  }
  
  .address-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .address-item {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .address-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .address-row:last-child {
    border-bottom: none;
  }
  
  .address-label {
    color: #888;
    font-size: 0.9rem;
  }
  
  .address-value {
    color: #333;
    font-weight: 500;
  }
  
  .address-full {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .address-full .address-value {
    margin-top: 0.5rem;
    line-height: 1.5;
  }
  </style>