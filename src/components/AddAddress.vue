<template>
  <div class="form">
    <div class="form-group">
      <p class="titulo dgreen-txt main-txt">Adicionar novo endereço de envio</p>
      <br />
      <label for="name">Nome:</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="Digite o seu nome"
        v-model="name"
      />
    </div>
    <br />
    <div class="form-group row">
      <div class="col-md-4">
        <label for="numero">Número:</label>
        <input
          type="text"
          class="form-control"
          id="numero"
          placeholder="Digite o número da casa"
          ref="number"
          required
          v-model="num"
        />
      </div>
      <div class="col-md-4">
        <label for="porta">Porta:</label>
        <input
          type="text"
          id="porta"
          class="form-control"
          placeholder="Digite a porta"
          ref="door"
          required
          v-model="door"
        />
      </div>
      <div class="col-md-4">
        <label for="andar">Andar:</label>
        <input
          type="text"
          class="form-control"
          id="andar"
          placeholder="Digite o andar"
          ref="floor"
          required
          v-model="andar"
        />
      </div>
      <br />
      <div class="col-md-4">
        <br />
        <label for="codigo_postal">Código Postal:</label>
        <input
          type="text"
          class="form-control"
          id="codigo_postal"
          placeholder="Digite o código postal"
          ref="zipCode"
          required
          v-model="zip"
        />
      </div>
    </div>
    <br />
    <div class="col-md-4">
      <label for="rua">Rua:</label>
      <input
        type="text"
        class="form-control"
        id="rua"
        placeholder="Digite a rua"
        ref="street"
        required
        v-model="rua"
      />
    </div>
    <br />
    <div class="form-group row">
      <div class="col-md-4">
        <label for="freguesia">Freguesia:</label>
        <input
          type="text"
          class="form-control"
          id="freguesia"
          placeholder="Digite a freguesia"
          ref="parish"
          required
          v-model="freguesia"
        />
      </div>
      <div class="col-md-4">
        <label for="concelho">Concelho:</label>
        <input
          type="text"
          class="form-control"
          id="concelho"
          placeholder="Digite o concelho"
          ref="county"
          required
          v-model="concelho"
        />
      </div>
      <div class="col-md-4">
        <label for="distrito">Cidade:</label>
        <input
          type="text"
          class="form-control"
          id="cidade"
          placeholder="Digite a cidade "
          ref="city"
          required
          v-model="cidade"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <div class="col-md-4">
        <label for="distrito">Distrito:</label>
        <input
          type="text"
          class="form-control"
          id="distrito"
          placeholder="Digite o distrito"
          ref="district"
          required
          v-model="distrito"
        />
      </div>
      <div class="col-md-4">
        <label for="latitude">Latitude:</label>
        <input
          type="text"
          class="form-control"
          id="latitude"
          placeholder="Digite a latitude"
          ref="latitude"
          required
          v-model="latitude"
        />
      </div>
      <div class="col-md-4">
        <label for="longitude">Longitude:</label>
        <input
          type="text"
          class="form-control"
          id="longitude"
          placeholder="Digite a longitude"
          ref="longitude"
          required
          v-model="longitude"
        />
      </div>
    </div>
    <br />
    <br />
    <div id="error-container"></div>
    <!-- Campos de formulário aqui -->
    <PrimeButton rounded @click="handleSubmit"> Guardar endereço </PrimeButton>
  </div>
</template>

<script lang="ts">
import { postNewAdress } from '../api/consumers';
import Swal from 'sweetalert2';
import { CreateAddress } from '../types';
import { AxiosError } from 'axios';
import PrimeButton from 'primevue/button';

