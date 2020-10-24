<template>
  <v-app>
    <v-app-bar app class="blue-grey darken-4" dark>
      <div class="d-flex align-center">
        <v-btn text>
          <router-link to="/" class="white--text text-decoration-none">Inicio</router-link>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <router-link class="white--text text-decoration-none mr-2" to="/items">Items</router-link>
      </v-btn>
      <v-btn text>
        <router-link class="white--text text-decoration-none mr-2" to="/tiendas">Tiendas</router-link>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  })
});
</script>
