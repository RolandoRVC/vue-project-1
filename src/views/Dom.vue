<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="450" class="mx-auto" v-if="Tiendas">
          <v-list subheader>
            <v-subheader>Mis Tiendas</v-subheader>
            <template v-for="tienda in Tiendas">
              <v-list-item
                v-if="tienda"
                :key="tienda.id"
                class="cursor-pointer"
                @click="getProducts(tienda)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ tienda.nombre }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    tienda.direccion
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon color="cyan darken-3" class="px-1">
                    mdi-information-outline
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <div class="text-center" v-else>
          <p>Cargando Tiendas</p>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="container text-center" style="max-width: 450px;">
          <v-btn class="mx-1" depressed elevation="2" color="primary"
            >Agregar</v-btn
          >
          <v-btn
            class="mx-1"
            depressed
            :disabled="!SelectedStoreInformation.id"
            elevation="2"
            color="warning"
            @click="editInfoStore(SelectedStoreInformation.id)"
            >Editar</v-btn
          >
          <v-btn
            class="mx-1"
            depressed
            :disabled="!SelectedStoreInformation.id"
            elevation="2"
            color="error"
            >Eliminar</v-btn
          >
        </div>
      </v-col>
      <v-col>
        <v-card max-width="450" class="mx-auto" v-if="Productos.productos">
          <v-list subheader>
            <v-subheader>
              Listado de productos "{{ NombreTienda }}"</v-subheader
            >
            <template v-for="producto in Productos.productos">
              <v-list-item v-if="producto" :key="producto.id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ producto.nombre }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="teal--text text--lighten-2"
                    >$ {{ producto.precio }}</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-icon> </v-list-item-icon>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <div class="text-center">
          <v-progress-circular
            v-if="CargandoProductos"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <p
            v-if="!Productos.productos"
            class="blue-grey--text text--lighten-4"
          >
            Seleccione una tienda
          </p>
        </div>
        <div
          class="container text-center"
          style="max-width: 450px;"
          v-if="Productos.productos"
        >
          <v-btn class="mx-1" depressed elevation="2" color="primary"
            >Agregar</v-btn
          >
          <v-btn class="mx-1" depressed disabled elevation="2" color="warning"
            >Editar</v-btn
          >
          <v-btn class="mx-1" depressed disabled elevation="2" color="error"
            >Agregar</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="Dialogs.edit" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              Información de la tienda {{ NombreTienda }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre de la tienda"
                    required
                    v-model="SelectedStoreInformation.nombre"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Dirección"
                    required
                    v-model="SelectedStoreInformation.direccion"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="Dialogs.edit = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveStore">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tiendasService } from "@/services/tiendas.service";
import { TiendasInterface } from "@/types/Tiendas.interface";
import { AxiosResponse } from "axios";

@Component
export default class Dom extends Vue {
  Tiendas: any = [];
  Productos: any = [];
  CargandoProductos = false;
  SelectedStoreInformation: TiendasInterface | any = {};
  Dialogs = {
    delete: false,
    edit: false
  };
  NombreTienda = "";
  //Mounted
  async mounted() {
    this.Tiendas = await tiendasService.getTiendas();
  }
  //Methods
  async getProducts(tienda: TiendasInterface) {
    this.SelectedStoreInformation = JSON.parse(JSON.stringify(tienda));
    this.NombreTienda = this.SelectedStoreInformation.nombre;
    this.CargandoProductos = true;
    this.Productos = await tiendasService.getProductosTienda(
      `${tienda.id}?join=productos`
    );
    this.CargandoProductos = false;
  }

  deleteStore(id: number) {
    console.log(id);
  }

  editInfoStore(id: number) {
    this.Dialogs.edit = true;
  }
  async saveStore() {
    const indexStore: number | undefined = this.findStore(
      this.SelectedStoreInformation.id
    );
    //if indexStore is not undefined
    if (indexStore !== undefined) {
      const data: AxiosResponse = await this.saveStoreServer();
      if (data.status === 200) {
        this.Tiendas[indexStore].nombre = this.SelectedStoreInformation.nombre;
        this.Tiendas[indexStore].direccion = this.SelectedStoreInformation.direccion;
        this.NombreTienda = data.data.nombre;
        //close Edit Dialog
        this.Dialogs.edit = false;
      }
    }
  }

  //start with helper function
  /**
   * @param storeId
   * find Store and return store position index
   */
  findStore(storeId: number): number | undefined {
    for (const store in this.Tiendas) {
      if (storeId === this.Tiendas[store].id) {
        return parseInt(store);
      }
    }
    return undefined;
  }
  async saveStoreServer() {
    return await tiendasService.editTiendas(this.SelectedStoreInformation.id, {
      nombre: this.SelectedStoreInformation.nombre,
      direccion: this.SelectedStoreInformation.direccion
    });
  }
}
</script>
