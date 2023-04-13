<template> 
    <div class="form-group">
        <h3>Novo endereço de envio</h3>
      <label for="name"><p>Nome:</p></label>
      <input type="text" class="form-control" id="name" placeholder="Digite o seu nome" >
    </div>
    
    <div class="form-group row">
      <div class="col-md-4">
        <label for="porta"><p>Porta:</p></label>
        <input type="text" class="form-control" id="porta" placeholder="Digite a porta" ref="door">
      </div>
      <div class="col-md-4">
        <label for="andar"><p>Andar:</p></label>
        <input type="text" class="form-control" id="andar" placeholder="Digite o andar" ref="floor">
      </div>
      <div class="col-md-4">
        <label for="codigo_postal"><p>Código Postal:</p></label>
        <input type="text" class="form-control" id="codigo_postal" placeholder="Digite o código postal" ref="zipCode">
      </div>
    </div>
    
    <div class="form-group">
      <label for="rua"><p>Rua:</p></label>
      <input type="text" class="form-control" id="rua" placeholder="Digite a rua" ref="street">
    </div>
    
    <div class="form-group row">
      <div class="col-md-4">
        <label for="freguesia"><p>Freguesia:</p></label>
        <input type="text" class="form-control" id="freguesia" placeholder="Digite a freguesia" ref="parish" required>
      </div>
      <div class="col-md-4">
        <label for="concelho"><p>Concelho:</p></label>
        <input type="text" class="form-control" id="concelho" placeholder="Digite o concelho" ref="county" required>
      </div>
      <div class="col-md-4">
        <label for="distrito"><p>Cidade:</p></label>
        <input type="text" class="form-control" id="cidade" placeholder="Digite a cidade " ref="city" required>
      </div>
      <div class="col-md-4">
        <label for="distrito"><p>Distrito:</p></label>
        <input type="text" class="form-control" id="distrito" placeholder="Digite o distrito" ref="district" required>
      </div>
    </div>
    
    <div class="form-group row">
      <div class="col-md-6">
        <label for="latitude"><p>Latitude:</p></label>
        <input type="text" class="form-control" id="latitude" placeholder="Digite a latitude" ref="latitude" required>
      </div>
      <div class="col-md-6">
        <label for="longitude"><p>Longitude:</p></label>
        <input type="text" class="form-control" id="longitude" placeholder="Digite a longitude" ref="longitude" required>
      </div>
    </div>
    
    <div class="form-group row">
      <div class="col-md-6">
        <label for="telemovel"><p>Nº Telemóvel:</p></label>
        <input type="text" class="form-control" id="telemovel" placeholder="Digite o número de telemóvel" ref="number" required>
      </div>
      <div class="col-md-6">
        <label for="nif"><p>NIF:</p></label>
        <input type="text" class="form-control" id="nif" placeholder="Digite o NIF" required>
      </div>
    </div>
          <!-- Campos de formulário aqui -->
          <button type="submit" class="btn btn-outline-secondary btn-sm"   @click="handleSubmit">Salvar endereço</button>
         
    
       
      </template>
      
      <script lang="ts">
      import { postNewAdress } from '../api/consumers';
      import { Address } from '../types/interfaces';
    
      export default {
        props: {
        endereco: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          address: {} as Address,
          isChecked: false // Inicialmente o checkbox não estará selecionado
        };
      },
      methods: {
        handleSubmit() {
    const {
        door,
        floor,
        number,
        zipCode,
        street,
        parish,
        county,
        city,
        district,
        latitude,
        longitude,
    } = this.$refs;
console.log(this.$refs.door.value);
    // Verifique se todos os campos obrigatórios são preenchidos
        this.address = {
            door: door ? this.$refs.door.value : '',
            floor: floor ? this.$refs.floor.value : '',
            number: number ? this.$refs.number.value : '',
            zipCode: zipCode ? this.$refs.zipCode.value : '',
            street: street ? this.$refs.street.value : '',
            parish: parish ? this.$refs.parish.value : '',
            county: county ? this.$refs.county.value : '',
            city: city ? this.$refs.city.value : '',
            district: district ? this.$refs.district.value : '',
            latitude: latitude ? parseFloat(this.$refs.latitude.value) : 0,
            longitude: longitude ? parseFloat(this.$refs.longitude.value) : 0,
        };
        
        console.log(this.address);
        try {
        //adiciona o novo endereco
        const responseAddAddress = postNewAdress(1, this.address);
        } catch (error) {
            console.log("erro ao adicionar novo endereco");
        }
   
}

      }
    };
    
      </script>
      <style scoped>
    
    </style>