export default {
  data() {
    return {
      address2: {} as CreateAddress,
      isChecked: false, // Inicialmente o checkbox não estará selecionado
      name: '', // Propriedade para validar o campo "Nome"
      door: '',
      num: '',
      andar: '',
      zip: '',
      rua: '',
      freguesia: '',
      concelho: '',
      cidade: '',
      distrito: '',
      longitude: '',
      latitude: '',
    };
  },
  components: {
    PrimeButton,
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
      } = this.$refs as {
        door: HTMLInputElement | undefined;
        floor: HTMLInputElement | undefined;
        number: HTMLInputElement | undefined;
        zipCode: HTMLInputElement | undefined;
        street: HTMLInputElement | undefined;
        parish: HTMLInputElement | undefined;
        county: HTMLInputElement | undefined;
        city: HTMLInputElement | undefined;
        district: HTMLInputElement | undefined;
        latitude: HTMLInputElement | undefined;
        longitude: HTMLInputElement | undefined;
      };

      // Verifique se todos os campos obrigatórios são preenchidos
      this.address2 = {
        door: door ? door.value : '',
        floor: floor ? parseFloat(floor.value) : 0,
        number: number ? parseFloat(number.value) : 0,
        zipCode: zipCode ? zipCode.value : '',
        street: street ? street.value : '',
        parish: parish ? parish.value : '',
        county: county ? county.value : '',
        city: city ? city.value : '',
        district: district ? district.value : '',
        latitude: latitude ? parseFloat(latitude.value) : 0,
        longitude: longitude ? parseFloat(longitude.value) : 0,
      };

      if (!this.name) {
        this.showError('Por favor, preencha o campo "Nome".');
        return;
      }
      if (!Number.isInteger(Number(this.num)) || !this.num) {
        this.showError(
          'Por favor, preencha o numero da casa com um valor inteiro.'
        );
        return;
      }
      if (
        !['frente', 'direita', 'esquerda', 'a', 'b', 'c', 'd'].includes(
          this.door.toLowerCase()
        )
      ) {
        this.showError(
          'Por favor, preencha o campo "Porta" com uma das opções: "frente", "direita", "esquerda", "A", "B", "C", "D".'
        );
        return;
      }
      if (!this.andar) {
        this.showError('Por favor, preencha o andar.');
        return;
      }
      if (!Number.isInteger(Number(this.andar))) {
        this.showError('Por favor, preencha o andar com um número inteiro.');
        return;
      }
      if (!this.zip) {
        this.showError('Por favor, preencha o campo "Código Postal".');
        return;
      }
      if (!this.rua) {
        this.showError('Por favor, preencha o campo "Rua".');
        return;
      }
      if (Number.isInteger(Number(this.rua))) {
        this.showError(
          'Por favor, preencha o campo "Rua" com valores válidos, não deve conter números.'
        );
        return;
      }
      if (!this.freguesia) {
        this.showError('Por favor, preencha o campo "Freguesia".');
        return;
      }
      if (Number.isInteger(Number(this.freguesia))) {
        this.showError(
          'Por favor, preencha o campo "Freguesia" com valores válidos, não deve conter números.'
        );
        return;
      }
      if (!this.concelho) {
        this.showError('Por favor, preencha o campo "Concelho".');
        return;
      }
      if (Number.isInteger(Number(this.concelho))) {
        this.showError(
          'Por favor, preencha o campo "Concelho" com valores válidos, não deve conter números.'
        );
        return;
      }
      if (!this.cidade) {
        this.showError('Por favor, preencha o campo "Cidade".');
        return;
      }
      if (Number.isInteger(Number(this.cidade))) {
        this.showError(
          'Por favor, preencha o campo "Cidade" com valores válidos, não deve conter números.'
        );
        return;
      }
      if (!this.distrito) {
        this.showError('Por favor, preencha o campo "Distrito".');
        return;
      }
      if (Number.isInteger(Number(this.distrito))) {
        this.showError(
          'Por favor, preencha o campo "Distrito" com valores válidos, não deve conter números.'
        );
        return;
      }
      if (!this.latitude) {
        this.showError('Por favor, preencha o campo "Latitude".');
        return;
      }

      if (this.$store.state.user?.user?.id) {
        postNewAdress(this.$store.state.user.user.id, this.address2)
          .then(() => {
            Swal.fire({
              title: 'Endereço salvo!',
              text: 'O endereço foi adicionado à sua lista de endereços com sucesso.',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#797dc3',
              cancelButtonColor: '#797dc3',
              confirmButtonText: 'Continuar a compra',
              cancelButtonText: 'Adicionar outro endereço',
            }).then((result) => {
              if (result.isConfirmed) {
                try {
                  window.location.reload();
                  // Lógica adicional após confirmação
                } catch (error) {
                  console.log('erro ao redirecionar para o carrinho');
                }
              }
            });
          })
          // Verificar se a resposta indica um erro
          .catch((error: AxiosError) => {
            if (error.response && error.response.status === 400) {
              const errorDiv = document.createElement('div');
              errorDiv.classList.add('alert', 'alert-warning');
              errorDiv.textContent =
                'É preciso preencher todos os campos para poder salvar o endereço!';

              // Adicionar a div ao DOM
              const errorContainer = document.getElementById('error-container');
              if (errorContainer) {
                errorContainer.appendChild(errorDiv);
                throw new Error('Erro de requisição: dados inválidos');
              }
            }
          });
      }
    },
    showError(message: string) {
      const errorContainer = document.getElementById('error-container');
      if (errorContainer) {
        errorContainer.innerHTML = '';
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-danger');
        alert.innerHTML = message;
        errorContainer.appendChild(alert);
      }
    },
  },
};
</script>

<style scoped>
.label,
input {
  margin-top: 0px !important;
}
label,
input,
button,
a {
  margin-right: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 15px;
}
#andar,
#cidade,
#numero,
#longitude {
  width: 100%;
  max-width: 350px;
}
#name,
#codigo_postal,
#rua {
  width: 100%;
  max-width: 340px;
}
.titulo {
  text-align: center;
  font-size: 35px;
  font-family: 'DM Serif Display';
}
.form {
  width: 65%;
  display: block;
  margin: auto;
  /* background-color: red; */
  margin-top: 5vh;
}
a {
  font-size: 30px;
  font-style: bold;
}
button {
  margin-top: 20px;
}

.guardar-btn {
  border: 2px solid #f1b24a;
  padding: 0.8em !important;
}
.guardar-btn:hover {
  background-color: #fcfcfc;
  border: 2px solid #e19e32;
}
/* Estilos específicos para dispositivos móveis */
@media (max-width: 768px) {
  /* Substitua 768px pelo valor desejado para a largura de tela */
  .form {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    height: auto; /* Ajuste a altura para telas menores */
  }
  #andar,
  #porta,
  #cidade,
  #rua,
  #distrito,
  #numero,
  #codigo_postal,
  #concelho,
  #distrito,
  #longitude,
  #latitude,
  #name,
  #freguesia {
    max-width: 95%;
  }
  input {
    width: 90%; /* Ajuste a largura do input para preencher a largura do elemento pai */
    margin-right: 10px !important; /* Adicione espaço à direita do input */
  }
}
</style>
