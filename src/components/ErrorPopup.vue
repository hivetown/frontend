<template>
    <div class="error-popup">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="close">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      message: String,
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .error-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem;
    border: 1px solid black;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  </style>