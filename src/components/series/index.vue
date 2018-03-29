<template>
  <div>
    <shows v-bind:shows="series"/>
  </div>
</template>
<script>
import axios from "axios";
import shows from '@/components/geral/sections/shows';

export default {
  name: "Series",
  components: {
    shows
  },
  data() {
    return {
      series: [],
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
          `https://netfreex-series.herokuapp.com/api/v1/series`
        )
        .then(response => {
          this.series = response.data.series;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>