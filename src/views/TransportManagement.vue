<template>
	<div class="root">
		<div class="wrapper-mains">
			<h1>*Nome da Empresa* - Gestão de Transportes</h1>
			<hr />
			<br />

			<h3 class="parent dgreen-txt">Transportes Registados</h3>
			<br />

			<b-row>
				<b-col>
					<h5 class="parent dgreen-txt">Em espera por ordem</h5>
					<hr />
                    <!-- Barra de Pesquisa -->
					<div>
							<b-input-group size="sm">
								<b-form-input id="search-input" v-model="searchTerm" type="text" placeholder="Type your search term here..."></b-form-input>
								<b-input-group-append>
									<b-button variant="primary" @click="search">Search</b-button>
								</b-input-group-append>
							</b-input-group>
					</div>
                    <!-- Lista de Encomendas -->
					<b-list-group>
						<b-list-group-item href="#some-link">ID 27535ABC</b-list-group-item>
						<b-list-group-item href="#" active>ID 68794VCS</b-list-group-item>
						<b-list-group-item href="#">ID 98461DEF</b-list-group-item>
						<b-list-group-item href="#foobar" disabled>ID 2753535TABC</b-list-group-item>
					</b-list-group>
				</b-col>
				<b-col>
					<h5 class="parent dgreen-txt">Pedidos por entregar</h5>
					<hr />
				</b-col>
				<b-col>
					<h5 class="parent dgreen-txt">A entregar</h5>
					<hr />
				</b-col>
			</b-row>
			<br />

			<!--TODO: Ver como fazer um espacamento aqui-->

			<hr />

			<h3 class="parent dgreen-txt">Adicionar Novo Transporte</h3>

			<div class="d-flex justify-content-between mt-3">
				<!--Faltam os v-model="form.name" dentro dos b-form-input-->
				<b-form>
					<!--@submit="onSubmit" @reset="onReset" v-if="show">-->
					<b-row>
						<b-col>
							<b-form-group id="input-group-1" label="ID:" label-for="input-1">
								<b-form-input id="input-1" placeholder="ID do transporte" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-2" label="Marca:" label-for="input-2">
								<b-form-input id="input-2" placeholder="Marca do transporte" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-3" label="Capacidade:" label-for="input-3">
								<b-form-input id="input-3" placeholder="Capacidade do transporte" required></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>
					<div class="d-flex justify-content-center pd-2">
						<b-button type="submit">Adicionar</b-button>
						<b-button type="reset" variant="danger">Recomeçar</b-button>
					</div>
				</b-form>
			</div>

			<hr />

			<!------------------------------------------------------------------------------>
			<b-row>
				<b-col> </b-col>
				<b-col class="d-flex align-items-center justify-content-center">
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

	<!------------------------------------------------------------------------------>
</template>

<script setup lang="ts">
	// Este componente é inútil para esta página. O seu conteúdo vai dar jeito para
	//fazer a página com as informações de cada camião
	import TransportInfo from "@/components/TransportInfo.vue";
</script>
<style scoped>
	.wrapper-mains{
	    height: auto;
	    background: white;
	    text-align: center;
	    margin: auto;
	    padding: 20px  ;
	}
	.textarea{
	    display: block;
	    width: 100%;
	    height: 70px;
	    border-radius: 5px;
	}
	.tabela{
	  margin-top: 180px;
	}
	.titulo {
	  font-size: 20px;
	}
	@media (max-width: 660px) {
	  .titulo {
	  font-size: 25px;
	  text-align: center !important;
	}
	.resumo {
	  margin-top: 10px;
	  text-align: right;
	  margin-right: 40px;
	}
	}
</style>
