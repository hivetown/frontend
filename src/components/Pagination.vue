<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <Paginator
      :template="{
        '640px':
          'PrevPageLink CurrentPageReport NextPageLink JumpToPageDropdown',
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown RowsPerPageDropdown',
      }"
      current-page-report-template="{currentPage} de {totalRecords}"
      :rows="props.pageSize ?? 24"
      :total-records="props.items.totalItems ?? 0"
      :first="(props.items.page - 1) * props.pageSize"
      @page="onPageChange"
      :rows-per-page-options="[12, 24, 48, 72, 96]"
    >
    </Paginator>

    <p>Total de páginas: {{ props.items.totalPages }}</p>
  </div>
</template>

<script setup lang="ts">
import { BaseItems } from '@/types';
import Paginator, { PageState } from 'primevue/paginator';
import { PropType } from 'vue';

const props = defineProps({
  items: {
    type: Object as PropType<BaseItems<unknown>>,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 24,
    validator: (value: number) => [12, 24, 48, 72, 96].includes(value),
  },
});

const emit = defineEmits({
  // eslint-disable-next-line no-unused-vars
  pageChange: (newState: Partial<PageState>) => true,
});

// We need another ref to avoid mutating the prop directly
const onPageChange = async (newState: Partial<PageState>) => {
  // Emit to the parent
  await emit('pageChange', newState);
};
</script>
