<template>
    <div class="address-entry-view">
      <div class="tabs">
        <div class="tab" :class="{ active: currentTab === 'register' }">ثبت آدرس</div>
        <div class="tab" :class="{ active: currentTab === 'list' }">
          <router-link to="/addresses">مشاهده آدرس ها</router-link>
        </div>
      </div>
      
      <div v-if="successMessage" class="success-message">
        <div class="success-icon">✓</div>
        <p>{{ successMessage }}</p>
        <button @click="resetForm" class="new-address-btn">ثبت آدرس جدید</button>
      </div>
      
      <div v-else-if="step === 1">
        <AddressForm
          ref="formRef"
          @next-step="goToMapStep"
          @form-data="updateFormData"
        />
      </div>
      
      <div v-else-if="step === 2">
        <AddressMap
          :form-data="formData"
          @back-step="goToFormStep"
          @address-added="handleAddressAdded"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import AddressForm from '../components/AddressForm.vue'
  import AddressMap from '../components/AddressMap.vue'
  
  const router = useRouter()
  const currentTab = ref('register')
  const step = ref(1)
  const formData = ref({})
  const formRef = ref(null)
  const successMessage = ref('')
  
  const goToFormStep = () => {
    step.value = 1
  }
  
  const goToMapStep = () => {
    step.value = 2
  }
  
  const updateFormData = (data) => {
    formData.value = { ...data }
  }
  
  const handleAddressAdded = (result) => {
    // Show success message
    successMessage.value = 'آدرس با موفقیت ثبت شد!'
    
    // Optionally redirect after a delay
    setTimeout(() => {
      router.push('/addresses')
    }, 3000)
  }
  
  const resetForm = () => {
    successMessage.value = ''
    if (formRef.value) {
      formRef.value.resetForm()
    }
    step.value = 1
  }
  </script>
  
  <style scoped>
  .address-entry-view {
    padding: 1rem 0;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
  }
  
  .tab {
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #666;
  }
  
  .tab.active {
    color: #4ECDC4;
    border-bottom: 2px solid #4ECDC4;
  }
  
  .tab a {
    color: inherit;
    text-decoration: none;
  }
  
  .success-message {
    background-color: #fff;
    border-radius: 8px;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .success-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #4ECDC4;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 1rem;
  }
  
  .new-address-btn {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #4ECDC4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .new-address-btn:hover {
    background-color: #3dbdb5;
  }
  </style>