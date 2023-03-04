<template>

    <div class="d-flex parent p-4" style="background-color:; height:">
        <!-- <div class="w-25" style="background-color:; height:; border-right: solid 2px #eeeeee;"> -->
        <div class="w-25" style="background-color:; height:;">
            <h3 class="text-center mt-4 mb-3">Nome</h3>
            <div class="" style="background-color:; ">
                <img class="d-block mx-auto w-50" src="https://placehold.jp/150x150.png" style="border-radius: 50%;">
            </div>

            <div class="d-flex justify-content-center mt-4">
                <a href="" class="me-2 text-reset">
                    <b-icon-facebook class="footer-icon"></b-icon-facebook>
                </a>
                <a href="" class="me-2 text-reset">
                    <b-icon-twitter class="footer-icon"></b-icon-twitter>
                </a>
                <a href="" class="me-2 text-reset">
                    <b-icon-instagram class="footer-icon"></b-icon-instagram>
                </a>
            </div>
        </div>  
        <div class="w-75 p-4 px-5" style="background-color:; height: ; flex-direction:column;">
            <div id="info" class="mb-4" style="border-bottom: solid 1px #e4e4e4;">
                <h4 class="mb-4">Sobre</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quam veniam reprehenderit quasi numquam ratione fuga vel, eum soluta reiciendis placeat corrupti odio consequatur alias nisi deserunt laudantium a doloremque!</p>
            </div>

            <div class="" >
                <div class="d-flex gap-2 grey-txt">
                    <p class="fw-bold">Telefone:</p>
                    <span>000 000 000</span>
                </div>
                <div class="d-flex gap-2 grey-txt">
                    <p class="fw-bold">Email:</p>
                    <span>email@email.com</span>
                </div>
                <div class="d-flex gap-2 grey-txt">
                    <p class="fw-bold">Morada:</p>
                    <span>morada</span>
                </div>
            </div>
        </div>      
    </div>

    <!-- <div class="parent px-5" style="background-color: ;">
        <p class="">Existem <span>3</span> unidades de produção perto de si</p>
        <div class="">
            <ul>
                <li>Unidade 1: 5km</li>
                <li>Unidade 2: 10km</li>
                <li>Unidade 3: 13km</li>
            </ul>
        </div>
    </div> -->

    <div class="parent px-5">
    <!-- <p>Existem <span>3</span> unidades de produção perto de si:</p> -->
    <!-- <div>
      <ul>
        <li v-for="(item, index) in items" :key="index" style="list-style: none;">
          <span class="d-flex gap-2" @click="toggleOpen(item)">{{ item.label }}<i class="bi bi-chevron-down"></i></span>
          <div v-if="item.isOpen" class="content">
            {{ item.content }}
          </div>
        </li>
      </ul>
    </div> -->
    <p class="">Existem <span>3</span> unidades de produção perto de si</p>
    <!-- <div>
      <ul>
        <li style="list-style: none;" v-for="item in items" :key="item.label">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <i style="font-size: 2.3vh;" class="bi bi-hammer"></i>
              <p class="">{{ item.label }}</p>
            </div>
            <button @click="toggleOpen(item)">Ver mapa</button>
          </div>
          <div v-if="item.isOpen">{{ item.content }}</div>
        </li>
      </ul>
    </div> -->
   
   
   
    <!-- <div class="d-flex" style="background-color: red; height: ;">
        <div class="w-25" style="background-color: green; height: ;">
            <div>
                <img class="w-100" src="https://placehold.jp/150x150.png">
                <img class="w-100" src="https://placehold.jp/150x150.png">
                <img class="w-100" src="https://placehold.jp/150x150.png">
            </div>
        </div>
        <div class="w-75" style="background-color: purple; height: ;">
            <p>O mapa fica aqui</p>
        </div>
    </div> -->
    <div class="d-flex" style="background-color: ; height: ">
    <div class="w-25" style="background-color: ; height: ">
        <div>
            <!-- <img class="w-100" src="https://placehold.jp/150x150.png" @click="updateImage(1)" style="border-bottom: solid 1px #eeeeee;"> -->
            <div @click="updateImage(1)" style="border:solid 2px red;">
                <img class="w-100" src="https://placehold.jp/150x150.png">
                <p class="text-center">Unidade 1</p>
                <p class="text-center">5km</p>
            </div>
            <div @click="updateImage(2)" style="border:solid 2px red;">
                <img class="w-100" src="https://placehold.jp/150x150.png">
                <p class="text-center">Unidade 2</p>
                <p class="text-center">10km</p>
            </div>
            <div @click="updateImage(3)" style="border:solid 2px red;">
                <img class="w-100" src="https://placehold.jp/150x150.png" >
                <p class="text-center">Unidade 3</p>
                <p class="text-center">15km</p>
            </div>
        </div>
    </div>
    <div class="w-75" style="background-color: purple; height: ">
      <img class="" :src="'map' + mapImage + '.png'" :alt="'Map ' + mapImage" style="object-fit: cover; height: 100%; width: 100%;">
    </div>
  </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       items: [
//         {
//           label: 'Unidade 1: 5km',
//           content: 'Mapa da unidade 1',
//           isOpen: false
//         },
//         {
//           label: 'Unidade 2: 10km',
//           content: 'Mapa da unidade 2',
//           isOpen: false
//         },
//         {
//           label: 'Unidade 3: 13km',
//           content: 'Mapa da unidade 3',
//           isOpen: false
//         }
//       ]
//     }
//   },
//   methods: {
//     toggleOpen(item) {
//       item.isOpen = !item.isOpen
//     }
//   }
// }

export default {
  data() {
    return {
        mapImage: 1,
    };
  },
  methods: {
    updateImage(number) {
      this.mapImage = number;
    },
  },
};

</script>

<style>
.content {
  margin-left: 10px;
  padding: 10px;
  background-color: #eee;
}
</style>
