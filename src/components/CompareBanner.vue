<template>
    <div class="compare-banner d-flex align-items-center">
        <div class="parent d-flex justify-content-center align-items-center gap-4" style="background-color: ; height: 10vh;">
            <div class="d-flex flex-column">
                <h5 class="dgreen-txt">Comparador <span>(2)</span></h5>
                <p class="grey-txt">Ainda podes adicionar <span>1</span> produto</p>
            </div>
            <div class="d-flex gap-4 ">
                <div class="prod-container d-flex justify-content-center align-items-center">
                    <!-- <i class="bi bi-x-lg"></i> -->
                </div>
                <div class="prod-container d-flex justify-content-center align-items-center">
                    <!-- <i class="bi bi-x-lg"></i> -->
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <button type="button" class="btn btn-secondary rounded-pill" v-b-tooltip.hover title="Comparar produto">
                    <i class="bi bi-arrow-left-right"></i> Comparar
                </button>
                <a href="#">Limpar tudo</a>
            </div>
            
           
        </div>
    </div>

</template>

<style>
    .compare-banner {
        /* background-color: red; */
        background-color:#f3f3f3;
        height: 15vh;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10000;
    }

    .prod-container{
        background-color: #c0c0c0 !important;
        height: 10vh;
        width: 10vh;
        border: 1px dashed #f3f3f3 !important;
        border-radius: 0.5em;
    }

    .prod-container i{
        font-size: 1.5em;
        color: #eeeeee;
    }
</style>
