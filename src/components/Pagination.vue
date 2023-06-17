<template>
  <div>
    <b-pagination
      class="pagination"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    totalRows: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: parseInt(String(this.$route.query.page)) || 1,
    };
  },
  watch: {
    currentPage(newVal, oldVal) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', newVal.toString());
      window.location.replace(currentUrl.toString());
      console.log('currentPage changed from ' + oldVal + ' to ' + newVal);
    },
  },
};
</script>

<style>
.pagination .page-link {
  color: #232323 !important;
}

.pagination .page-link:focus {
  /* box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important; */
  box-shadow: 0 0 0 0.2rem rgba(207, 207, 207, 0.25) !important;
}

.pagination .page-item.active .page-link {
  color: white !important;
  border: 1px solid #ce9840;
  background-color: #f1b24a !important;
}
</style>
