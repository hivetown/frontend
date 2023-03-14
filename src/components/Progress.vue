<template>
    <div class="root">
       <div class="container">
            <ul class="progressbar">
                <li class="active step1">Pedido Efetuado</li>
            <li class="active step2">Enviado</li>
            <li class="step3">Em transito</li>
            <li class="step4">Recebido</li>
            </ul>
        </div>
    </div>
  </template>
  <script>
  export default {
    props:['length'],
    data () {
      return {
      }
    },
  }
  </script>
  
  <style scoped>
      .progressbar li.step1:before {
  content: "";
  width: 60px;
  height: 60px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
  background-image: url('/progress/folha.png');
  background-size: contain;
}
      .progressbar li.step2:before {
  content: "";
  width: 60px;
  height: 60px;
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
  content: "";
  width: 60px;
  height: 60px;
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
  content: "";
  width: 60px;
  height: 60px;
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

.progressbar li.active:before{
  background-image: url('/progress/aviao.png');
  background-size: cover;
  z-index: 2;
}

  .container{
       width: 90%;
      position: absolute;
      z-index: 1;
      position: absolute;
  left: 30%;
      margin-top: 20px;
  }
  .progressbar{
    counter-reset: step;
    height: 10px; /* altura da barra de progresso */

  }
  .progressbar li{ 
    float: left;
    width: 14.28%;
    position: relative;
    text-align: center;
  }


  .progressbar li:after{
    content: '';
    position: absolute;
    width:100%;
    height: 3px;
    background: #979797;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
.progressbar li:before {
  content: "";
  width: 80px;
  height: 80px;
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 36px;
  background-color: #fff;
  text-align: center;
  font-weight: bold;
}


  
  .progressbar li.active:after{
    
   background: #F1B123;
   z-index: 0;
  }
  .progressbar li.active:after{
   background: #F1B123;
   z-index: -2;
  }
  .progressbar li.active:before{
  border-color: #F1B123;
  background: #F1B123;
  color: white;
  }
  .progressbar li:first-child:after{
   content: none;
  }
  
.progressbar li.step1:before {
  background-image: url('/progress/folha.png');
  background-size: cover ;
}

.progressbar li.step2:before {
  background-image: url('/progress/box.png');
  background-size: cover ;
}
.progressbar li.step3:before {
  background-image: url('/progress/camiao.png');
  background-size: cover ;
}
.progressbar li.step4:before {
  background-image: url('/progress/casa.png');
  background-size: cover ;
}
@media (max-width: 768px) {
  .container {
    width: 90%;
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
  </style>