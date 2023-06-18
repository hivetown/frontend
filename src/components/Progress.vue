<template>
  <div class="root">
    <div class="container">
      <ul class="progressbar">
        <li
          :class="
            props.order.generalStatus === 'Processing' ||
            props.order.generalStatus === 'Delivered' ||
            props.order.generalStatus === 'Shipped' ||
            props.order.generalStatus === 'Paid' ||
            props.order.generalStatus === 'Cancelled'
              ? 'active step1'
              : 'step1'
          "
        >
          Pago
        </li>
        <li
          :class="
            props.order.generalStatus === 'Shipped' ||
            props.order.generalStatus === 'Delivered' ||
            props.order.generalStatus === 'Processing' ||
            props.order.generalStatus === 'Cancelled'
              ? 'active step2'
              : 'step2'
          "
        >
          Em processamento
        </li>
        <li
          :class="
            props.order.generalStatus === 'Delivered' ||
            props.order.generalStatus === 'Shipped' ||
            props.order.generalStatus === 'Cancelled'
              ? 'active step3'
              : 'step3'
          "
        >
          Em transporte
        </li>
        <li
          :class="
            props.order.generalStatus === 'Delivered' ||
            props.order.generalStatus === 'Cancelled'
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
import { Order } from '@/types';
import { PropType } from 'vue';

const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
});
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
}

.container {
  z-index: 1;
  display: block;
  margin: auto;
  /* background-color: green; */
}
.progressbar {
  counter-reset: step;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
}

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

.progressbar li {
  float: left;
  width: 30vh;
  height: 15vh;
  position: relative;
  /* background-color: purple; */
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

@media (max-width: 768px) {
  .table th:nth-child(2),
  .table td:nth-child(2) {
    display: none;
  }
  .table th:nth-child(5),
  .table td:nth-child(5) {
    display: none;
  }
  /* .container {
    width: 90%;
    margin-left: 25px;
  } */

  .progressbar li {
    /* width: 20%; */
    font-size: 0.6em;
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
    /* background-color: red; */
    font-size: 0.5em;
  }

  .progressbar {
    list-style: none;
    padding-left: 0;
  }
  .progressbar li:before {
    display: none;
  }

  /* .container {
    width: 90%;
    position: absolute;
    z-index: 1;
    position: absolute;
    margin-top: 20px;
    left: 12%;
  } */
}
</style>
