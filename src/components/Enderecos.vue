<template> 
<div class="form-group">
    <h3>Novo endereço de envio</h3>
  <label for="name"><p>Nome:</p></label>
  <input type="text" class="form-control" id="name" placeholder="Digite o seu nome">
</div>

<div class="form-group row">
  <div class="col-md-4">
    <label for="porta"><p>Porta:</p></label>
    <input type="text" class="form-control" id="porta" placeholder="Digite a porta">
  </div>
  <div class="col-md-4">
    <label for="andar"><p>Andar:</p></label>
    <input type="text" class="form-control" id="andar" placeholder="Digite o andar">
  </div>
  <div class="col-md-4">
    <label for="codigo_postal"><p>Código Postal:</p></label>
    <input type="text" class="form-control" id="codigo_postal" placeholder="Digite o código postal">
  </div>
</div>

<div class="form-group">
  <label for="rua"><p>Rua:</p></label>
  <input type="text" class="form-control" id="rua" placeholder="Digite a rua">
</div>

<div class="form-group row">
  <div class="col-md-4">
    <label for="freguesia"><p>Freguesia:</p></label>
    <input type="text" class="form-control" id="freguesia" placeholder="Digite a freguesia" required>
  </div>
  <div class="col-md-4">
    <label for="concelho"><p>Concelho:</p></label>
    <input type="text" class="form-control" id="concelho" placeholder="Digite o concelho" required>
  </div>
  <div class="col-md-4">
    <label for="distrito"><p>Distrito:</p></label>
    <input type="text" class="form-control" id="distrito" placeholder="Digite o distrito" required>
  </div>
</div>

<div class="form-group row">
  <div class="col-md-6">
    <label for="latitude"><p>Latitude:</p></label>
    <input type="text" class="form-control" id="latitude" placeholder="Digite a latitude" required>
  </div>
  <div class="col-md-6">
    <label for="longitude"><p>Longitude:</p></label>
    <input type="text" class="form-control" id="longitude" placeholder="Digite a longitude" required>
  </div>
</div>

<div class="form-group row">
  <div class="col-md-6">
    <label for="telemovel"><p>Nº Telemóvel:</p></label>
    <input type="text" class="form-control" id="telemovel" placeholder="Digite o número de telemóvel" required>
  </div>
  <div class="col-md-6">
    <label for="nif"><p>NIF:</p></label>
    <input type="text" class="form-control" id="nif" placeholder="Digite o NIF" required>
  </div>
</div>

   
  </template>
  
  <script setup lang="ts">

  </script>
  <style scoped>

</style>