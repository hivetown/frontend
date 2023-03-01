<template>
    <!-- TODO fazer com que a imagem e o texto sejam automáticos -->
    <!-- Todas as imagens têm de ser do mesmo tamanho -->
    <b-card class="category-card" :img-src="image" img-alt="Imagem de exemplo">
        <div class="card-img-overlay d-flex justify-content-center text-white">
            <h5 class="card-title text-center">{{ title }}</h5>
        </div>
    </b-card>

</template>

<style>

    .category-card{
        width: 17vh;   
    }

    .category-card img{
        border-radius: 1.3em !important;
        max-height: 22vh;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }

</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>