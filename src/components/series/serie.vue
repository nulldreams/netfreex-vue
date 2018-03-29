<template>
  <div>
    <section class="episodios-section">
        <div class="info-filme">
            <div class="capa">
                <img class="img-fluid rounded mdx-auto" v-bind:src="serie.wallpaper" alt="">
            </div>
            <div class="info">
                <h3>{{serie.nome}}</h3>
                <p>{{serie.sinopse}}</p>
                <p>
                  <span>Gênero</span>: {{serie.generos.join(', ')}}
                </p>
                <p>
                  <span>Lançamento</span>: {{serie.episodios[0].data}}
                </p>
                <p>
                  <span>Último Episódio</span>: {{serie.episodios[serie.episodios.length-1].data}}
                </p>
            </div>
        </div>
        <div class="episodios">
            <!-- <div class="temporadas">
                <div class="item" :key="criador" v-for="temporada in temporadas track by $index">
                    <button type="button" name="button" class="btn grow" ng-click="trocarTemporada($index, $event)">{{temporada}}</button>
                </div>
            </div> -->
            <div class="audio">
                <div class="item">
                    <button style="background-color: #fb3454; color: #fff;" type="button" name="button" ng-click="episodios = true; criador = false; elenco = false; trailer = false;"
                        class="btn grow">Episódios</button>
                </div>
                <div class="item" ng-show="serie.trailer">
                    <button style="background-color: #65def1; color: #fff;" type="button" name="button" ng-click="episodios = false; criador = false; elenco = false; trailer = true;"
                        class="btn grow">Trailer</button>
                </div>
                <div class="item">
                    <button style="background-color: tomato; color: #fff;" type="button" name="button" ng-click="episodios = false; criador = true; elenco = false; trailer = false;"
                        class="btn grow">Criador</button>
                </div>
                <div class="item">
                    <button style="background-color: #a29bfe; color: #fff;" type="button" name="button" ng-click="episodios = false; criador = false; elenco = true; trailer = false;"
                        class="btn grow">Elenco</button>
                </div>
            </div>

            <div class="opcoes" ng-if="trailer">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" v-bind:src="serie.trailer" allowfullscreen></iframe>
                </div>
            </div>

            <div class="opcoes" ng-if="criador">
                <div :key="criador" v-for="criador in serie.criadores" class="grow image-hover-text-container">
                    <img v-bind:src="criador.imagem" alt="" class="img-fluid mx-auto d-block rounded">
                    <p>{{criador.nome}}</p>
                </div>
            </div>

            <div class="opcoes" ng-if="elenco">
                <div :key="ator" v-for="ator in serie.elenco" class="grow image-hover-text-container">
                    <img v-bind:src="ator.imagem" alt="" class="img-fluid mx-auto d-block rounded">
                    <p>{{ator.nome}}</p>
                </div>
            </div>

            <div class="opcoes" ng-if="episodios">
                <ul class="flex-container wrap">
                    <div :key="episodio" v-for="episodio in serie.episodios" class="grow image-hover-text-container">
                        <a href="">
                            <li class="flex-item">
                                <div class="hvrbox">
                                    <img v-bind:src="episodio.opcoes[0].imagem" class="hvrbox-layer_bottom img-fluid rounded">
                                    <div class="hvrbox-layer_top">
                                        <div class="hvrbox-text">{{episodio.numerando}}</div>
                                    </div>
                                </div>
                            </li>
                        </a>
                    </div>
                </ul>
            </div>
        </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Series",
  data() {
    return {
      serie: {},
      errors: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      axios
        .get(
          `https://netfreex-series.herokuapp.com/api/v1/serie/${
            this.$route.params.path
          }/`
        )
        .then(response => {
          this.serie = response.data.serie;
          console.log(response)
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>