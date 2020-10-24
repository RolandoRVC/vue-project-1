<template>
  <div>
    <h1>Tiendas</h1>
    <v-expansion-panels v-if="informacion" class="mt-3 ml-auto mr-auto" style="width: 500px">
      <v-expansion-panel v-for="info in informacion" :key="info.id">
        <v-expansion-panel-header>
          {{info.id}} - {{info.nombre}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{info.direccion}}
          <v-btn depressed v-on:click="getProductos(info.id)">
            Ver productos
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-data-table v-if="productos"
      :headers="headers"
      :items="productos.productos"
      :items-per-page="5"
      class="elevation-1 mt-3 ml-auto mr-auto"
      style="width: 600px"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {tiendasService} from '@/services/tiendas.service';
/*
import {TiendasInterface} from '@/types/Tiendas.interface';
*/
export default Vue.extend({
  name: "Tiendas",
  async mounted() {
    this.$data.informacion = await tiendasService.getTiendas();
  },

  methods: {
    async getProductos(id: number) {
      this.$data.showTable = true;
      this.$data.productos = await tiendasService.getProductosTienda(`${id}?join=productos`);
    }
  },

  data: () => ({
    informacion: null,
    productos: null,
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Precio', value: 'precio' },
    ]
  })
});
</script>
