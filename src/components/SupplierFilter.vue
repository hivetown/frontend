<template>
    <!-- TODO fazer com que isto funcione bem, está apenas um exemplo aleatório -->
    <div>
        <b-form-input class=" mt-3 mb-3 light-search" type="search" placeholder="Pesquisar fornecedores" />
    
        <div class="option-list">
            <b-form-group v-slot="{ ariaDescribedby }" >
              <b-form-checkbox
                  v-for="option in options"
                  v-model="selected"
                  :key="option.value"
                  :value="option.value"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-3a"
              >
              {{ option.text }}
              </b-form-checkbox>
            </b-form-group>
        </div>
    </div>
    
</template>

<style>

  .option-list{
      padding: 4px;
      max-height: 20vh;
      overflow-y: auto;
      color:#5A5A5A;
  }

  .light-search:focus{
    box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important;
  }
</style>

<script>

  export default {
    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' },
          { text: 'Orange', value: 'orange2' },
          { text: 'Apple', value: 'apple2' },
          { text: 'Pineapple', value: 'pineapple2' },
          { text: 'Grape', value: 'grape2' },
          { text: 'Orange', value: 'orange3' },
          { text: 'Apple', value: 'apple3' },
          { text: 'Pineapple', value: 'pineapple3' },
          { text: 'Grape', value: 'grape3' }
        ]
      }
    }
  }

</script>