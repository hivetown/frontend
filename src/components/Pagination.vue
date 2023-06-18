<template>
  <div>
    <b-pagination
      class="pagination mobile-pagination"
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

.pagination .disabled span {
  color: #a4a4a4 !important;
}

.pagination .page-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(207, 207, 207, 0.25) !important;
}

.pagination .page-item.active .page-link {
  color: white !important;
  border: 1px solid #ce9840;
  background-color: #f1b24a !important;
}

.pagination li:first-child .page-link:after {
  content: 'Primeira';
  margin-left: 5px;
}

.pagination li:nth-child(2) .page-link:after {
  content: 'Anterior';
  margin-left: 5px;
}

.pagination li:nth-child(2) .page-link:after {
  content: 'Anterior';
  margin-left: 5px;
}

.pagination li:nth-last-child(2) .page-link:before {
  content: 'Seguinte';
  margin-right: 5px;
}

.pagination li:last-child .page-link:before {
  content: 'Última';
  margin-right: 5px;
}

@media (max-width: 768px) {
  .mobile-pagination {
    width: 95%;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .pagination {
    scale: 0.75;
  }
}
</style>
