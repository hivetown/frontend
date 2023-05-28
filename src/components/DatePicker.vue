<template>
  <div>
    <Calendar
      id="example-datepicker"
      v-model="value"
      show-icon
      :date-format="'dd-mm-yy'"
      class="mb-2"
      :pt="{
        input: { class: 'w-16rem' },
        dropdownButton: {
          root: { class: 'bg-teal-500 border-teal-500' },
        },
      }"
    ></Calendar>
    <p>Value: '{{ value }}'</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
