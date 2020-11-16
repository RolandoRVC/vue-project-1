<template>
  <v-app>
    <Nav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "./components/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {}
</script>
