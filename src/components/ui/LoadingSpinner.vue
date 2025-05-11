<template>
    <div class="loading-spinner" :style="{ width: size + 'px', height: size + 'px' }"></div>
  </template>
  
  <script setup>
  const props = defineProps({
    size: {
      type: Number,
      default: 40
    }
  })
  </script>
  
  <style scoped>
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4ECDC4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>