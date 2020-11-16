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
          <v-btn
            class="mx-1"
            depressed
            elevation="2"
            color="primary"
            @click="addStore"
          >
            Agregar
          </v-btn>
          <v-btn
            class="mx-1"
            depressed
            :disabled="!SelectedStoreInformation.id"
            elevation="2"
            color="warning"
            @click="editStore"
            >Editar</v-btn
          >
          <v-btn
            class="mx-1"
            depressed
            :disabled="!SelectedStoreInformation.id"
            elevation="2"
            color="error"
            @click="Dialogs.delete = true"
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
      <v-dialog v-model="Dialogs.editCreate" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{
                FormMode === "create"
                  ? "Crear nueva tienda"
                  : `Información de la tienda ${NombreTienda}`
              }}
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
            <v-btn
              color="blue darken-1"
              text
              @click="Dialogs.editCreate = false"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveStore">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog
          v-model="Dialogs.delete"
          max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Alto
          </v-card-title>
          <v-card-text>¿Estás seguro de eliminar "{{NombreTienda}}"?
            <br><br>
            {{Productos.productos ? Productos.productos.length ? '¡Tus productos se perderán!': '': ''}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="Dialogs.delete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="deleteStore"
            >
              Eliminar
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
    editCreate: false
  };
  //Form Mode => edit, create
  FormMode = "edit";
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

  deleteStore() {
    this.Dialogs.delete = true;
    this.dele(this.SelectedStoreInformation.id);
  }
  async dele(id:number){
    const data :AxiosResponse = await tiendasService.deleteTiendas(id);
    if(data.status === 200){
      console.log("Se ha eliminado");
      this.Tiendas = this.Tiendas.filter((tienda: { id: number; }) => tienda.id !== id);
      this.Dialogs.delete = false;
      this.Productos.productos = [];
    }
  }
  addStore() {
    this.Dialogs.editCreate = true;
    this.FormMode = "create";
    this.vaciarCampos();
  }

  editStore() {
    this.FormMode = "edit";
    const index = this.findStore(this.SelectedStoreInformation.id);
    if (index !== undefined) {
      const tienda = this.Tiendas[index];
      this.SelectedStoreInformation.nombre = tienda.nombre;
      this.SelectedStoreInformation.direccion = tienda.direccion;
    }
    this.Dialogs.editCreate = true;
  }
  async saveStore() {
    if (this.FormMode === "create") {
      await this.saveStoreServer();
    } else {
      const indexStore: number | undefined = this.findStore(
        this.SelectedStoreInformation.id
      );
      //if indexStore is not undefined
      if (indexStore !== undefined) {
        await this.saveStoreServer(indexStore);
      }
    }
  }

  //start with helper function
  vaciarCampos() {
    this.SelectedStoreInformation.nombre = "";
    this.SelectedStoreInformation.direccion = "";
  }
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
  //Edit Store Functions
  /**
   * send data to server using axios
   */
  async saveStoreServer(indexStore?: number) {
    const body: object = {
      nombre: this.SelectedStoreInformation.nombre,
      direccion: this.SelectedStoreInformation.direccion
    };
    if (this.FormMode === "edit") {
      const data: AxiosResponse = await this.sendEditStoreServer(body);
      if (indexStore !== undefined) this.updateInfoToStore(indexStore, data);
    } else {
      await this.sendEditStoreServer(body, "create");
    }
  }
  async sendEditStoreServer(body: object, mode?: string) {
    if (mode === "create") {
      const data: AxiosResponse = await tiendasService.addTiendas(body);
      if (data.status === 201) {
        this.Tiendas = [...this.Tiendas, data.data];
        this.vaciarCampos();
        this.Dialogs.editCreate = false;
      }
      return data;
    }
    return await tiendasService.editTiendas(
      this.SelectedStoreInformation.id,
      body
    );
  }

  /**
   * Update store variables
   * @param indexStore
   * @param data
   */
  updateInfoToStore(indexStore: number, data: AxiosResponse) {
    if (data.status === 200) {
      this.Tiendas[indexStore].nombre = data.data.nombre;
      this.Tiendas[indexStore].direccion = data.data.direccion;
      this.NombreTienda = data.data.nombre;
      this.Dialogs.editCreate = false;
    }
  }
}
</script>
