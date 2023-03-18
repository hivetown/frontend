<!-- TODO - este componente deveria usar o URL para os valores. Uma vez que isso ainda não está definido aqui 
            fazemos uma versão que ainda não usa o router mas que depois temos de mudar -->
<!-- <template>
    <div class="overflow-auto" style="background-color: ;">
        <b-pagination :total-rows="totalRows" :per-page="perPage" :current-page="currentPage"></b-pagination>
        <p class="mt-3">Current Page: {{ currentPage }}</p> -->
        <!-- <p> Produtos: {{ totalRows }}</p>
        <p> Por página: {{ perPage  }}</p> -->
    <!-- </div>
</template>

<script>

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
</script> -->

<template>
    <div>
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
    </div>
</template>

<script>
export default {
    props: {
        totalRows: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            currentPage: parseInt(this.$route.query.page) || 1
        };
    },
    watch: {
        currentPage(newVal, oldVal) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("page", newVal.toString());
            window.location.replace(currentUrl.toString());
            console.log("currentPage changed from " + oldVal + " to " + newVal);
            
        }
    },
};
</script>
