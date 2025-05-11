<template>
    <div class="address-list-view">
      <div class="tabs">
        <div class="tab">
          <router-link to="/">ثبت آدرس</router-link>
        </div>
        <div class="tab active">مشاهده آدرس ها</div>
      </div>
      
      <AddressList />
    </div>
  </template>
  
  <script setup>
  import AddressList from '../components/AddressList.vue'
  </script>
  
  <style scoped>
  .address-list-view {
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
  </style>