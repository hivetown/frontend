<template>
  <div id="full" class="grid align-items-center justify-content-center">
    <Card>
      <template #title>
        <span class="dgreen-txt main-txt" style="font-weight: 400 !important"
          >Bem vindo ao hiveTown</span
        >
      </template>

      <template #content>
        <!-- User Type -->
        <div class="flex flex-column gap-4">
          <div class="flex flex-column gap-2">
            <small>Tipo de utilizador</small>
            <div class="flex gap-3">
              <div>
                <RadioButton
                  v-model="userType"
                  input-id="userTypeConsumer"
                  name="userType"
                  value="Consumer"
                />
                <label for="userTypeConsumer" class="ml-2"
                  >Sou um consumidor</label
                >
              </div>

              <div>
                <RadioButton
                  v-model="userType"
                  input-id="userTypeProducer"
                  name="userType"
                  value="Producer"
                />
                <label for="userTypeProducer" class="ml-2"
                  >Sou um produtor</label
                >
              </div>
            </div>
          </div>

          <!-- Form -->
          <div v-if="userType === 'Consumer'">
            <RegisterConsumer />
          </div>
          <div v-else>
            <RegisterProducer />
          </div>
        </div>
      </template>

      <template #footer>
        <small
          >Já tenho conta!
          <RouterLink :to="{ name: 'Login' }">Entrar</RouterLink></small
        >
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import RegisterConsumer from '@/components/register/RegisterConsumer.vue';
import RegisterProducer from '@/components/register/RegisterProducer.vue';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';

export default {
  components: {
    RegisterConsumer,
    RegisterProducer,
    Card,
    RadioButton,
  },
  setup() {
    // create ref to save the value of the radio button
    const userType = ref('Consumer' as 'Consumer' | 'Producer');

    return {
      userType,
    };
  },
};
</script>

<style scoped>
#full {
  height: 90vh;
  width: 99vw;
  background-image: url('/c1.svg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
