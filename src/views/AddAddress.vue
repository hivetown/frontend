<template> 
<div class="form">
    <div class="form-group">
      
        <p class="titulo">Adicionar novo endereço de envio</p>
        <br>
      <label for="name"><p>Nome:</p></label>
      <input type="text" class="form-control" id="name" placeholder="Digite o seu nome" >
    </div>
    
    <div class="form-group row">
      <div class="col-md-4">
        <label for="numero"><p>Número:</p></label>
        <input type="text" class="form-control" id="numero" placeholder="Digite o número da casa" ref="number" required>
      </div>
      <div class="col-md-4">
        <label for="porta"><p>Porta:</p></label>
        <input type="text" class="form-control" id="porta" placeholder="Digite a porta" ref="door" required>
      </div>
      <div class="col-md-4">
        <label for="andar"><p>Andar:</p></label>
        <input type="text" class="form-control" id="andar" placeholder="Digite o andar" ref="floor" required>
      </div>
      <div class="col-md-4">
        <label for="codigo_postal"><p>Código Postal:</p></label>
        <input type="text" class="form-control" id="codigo_postal" placeholder="Digite o código postal" ref="zipCode" required>
      </div>
    </div>
    
    <div class="col-md-4">
      <label for="rua"><p>Rua:</p></label>
      <input type="text" class="form-control" id="rua" placeholder="Digite a rua" ref="street" required>
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
      
    </div>
    
    <div class="form-group row">
      <div class="col-md-4">
        <label for="distrito"><p>Distrito:</p></label>
        <input type="text" class="form-control" id="distrito" placeholder="Digite o distrito" ref="district" required>
      </div>
      <div class="col-md-4">
        <label for="latitude"><p>Latitude:</p></label>
        <input type="text" class="form-control" id="latitude" placeholder="Digite a latitude" ref="latitude" required>
      </div>
      <div class="col-md-4">
        <label for="longitude"><p>Longitude:</p></label>
        <input type="text" class="form-control" id="longitude" placeholder="Digite a longitude" ref="longitude" required>
      </div>
    </div>
    
<br>
<br>
          <div id="error-container"></div>

          <!-- Campos de formulário aqui -->

          <button type="submit" class="btn btn-outline-secondary btn-sm" @click="handleSubmit">Adicionar endereço</button>
         
    
        </div>  
      </template>
      
      <script lang="ts">
      import { postNewAdress } from '../api/consumers';
      import Swal from 'sweetalert2';
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
        //adiciona o novo endereco
        //TODO trocar para user logado
  


        postNewAdress(4, this.address)
        .then((response) => {
          Swal.fire({
          title: 'Endereço salvo!',
          text: 'O endereço foi adicionado à sua lista de endereços com sucesso.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#797dc3',
          cancelButtonColor: '#797dc3',
          confirmButtonText: 'Continuar a compra',
          cancelButtonText: 'Adicionar outro endereço'
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              window.location.href = '/createOrder';
              // Lógica adicional após confirmação
            } catch (error) {
              console.log('erro ao redirecionar para o carrinho');
            }
          }
        });
        })
        // Verificar se a resposta indica um erro
        .catch(error => {
  if (error.response && error.response.status === 400) {
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('alert', 'alert-warning');
          errorDiv.textContent = "É preciso preencher todos os campos para poder salvar o endereço!";

          // Adicionar a div ao DOM
          const errorContainer = document.getElementById('error-container'); // substitua pelo ID do elemento onde deseja exibir a mensagem de erro
          errorContainer.appendChild(errorDiv);

          // Lançar uma exceção para interromper a execução do código
          throw new Error("Erro de requisição: dados inválidos");
  }
});
         
        
      
      }
    }
  }
    
      </script>
<style scoped>
    label, input, button, a{
      margin-right: 15px;
      margin-left: 15px;
    }
    #andar, #cidade, #longitude {
      width: 100%;
      max-width: 350px;
    }
    .titulo {
      text-align: center;
      font-size: 35px;
      font-family: "DM Serif Display";
    }
    .form {
      margin-left: 50px;
      margin-right: 50px;
      background-color: beige;
      border-radius: 10px;
    }
    a {
      font-size: 30px;
      font-style: bold;
    }
    button {
      margin-top: 20px;
    }
    /* Estilos específicos para dispositivos móveis */
    @media (max-width: 768px) { /* Substitua 768px pelo valor desejado para a largura de tela */
        .form {
            margin-left: 10px; /* Ajuste a margem esquerda para telas menores */
            margin-right: 10px; /* Ajuste a margem direita para telas menores */
            height: auto; /* Ajuste a altura para telas menores */
        }
        #andar, #porta, #cidade, #rua, #distrito, #numero, #codigo_postal, #concelho, #distrito, #longitude, #latitude, #name, #freguesia {
          max-width: 300px;
        }
        input {
            width: 90%; /* Ajuste a largura do input para preencher a largura do elemento pai */
            margin-right: 10px !important; /* Adicione espaço à direita do input */
        }
    }

</style>