<template>
    <div class="d-flex parent" style="">
        <div class="w-25 d-flex align-items-center" style="background-color:;">
            <!-- TODO preencher automaticamente -->
            <p><span>{{ items }}</span> produtos encontrados</p>
        </div>

        <!-- Faz de placeholder -->
        <div class="w-25" style=""></div>

        <div class="w-50 d-flex justify-content-end align-items-center" style="gap:2vh;">

            <div class="custom-views d-flex justify-content-center align-items-center" style="width:10%;">
                <i class="bi bi-list-ul" v-b-tooltip.hover title="Vista em lista"></i>
                <i class="bi bi-grid" v-b-tooltip.hover title="Vista em grelha 2x2"></i>
                <!-- <i class="bi bi-grid-3x3-gap" v-b-tooltip.hover title="Vista em grelha 3x3"></i> -->
            </div>

            <div class="d-flex" style="">
                <div class="views-btn">
                    <b-dropdown id="dropdown-1" :text="'Mostrar: ' + currentPageSize" class="m-md-2">
                        <b-dropdown-item @click="setCurrentPageSize(12)">12</b-dropdown-item>
                        <b-dropdown-item @click="setCurrentPageSize(24)">24</b-dropdown-item>
                        <b-dropdown-item @click="setCurrentPageSize(48)">48</b-dropdown-item>
                    </b-dropdown>
                </div>

                <div class="views-btn">
                    <b-dropdown id="dropdown-1" :text="'Mostrar: ' + order" class="m-md-2">
                        <b-dropdown-item @click="order = 'Avaliação'">Avaliação</b-dropdown-item>
                        <b-dropdown-item @click="order = 'Preço (ascendente)'">Preço (ascendente)</b-dropdown-item>
                        <b-dropdown-item @click="order = 'Preço (descendente)'">Preço (descendente)</b-dropdown-item>
                    </b-dropdown>
                </div>

            </div>
        </div>
    </div>
</template>


<style>
.custom-views {
    gap: 0.5em !important;
}

.custom-views i {
    color: #164A41;
    font-size: 2.5vh;
    cursor: pointer;
}

/* .views-btn .btn{
        background-color: white !important;
        color:#5A5A5A;
        border: solid 1px #164A41;
    } */
</style>
<script>
export default {
    props: {
        amount: {
            type: Number,
            required: true,
        },
        items: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            order: 'Avaliação',
            currentPageSize: this.amount,
        };
    },
    methods: {
        setCurrentPageSize(size) {
            this.currentPageSize = size;
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("pageSize", size.toString());
            window.location.replace(currentUrl.toString());
        }
    },
};
</script>
