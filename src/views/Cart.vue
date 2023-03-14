<template >
  
    <div class="parent">
      <div style="text-align: center;">
          <button @click="goBack" type="button" class="btn btn-outline-secondary btn-sm" style="float:">
            Voltar
          </button>
      </div>
      
      <table class="table table-responsive-md">
          <tr>
              <td class="left-column">
              <div>
                  X items no carrinho

                  <div style="height:2vh"></div>

                  <CartItem></CartItem>
                  <CartItem></CartItem>
              </div>
              </td>

              <td class="right-column">
              <div>
                <h3>Rever a comprar</h3>
                  <div style="height:2vh"></div>

                  <p style="text-align: justify;">
                    Sub-total: <span class="checkout">0,00€</span><br>
                    Entrega: <span class="checkout">0,00€</span><br>
                  </p>

                  <div style="height:5vh;"></div>

                  <button type="button" class="btn btn-outline-secondary btn-sm checkout" >
                    Aplicar
                  </button>

                  <div style="height:10vh;"></div>

                  <p>
                    Total: <span class="checkout">0,00€</span><br>
                  </p>
                  <div style="text-align: center;">
                    <button type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
                      Finalizar a compra
                    </button>
                  </div>
              </div>
          </td>
          </tr>
      </table>
    </div>
    
</template>



<style>
.container {
    display: flex;
  align-items: center;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-collapse: collapse;
}

@media (max-width: 800px) {
  tr {
    display: block;
  }

  td {
    border: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    word-break: break-all;
  }
}

.left-column {
  width: 55%;
}

.right-column {
  width: 25%;
}

.checkout {
  float: right;
  text-align: center;
}
</style>

<script setup lang="ts"> 
import CartItem from "@/components/CartItem.vue";
</script>

<script lang="ts">
    export default {
    methods: {
        goBack() {window.history.back();}
    }
    };
</script>

