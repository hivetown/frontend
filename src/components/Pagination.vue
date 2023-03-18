<!-- TODO - este componente deveria usar o URL para os valores. Uma vez que isso ainda não está definido aqui 
            fazemos uma versão que ainda não usa o router mas que depois temos de mudar -->
<template>
    <div class="overflow-auto">
        <b-pagination :total-rows="totalRows" :per-page="perPage" :current-page="currentPage"></b-pagination>
        <p class="mt-3">Current Page: {{ currentPage }}</p>
        <!-- <p> Produtos: {{ totalRows }}</p>
        <p> Por página: {{ perPage  }}</p> -->
    </div>
</template>

<script>
import CompareBanner from './CompareBanner.vue';

export default {
    props: {
        totalRows: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    }
};
</script>
