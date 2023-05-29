<template>
  <div>
    <Calendar
      id="example-datepicker"
      v-model="value"
      show-icon
      :date-format="'dd-mm-yy'"
      class="mb-2 date-form-input"
      :pt="{
        dropdownButton: {
          root: {
            style:
              'background-color: transparent !important; border:1px solid #ced4da ;',
          },
        },
      }"
      input-class="placeholder-small"
    ></Calendar>
    <!-- <p>Value: '{{ value }}'</p> -->
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style>
.date-form-input {
  height: 4vh;
}

.placeholder-small {
  font-size: 14px !important;
}
</style>
