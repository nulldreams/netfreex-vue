<template>
  <section class="animes-section">
    <div class="form-group" v-if="shows.length > 0">
        <input type="text" class="form-control" ng-model="pesquisa" placeholder="Pesquisa">
    </div>
    <div class="loading" v-if="!shows.length > 0">
        <img src="/img/loader.gif" alt="">
    </div>
    <div class="box" v-if="shows.length > 0">
        <!-- <div class="col-md-4 capas grow" ng-repeat="filme in filmes.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage)) | filterBy:['nome', 'info.qualidade', 'info.audio', 'info.lancamento', 'sinopse']:pesquisa">         -->
        <div class="item grow" v-for="serie in shows" :key="serie.path">
            <a href="#">
                <img class="img-fluid rounded mx-auto d-block" v-bind:src="serie.capa">
            </a>
            <p class="titulo">{{serie.nome}}</p>
        </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'shows',
    data() {
      return {

      }
    },
    props: {
      shows: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style>
.animes-section {
  background-color: #fff;
  margin-top: 4%;
}

.animes-section .box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.animes-section img {
  width: 200px;
  height: 300px;
}

.animes-section .item {
  margin: 10px;
}

.animes-section .item .titulo {
  width: 200px;
}
</style>
