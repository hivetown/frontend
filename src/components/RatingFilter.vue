<template>
  <div class="">
    <div class="option-list">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox
            v-for="option in options"
            v-model="selected"
            :key="option.value"
            :value="option.value"
            :aria-describedby="ariaDescribedby"
            name="flavour-3a"
          >
          <span v-html="option.label"></span>
        </b-form-checkbox>
      </b-form-group>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { label: '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<span> (5)</span>', value: '5' },
          { label: '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<span> (4)</span>', value: '4' },
          { label: '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<span> (3)</span>', value: '3' },
          { label: '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<span> (2)</span>', value: '2' },
          { label: '<i class="bi bi-star-fill rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<span> (1)</span>', value: '1' },
          { label: '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<i class="bi bi-star rating"></i>' +
                   '<span> (0)</span>', value: '0' },
        ],
      };
    },
  };
</script>
  
<style>
  .rating{
      color:#F1B24A;
  }
</style>