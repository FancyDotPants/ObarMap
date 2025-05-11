<template>
    <div class="address-form">
      <h2>ثبت آدرس</h2>
      <p class="subtitle">لطفا مشخصات و آدرس خود را وارد کنید</p>
      
      <form @submit.prevent="validateAndSubmit" class="form-container">
        <!-- Add loading indicator -->
        <div v-if="isSubmitting" class="loading-overlay">
          <loading-spinner />
        </div>
  
        <div class="form-group">
          <label for="firstName">نام</label>
          <input 
            id="firstName" 
            v-model="form.first_name" 
            type="text" 
            :class="{ 'error': errors.first_name }"
            placeholder="محمد"
          />
          <div v-if="errors.first_name" class="error-message">{{ errors.first_name }}</div>
        </div>
        
        <div class="form-group">
          <label for="lastName">نام خانوادگی</label>
          <input 
            id="lastName" 
            v-model="form.last_name" 
            type="text" 
            :class="{ 'error': errors.last_name }"
            placeholder="مثال: رضایی"
          />
          <div v-if="errors.last_name" class="error-message">{{ errors.last_name }}</div>
        </div>
        
        <div class="form-group">
          <label for="mobile">شماره تلفن همراه</label>
          <input 
            id="mobile" 
            v-model="form.coordinate_mobile" 
            type="text" 
            :class="{ 'error': errors.coordinate_mobile }"
            placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
            dir="ltr"
          />
          <div v-if="errors.coordinate_mobile" class="error-message">{{ errors.coordinate_mobile }}</div>
        </div>
        
        <div class="form-group">
          <label for="phone">شماره تلفن ثابت (اختیاری)</label>
          <input 
            id="phone" 
            v-model="form.coordinate_phone_number" 
            type="text" 
            placeholder="مثال: ۰۲۱۴۴۴۵۶۷۸۰"
            dir="ltr"
          />
        </div>
        
        <div class="form-group">
          <label for="address">آدرس</label>
          <textarea 
            id="address" 
            v-model="form.address" 
            :class="{ 'error': errors.address }"
            rows="4"
          ></textarea>
          <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
        </div>
        
        <div class="form-group">
          <label>جنسیت</label>
          <div class="gender-options">
            <label class="radio-label">
              <input type="radio" v-model="form.gender" value="male" />
              <span>آقا</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.gender" value="female" />
              <span>خانم</span>
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn" 
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'در حال پردازش...' : 'ثبت و ادامه' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import LoadingSpinner from './ui/LoadingSpinner.vue'
  import { validateRequired, validateMobile, convertPersianToEnglish } from '../utils/validation'
  import config from '../config'
  
  const emit = defineEmits(['next-step', 'form-data'])
  const isSubmitting = ref(false)
  
  const form = reactive({
    first_name: '',
    last_name: '',
    coordinate_mobile: '',
    coordinate_phone_number: '',
    address: '',
    gender: 'male',
    region: 1,
    lat: 0,
    lng: 0
  })
  
  const errors = reactive({
    first_name: '',
    last_name: '',
    coordinate_mobile: '',
    address: ''
  })
  
  const validateForm = () => {
    let isValid = true
    
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
    
    // Validate first name
    if (!validateRequired(form.first_name, config.VALIDATION.MIN_NAME_LENGTH)) {
      errors.first_name = `نام حداقل باید ${config.VALIDATION.MIN_NAME_LENGTH} حرف باشد`
      isValid = false
    }
    
    // Validate last name
    if (!validateRequired(form.last_name, config.VALIDATION.MIN_NAME_LENGTH)) {
      errors.last_name = `نام خانوادگی حداقل باید ${config.VALIDATION.MIN_NAME_LENGTH} حرف باشد`
      isValid = false
    }
    
    // Validate mobile - ensure we convert any Persian digits
    const mobileValue = convertPersianToEnglish(form.coordinate_mobile)
    if (!validateMobile(mobileValue)) {
      errors.coordinate_mobile = 'شماره موبایل باید ۱۱ رقم و با فرمت صحیح باشد'
      isValid = false
    } else {
      // Ensure we use the English digits in the form
      form.coordinate_mobile = mobileValue
    }
    
    // Validate address
    if (!validateRequired(form.address, config.VALIDATION.MIN_ADDRESS_LENGTH)) {
      errors.address = `آدرس حداقل باید ${config.VALIDATION.MIN_ADDRESS_LENGTH} حرف باشد`
      isValid = false
    }
    
    return isValid
  }
  
  // Convert phone to English digits if provided
  const convertPhoneIfProvided = () => {
    if (form.coordinate_phone_number) {
      form.coordinate_phone_number = convertPersianToEnglish(form.coordinate_phone_number)
    }
  }
  
  const validateAndSubmit = () => {
    if (validateForm()) {
      isSubmitting.value = true
      convertPhoneIfProvided()
      
      // Simulate async validation if needed
      setTimeout(() => {
        // Emit the form data to parent component
        emit('form-data', { ...form })
        emit('next-step')
        isSubmitting.value = false
      }, 300)
    }
  }
  
  // Add reset functionality
  const resetForm = () => {
    Object.keys(form).forEach(key => {
      if (key === 'gender') {
        form[key] = 'male'
      } else if (key === 'region') {
        form[key] = 1
      } else {
        form[key] = ''
      }
    })
    
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
  }
  
  // Expose reset for parent components
  defineExpose({ resetForm })
  </script>
  
  <style scoped>
  .address-form {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-container {
    position: relative;
  }
  
  h2 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  
  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  input.error, textarea.error {
    border-color: #e74c3c;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  .gender-options {
    display: flex;
    gap: 1rem;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #4ECDC4;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #3dbdb5;
  }
  
  .submit-btn:disabled {
    background-color: #a0e2dc;
    cursor: not-allowed;
  }
  
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 8px;
  }
  </style>