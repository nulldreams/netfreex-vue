<template>
  <section class="our-filmes" id="catalogo">
      <h3 class="title">
          <a href="/filmes">Filmes</a>
      </h3>
      <p>Últimos adicionados</p>
      <hr>
      <div class="loading" v-if="!filmes">
          <img src="../../../assets/img/loader.gif" alt="">
      </div>
      <div class="box" v-if="filmes">
          <div class="card grow" v-for="filme in filmes.slice().reverse().slice(0, 3)" :key="filme.path">
              <div class="capa">
                  <a href=""><img v-bind:src="filme.capa" alt="" class="img-fluid rounded"></a>
              </div>
          </div>
      </div>
  </section>  
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      filmes: [],
      errors: []
    }
  },
  created() {
    axios.get('https://netfreex.herokuapp.com/api/v1/filmes').then(response => {
      this.filmes = response.data.filmes
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style>
.our-filmes {
  background-color: #fff;
}

.our-filmes p {
  font-family: 'GothamRnd-Book', sans-serif;
  text-align: center;
  font-size: 15px;
}

.our-filmes .box {
  display: flex;
  flex-direction: row;
}
</style>
