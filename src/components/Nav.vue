<template>
  <v-app-bar app class="blue-grey darken-4" dark>
    <div class="d-flex align-center">
      <router-link to="/" class="white--text text-decoration-none">
        <v-btn text>
          Inicio
        </v-btn>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <router-link class="white--text text-decoration-none mr-2" to="/items">
      <v-btn text>
        Items
      </v-btn>
    </router-link>
    <router-link class="white--text text-decoration-none mr-2" to="/tiendas">
      <v-btn text>
        Tiendas
      </v-btn>
    </router-link>
    <router-link class="white--text text-decoration-none mr-2" to="/components">
      <v-btn text>
        Components
      </v-btn>
    </router-link>
    <router-link class="white--text text-decoration-none mr-2" to="/dom">
      <v-btn text>
        Dom
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav"
});
</script>
