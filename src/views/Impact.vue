<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <div style="width: 20%; border: 1px solid black"></div>
      <div style="width: 80%; background-color: ">
        <div class="d-flex data-cards">
          <ImpactDataCard
            icon="bi bi-currency-euro"
            title="Total gasto"
            :value="2000"
            color="#7CA2C3"
          ></ImpactDataCard>
          <ImpactDataCard
            icon="bi bi-box-seam"
            title="Encomendas"
            :value="7"
            color="#DC6942"
          ></ImpactDataCard>
          <ImpactDataCard
            icon="bi bi-bag"
            title="Produtos comprados"
            :value="12"
            color="#F1B24A"
          ></ImpactDataCard>
        </div>
        <!-- Dados alteráveis -->
        <div style="background-color: ">
          <!-- Evolução -->
          <div class="parent" style="background-color: ">
            <h4 class="py-4 dgreen-txt">Histórico</h4>
            <div class="" style="background-color: "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImpactDataCard from '@/components/ImpactDataCard.vue';
</script>

<style>
.data-cards {
  margin-left: 5vh;
  padding: 3vh;
  gap: 4vh;
}
</style>
