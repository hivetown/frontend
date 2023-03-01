<template>
  <div>
    <h1>Sobre</h1>
    <p>Esta é a página "Sobre".</p>

    <h2>Voltar à home:</h2>
    <!-- Home é o name que está no router.ts -->
    <RouterLink :to="{ name: 'Home' }">Início</RouterLink>
    <br />

    ou com caminho absoluto:
    <RouterLink to="/">Inicio</RouterLink>
    <br />

    Depois dá para meter elementos dentro do RouterLink, como por exemplo:
    <RouterLink :to="{ name: 'Home', query: { ola: 'asdads' } }">
      <button type="button" class="btn btn-primary">Início</button>
    </RouterLink>
    <br />
  </div>
</template>
