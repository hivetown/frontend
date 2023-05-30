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
      @date-select="emitDateSelect"
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
  emits: ['date'],
  methods: {
    emitDateSelect() {
      const dataFormatada = new Date(this.value);
      const day = dataFormatada.getDate();
      const month = dataFormatada.getMonth() + 1; // Os meses são indexados a partir de zero, portanto, adicionamos 1
      const year = dataFormatada.getFullYear();
      this.$emit('date', [`${year}-${month}-${day}`, this.id]);
    },
  },
  props: {
    id: {
      type: String,
      default: 'datePicker1',
    },
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
