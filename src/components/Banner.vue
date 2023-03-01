<template>
	<div>
		<b-card class="mx-auto rounded-xl banner" flat overlay img-src="c1.svg">
			<!--TODO decidir se é preciso uma lupa ou se assim está bom -->
			<template #img>
				<img
				src="c1.svg"
				alt="Banner"
				class="img-fluid d-none d-md-block"
				/>
				<img
				src="bra.svg"
				alt="Mobile Banner"
				class="img-fluid d-md-none"
				/>
			</template>
			<div class="d-flex justify-content-center align-items-center h-100 teste">
				<!-- <div class="col-md-6 col-lg-4"> -->
				<div class="col-sm-10 col-md-8 col-lg-4 max-height-130">
					<div class="d-flex flex-column">
						<h1 class="main-title text-center">Descubra o melhor da sua colmeia!</h1>
						<p class="text-center grey-txt">Encontre os melhores produtos da sua comunidade local</p>
						<b-form-input class="rounded-pill search" type="search" placeholder="Pesquisar" />
						
						<!-- <b-input-group class="mt-3">
							<b-form-input class="rounded-pill position-relative" type="search" placeholder="Pesquisar" />
							<b-input-group-text class="rounded-pill position-absolute end-0" style="background-color: #F1B24A; border-color: #F1B24A;"><i class="bi bi-search"></i></b-input-group-text>
						</b-input-group> -->	
					
					</div>
				</div>
			</div>


			<!-- <div class="d-flex justify-content-center align-items-center h-100">
				<div class="col-sm-10 col-md-8 col-lg-6">
				<div class="d-flex flex-column">
					<h1 class="main-title text-center">Descubra o melhor da sua colmeia!</h1>
					<p class="text-center" style="color: #5A5A5A;">Encontre os melhores produtos da sua comunidade local</p>
					<b-form-input class="rounded-pill search" type="search" placeholder="Pesquisar" />
				</div>
				</div>
			</div> -->

			
		</b-card>
	</div>
</template>

<style>
	.search{
		border: solid 2px #F1B24A !important;
	}

	.main-title{
		color:#164A41;
		font-weight: 600;
		font-family: 'DM Serif Display', serif;
	}

	/* Resolve mais ou menos o problema do conteúdo 
	   do banner no modo mobile */
	.max-height-130{
		max-height: 130%;
	}
</style>