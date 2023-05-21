<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li
          :class="
            orderItem['status'] === 'Processing' ||
            orderItem['status'] === 'Delivered' ||
            orderItem['status'] === 'Shipped' ||
            orderItem['status'] === 'Paid' ||
            orderItem['status'] === 'Cancelled'
              ? 'active step1'
              : 'step1'
          "
        >
          Pago
        </li>
        <li
          :class="
            orderItem['status'] === 'Shipped' ||
            orderItem['status'] === 'Delivered' ||
            orderItem['status'] === 'Processing' ||
            orderItem['status'] === 'Cancelled'
              ? 'active step2'
              : 'step2'
          "
        >
          Em processamento
        </li>
        <li
          :class="
            orderItem['status'] === 'Delivered' ||
            orderItem['status'] === 'Shipped' ||
            orderItem['status'] === 'Cancelled'
              ? 'active step3'
              : 'step3'
          "
        >
          Em transporte
        </li>
        <li
          :class="
            orderItem['status'] === 'Delivered' ||
            orderItem['status'] === 'Cancelled'
              ? 'active step4'
              : 'step4'
          "
        >
          Entregue
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchOrder, fetchUser } from '../api/orders';
import { Order, Consumer } from '../types/interfaces';
const orderItem = ref<Order[]>([]); //array com os produtos
const search = ref('');
const user = ref<Consumer[]>([]);

//obtem o id do link da encomenda atual
const id = window.location.pathname.split('/id').pop()?.toString();
onMounted(async () => {
  //obter user logado
  //const userItem = await fetchUser();
  //user.value=userItem.data;
  //trocar o 1 para o user logado (user.value['id'])
  //TODO por user logado
  const responseItem = await fetchOrder('1', id);
  console.log(id);
  orderItem.value = responseItem.data;
});
</script>

<style scoped>
.progressbar li.step1:before {
  content: '';
  width: 35px;
  height: 35px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
  background-image: url('/progress/euro.png');
  background-size: contain;
}
.progressbar li.step2:before {
  content: '';
  width: 35px;
  height: 35px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
  background-image: url('/progress/box.png');
  background-size: contain;
}
.progressbar li.step3:before {
  content: '';
  width: 35px;
  height: 35px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
  background-image: url('/progress/camiao.png');
  background-size: contain;
}

.progressbar li.step4:before {
  content: '';
  width: 35px;
  height: 35px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
  background-image: url('/progress/casa.png');
  background-size: contain;
}

.progressbar li.active:before {
  background-image: url('/progress/aviao.png');
  background-size: cover;
  z-index: 2;
}
li {
  list-style-type: none;
}

.progressbar {
  counter-reset: step;
  height: 10px; /* altura da barra de progresso */
}
.progressbar li {
  float: left;
  width: 14.28%;
  position: relative;
  text-align: center;
}

.progressbar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:before {
  content: '';
  width: 80px;
  height: 80px;
  border: 2px solid #bebebe;
  display: block;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
}

.progressbar li.active:after {
  background: #f1b123;
  z-index: 0;
}
.progressbar li.active:after {
  background: #f1b123;
  z-index: -2;
}
.progressbar li.active:before {
  border-color: #f1b123;
  background: #f1b123;
  color: white;
}
.progressbar li:first-child:after {
  content: none;
}

.progressbar li.step1:before {
  background-image: url('/progress/euro.png');
  background-size: cover;
}

.progressbar li.step2:before {
  background-image: url('/progress/box.png');
  background-size: cover;
}
.progressbar li.step3:before {
  background-image: url('/progress/camiao.png');
  background-size: cover;
}
.progressbar li.step4:before {
  background-image: url('/progress/casa.png');
  background-size: cover;
}
.container {
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 310px;
  text-align: center !important;
}

@media (max-width: 768px) {
  .table th:nth-child(2),
  .table td:nth-child(2) {
    display: none;
  }
  .table th:nth-child(5),
  .table td:nth-child(5) {
    display: none;
  }
  .container {
    width: 90%;
    margin-left: 25px;
  }

  .progressbar li {
    width: 20%;
    font-size: 12px;
  }

  .progressbar {
    list-style: none;
    padding-left: 0;
  }
  .progressbar li:before {
    display: none;
  }
}
@media (max-width: 660px) {
  .progressbar li {
    width: 20%;
    font-size: 12px;
  }

  .progressbar {
    list-style: none;
    padding-left: 0;
  }
  .progressbar li:before {
    display: none;
  }

  .container {
    width: 90%;
    position: absolute;
    z-index: 1;
    position: absolute;
    margin-top: 20px;
    left: 12%;
  }
}
</style>
