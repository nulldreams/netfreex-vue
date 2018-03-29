<template>
  <section class="our-series" id="catalogo">
      <h3 class="title">
          <a href="/series">Séries</a>
      </h3>
      <p>Últimas adicionadas</p>
      <hr>
      <div class="loading" v-if="!series">
          <img src="../../../assets/img/loader.gif" alt="">
      </div>
      <div class="box" v-if="series">
          <div class="card grow" v-for="serie in series.slice().reverse().slice(0, 3)" :key="serie.path">
              <div class="capa">
                  <a href=""><img v-bind:src="serie.capa" alt="" class="img-fluid rounded"></a>
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
      series: [],
      errors: []
    }
  },
  created() {
    axios.get('https://netfreex-series.herokuapp.com/api/v1/series').then(response => {
      this.series = response.data.series
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style>
.our-series {
  background-color: #fff;
}

.our-series p {
  font-family: 'GothamRnd-Book', sans-serif;
  text-align: center;
  font-size: 15px;
}

.our-series .box {
  display: flex;
  flex-direction: row;
}
</style>
