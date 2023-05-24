<template>
    <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
        <h5 class="p-3">Características</h5>
    </div>
    <div>
        <div class="">
            <!-- Field name -->
            <div v-for="(field, index) in this.fieldsTotais" :key="index" class="mb-3 parent" style="border-bottom: 1px solid #eeeeee;">
                <div>
                    <div class="d-flex" style="gap:12vh;" >
                        <div v-for="(fs, fsIndex) in field[1]" :key="fsIndex" class="mb-4 d-flex gap-4">
                            <div v-if="fsIndex === 0">
                                <div v-for="f in fs" style="background-color: ; width: 25vh;">
                                    <span style="font-weight: bold">{{ f.field.name }}:</span>
                                </div>
                            </div>
                            <div class="" style="background-color: ; width: 25vh;">
                                <div v-for="f in fs" :key="f.field.id" class="d-flex">
                                    <div style="background-color: ; min-width: 25vh;">
                                        {{ f.value }}
                                        {{ f.field.unit }}
                                    </div>
                                    <div v-if="field[0].length < 2">
                                        <div style="background-color: ; width: 25vh; display: flex; justify-content: center;">
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ProductSpec',
    props: {
       fieldsTotais: {
            type: null,
            required: true,
        },
    },
})
</script>
