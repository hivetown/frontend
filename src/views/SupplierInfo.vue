<template>
  <div class="d-flex parent p-4" style="background-color: ; height: ">
    <!-- <div class="w-25" style="background-color:; height:; border-right: solid 2px #eeeeee;"> -->
    <div class="w-25 mt-4" style="background-color: ; height: ">
      <div class="" style="background-color: ">
        <!-- Imagem do produtor -->
        <img
          class="d-block mx-auto w-50"
          src="https://placehold.jp/150x150.png"
          style="border-radius: 50%; border: 5px solid #164a41"
        />
      </div>
      <!-- <h3 class="text-center mt-4 mb-3">Nome</h3> -->
    </div>
    <!-- Sobre -->
    <div
      class="w-75 p-4 px-5"
      style="background-color: ; height: ; flex-direction: column"
    >
      <div id="info" class="mb-4" style="border-bottom: solid 1px #e4e4e4">
        <h3 class="mb-4 dgreen-txt">Nome</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quam
          veniam reprehenderit quasi numquam ratione fuga vel, eum soluta
          reiciendis placeat corrupti odio consequatur alias nisi deserunt
          laudantium a doloremque!
        </p>
      </div>

      <div class="">
        <div class="d-flex gap-2 grey-txt">
          <i class="bi bi-telephone-fill yellow-txt"></i>
          <p class="fw-bold">Telefone:</p>
          <span>000 000 000</span>
        </div>
        <div class="d-flex gap-2 grey-txt">
          <i class="bi bi-envelope-fill yellow-txt"></i>
          <p class="fw-bold">Email:</p>
          <span>email@email.com</span>
        </div>
        <div class="d-flex gap-2 grey-txt">
          <i class="bi bi-receipt yellow-txt"></i>
          <p class="fw-bold">VAT:</p>
          <span>000000</span>
        </div>
      </div>
    </div>
  </div>

  <div class="parent px-5">
    <h5 class="">Unidades de produção: <span>(3)</span></h5>

    <div class="d-flex" style="background-color: ; height: ">
      <div class="w-25" style="background-color: ; height: ">
        <div>
          <div @click="updateImage(1)" style="border: solid 2px red">
            <img class="w-100" src="https://placehold.jp/150x150.png" />
            <p class="text-center">Unidade 1</p>
            <p class="text-center">Rua das rosas</p>
            <p class="text-center">5km de si</p>
          </div>
          <div @click="updateImage(2)" style="border: solid 2px red">
            <img class="w-100" src="https://placehold.jp/150x150.png" />
            <p class="text-center">Unidade 2</p>
            <p class="text-center">Rua das rosas</p>
            <p class="text-center">10km de si</p>
          </div>
          <div @click="updateImage(3)" style="border: solid 2px red">
            <img class="w-100" src="https://placehold.jp/150x150.png" />
            <p class="text-center">Unidade 3</p>
            <p class="text-center">Rua das rosas</p>
            <p class="text-center">15km de si</p>
          </div>
        </div>
      </div>
      <div class="w-75" style="background-color: purple; height: ">
        <!-- TODO - trocar src das imagens por sources do mapa (ver como) -->
        <img
          class=""
          :src="'map' + mapImage + '.png'"
          :alt="'Map ' + mapImage"
          style="object-fit: cover; height: 100%; width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      mapImage: 1,
    };
  },
  props: {
    producerId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateImage(number: number) {
      this.mapImage = number;
    },
  },

  async beforeMount() {},
};
</script>

<style>
.content {
  margin-left: 10px;
  padding: 10px;
  background-color: #eee;
}

#info h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 3.5vh;
}
</style>
