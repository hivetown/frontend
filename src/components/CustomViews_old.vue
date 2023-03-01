<template>
    <div class="custom-views d-flex">
        <div class="d-flex justify-content-center align-items-center" style="width:10%; gap:1em; border-right: 2px solid #eeeeee;">
            <i class="bi bi-list" style="font-size: 3.2vh !important;" v-b-tooltip.hover title="Vista em lista"></i>
            <i class="bi bi-grid-fill" v-b-tooltip.hover title="Vista em grelha 2x2"></i>
            <i class="bi bi-grid-3x3-gap-fill" v-b-tooltip.hover title="Vista em grelha 3x3"></i>
        </div>

        <div class="d-flex align-items-center mx-3">
            <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
            >
            Mostrar apenas items em promoção
            </b-form-checkbox>

            <!-- <div>State: <strong>{{ status }}</strong></div> -->
        </div>

        <div class="d-flex mx-auto me-0 align-items-center">
            <span>Ordenar por:</span>
        </div>


        <div class="d-block mx-auto me-0 p-2" style=" border-left: 2px solid #eeeeee;">
            <!-- <span>Mostrar:</span> -->
            
            <div class="overflow-auto">
                <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                ></b-pagination>

                <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->

                <!-- <b-table
                id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                small
                ></b-table> -->
            </div>
        </div>
    </div>

    <div class="px-2" style="background-color: red; height: ;">
    <!-- <div class="px-2 mt-4" style="">
        <b-table
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            small
            ></b-table>
    </div> -->
    </div>
</template>


<style>
.custom-views{
    /* background-color: #f3f3f3;  */
    border: 2px solid #f3f3f3;
    width: 100%; 
    max-height: 6vh;
    border-radius: 0.5em;
}

.custom-views i{
    color:#164A41;
    font-size: 2.5vh;
    cursor: pointer;
}

.custom-views .form-check{
    color:#a2a2a2;
}

.custom-views span{
    color:#a2a2a2;
}

</style>

<script>

  export default {
    data() {
      return {
        status: 'not_accepted',

        perPage: 3,
        currentPage: 1,
        items: [
          // { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          // { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          // { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          // { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          // { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          // { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          // { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          // { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          // { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>