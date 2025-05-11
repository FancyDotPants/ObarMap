<template>
    <div class="app">
      <div class="header">
        <img src="./assets/logo.png" alt="آچاره" class="logo" />
      </div>
      <router-view />
    </div>
  </template>
  
  <script setup>
  // No additional logic needed here
  </script>
  
  <style>
  @font-face {
    font-family: 'Vazir';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Vazir', sans-serif;
  }
  
  body {
    direction: rtl;
    background-color: #f5f5f5;
  }
  
  .app {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
  }
  
  .logo {
    height: 40px;
  }
  
  @media (max-width: 768px) {
    .app {
      padding: 0;
    }
  }
  </style>