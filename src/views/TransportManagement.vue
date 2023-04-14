<template>
    <div class="" style="width: 100%">
        <h2 class="parent dgreen-txt">Gestão de Transportes</h2>
        <br>

        <h3 class="parent dgreen-txt">Transportes Registados</h3>
        <br>

        <b-row>
            <b-col>
                <h5 class="parent dgreen-txt">Em espera por ordem</h5>

            </b-col>
            <b-col>
                <h5 class="parent dgreen-txt">Pedidos por entregar</h5>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <h5 class="parent dgreen-txt">A entregar</h5>
            </b-col>
        </b-row>
        <br>

        <h3 class="parent dgreen-txt">Adicionar Novo Transporte</h3>

        <div class="d-flex justify-content-between mt-3">
            <!--Faltam os v-model="form.name" dentro dos b-form-input-->
            <b-form> <!--@submit="onSubmit" @reset="onReset" v-if="show">-->
                <b-row>
                    <b-col>
                        <b-form-group id="input-group-1" label="ID:" label-for="input-1">
                            <b-form-input
                                id="input-1"
                                placeholder="ID do transporte"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-2" label="Marca:" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                placeholder="Marca do transporte"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group id="input-group-3" label="Capacidade:" label-for="input-3">
                            <b-form-input
                                id="input-3"
                                placeholder="Capacidade do transporte"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <div class="d-flex justify-content-center pd-2">
                    <b-button type="submit">Adicionar</b-button>
                    <b-button type="reset" variant="danger">Recomeçar</b-button>
                </div>
            </b-form>
        </div>

      <div>


<!------------------------------------------------------------------------------>
		<b-row>
			<b-col>
			</b-col>
			<b-col class="d-flex align-items-center justify-content-center ">
				<div class="text-center">
					<p><b>Preço Total:</b> Bué</p>
					<p><b>Quantidade de Itens:</b> Tantos que não sei</p>
					<p><b>Transportador:</b> Euro Truck Simulator Delivery</p>
					<p><b>Morada:</b> Rua das Ruas Nº943</p>
					<p><b>Modo de Pagamento:</b> PayAmigo</p>
				</div>
			</b-col>
		</b-row>
	  </div>
	  </div>
</template>



<script setup lang="ts">
// Este componente é inútil para esta página. O seu conteúdo vai dar jeito para
//fazer a página com as informações de cada camião
import TransportInfo from "@/components/TransportInfo.vue";
</script>