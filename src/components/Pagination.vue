<!-- TODO - este componente deveria usar o URL para os valores. Uma vez que isso ainda não está definido aqui 
            fazemos uma versão que ainda não usa o router mas que depois temos de mudar -->
<template>
  <div class="overflow-auto">
    <b-pagination :total-rows="6" :per-page="24"></b-pagination>
    <p class="mt-3">Current Page: 1</p>
  </div>
</template>
