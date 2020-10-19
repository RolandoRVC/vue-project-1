<template>
  <div>
    <h2 class="ml-3 mt-2">Listado de items</h2>
    <p v-if="!datos">cargando...</p>
    <v-expansion-panels v-else class="mt-3 ml-auto mr-auto" style="width: 500px">
      <v-expansion-panel v-for="dato in datos" :key="dato.id">
        <v-expansion-panel-header>
         {{dato.id}} - {{dato.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{dato.body}}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "Items",
  mounted() {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        console.log(response.data);
        this.datos = response.data;
        console.log(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  },
  data: () => ({
    datos: null
  })
});
</script>
