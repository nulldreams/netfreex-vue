<template>
  <div>
    <section class="hero wave">
        <div class="titulo">
            <h3>Ta afim de curtir uma série no fim de semana?</h3>
            <p>O
                <strong>Netfreex</strong> é o melhor lugar para você!</p>
            <div class="more">
                <a href="#catalogo"><p class="pulse">Confira o nosso catálogo</p></a>
            </div>
        </div>
    </section>   
    <!-- <catalogo-filmes/> -->
    <catalogo-series/>
    <catalogo-animes/>
  </div>
</template>

<script>
import catalogoSeries from '@/components/geral/sections/catalogoSeries';
import catalogoAnimes from '@/components/geral/sections/catalogoAnimes';
import catalogoFilmes from '@/components/geral/sections/catalogoFilmes';

export default {
  name: 'Principal',
  components: {
      catalogoSeries,
      catalogoAnimes,
      catalogoFilmes
  }
}
</script>

<style>
</style>
