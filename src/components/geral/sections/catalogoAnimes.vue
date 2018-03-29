<template>
  <section class="our-animes" id="catalogo">
      <h3 class="title">
          <a href="/animes">Animes</a>
      </h3>
      <p>Últimos adicionados</p>
      <hr>
      <div class="loading" v-if="!animes">
          <img src="../../../assets/img/loader.gif" alt="">
      </div>
      <div class="box" v-if="animes">
          <div class="card grow" v-for="anime in animes.slice().reverse().slice(0, 3)" :key="anime.path">
              <div class="capa">
                  <a href=""><img v-bind:src="anime.capa" alt="" class="img-fluid rounded"></a>
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
      animes: [],
      errors: []
    }
  },
  created() {
    axios.get('https://api-animes.herokuapp.com/api/v1/animes').then(response => {
      this.animes = response.data.animes
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style>
.our-animes {
  background-color: #fff;
}

.our-animes p {
  font-family: 'GothamRnd-Book', sans-serif;
  text-align: center;
  font-size: 15px;
}

.our-animes .box {
  display: flex;
  flex-direction: row;
}
</style>
