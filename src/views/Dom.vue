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
            @click="StoreDialogs.delete = true"
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
              <v-list-item v-if="producto" :key="producto.id" @click="getProductInformation(producto)">
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
          <v-btn class="mx-1" depressed elevation="2" color="primary" @click="openProductsDialog"
            >Agregar</v-btn
          >
          <v-btn class="mx-1" depressed :disabled="!SelectedProductInformation.id" elevation="2" color="warning" @click="openEditProductsDialog"
            >Editar</v-btn
          >
          <v-btn class="mx-1" depressed :disabled="!SelectedProductInformation.id" elevation="2" color="error" @click="openDeleteProductsDialog"
            >Eliminar</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <!--start dialog for Products-->
    <v-row justify="center">
      <v-dialog v-model="ProductDialogs.editCreate" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{
                StoreFormMode === "create"
                  ? "Crear nuevo producto"
                  : `Información del producto ${NombreProducto}`
              }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre del producto"
                    required
                    v-model="SelectedProductInformation.nombre"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Precio del producto"
                    required
                    type="number"
                    v-model="SelectedProductInformation.precio"
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
              @click="ProductDialogs.editCreate = false"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveProducts">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- start dialog for Store-->
    <v-row justify="center">
      <v-dialog v-model="StoreDialogs.editCreate" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{
                StoreFormMode === "create"
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
              @click="StoreDialogs.editCreate = false"
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
    <!--end dialog for Store-->

    <!--start dialog for delete product-->
    <v-row justify="center">
      <v-dialog
          v-model="ProductDialogs.delete"
          max-width="290"
      >
        <v-card>
          <v-card-title class="headline">
            Alto
          </v-card-title>
          <v-card-text>¿Estás seguro de eliminar "{{SelectedProductInformation.nombre}}"?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="ProductDialogs.delete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="deleteProduct(SelectedProductInformation.id)"
            >
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--end dialog for delete product-->
    <!--start dialog for delete store-->
    <v-row justify="center">
      <v-dialog
          v-model="StoreDialogs.delete"
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
                @click="StoreDialogs.delete = false"
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
    <!--end dialog for delete Store-->
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
import {productosService} from "@/services/productos.service";
import { TiendasInterface } from "@/types/Tiendas.interface";
import { AxiosResponse } from "axios";
import {ProductosInterface} from "@/types/Productos.interface";

@Component
export default class Dom extends Vue {
  Tiendas: any = [];
  Productos: any = [];
  CargandoProductos = false;
  SelectedStoreInformation: TiendasInterface | any = {};
  SelectedProductInformation: ProductosInterface | any = {};
  StoreDialogs = {
    delete: false,
    editCreate: false
  };
  //Form Mode => edit, create
  StoreFormMode = "edit";
  NombreTienda = "";
  ProductDialogs = {
    delete: false,
    editCreate: false
  };
  //Form Mode => edit, create
  ProductFormMode = "edit";
  NombreProducto = "";
  //Mounted
  async mounted() {
    this.Tiendas = await tiendasService.getTiendas();
  }


  //Crud Producs functions
  getProductInformation(product: ProductosInterface) {
    this.SelectedProductInformation = JSON.parse(JSON.stringify(product));
  }
  openProductsDialog(){
    this.ProductDialogs.editCreate = true;
    this.ProductFormMode = "create";
    this.vaciarCamposProductos();
  }
  async openEditProductsDialog() {
    this.ProductFormMode = "edit";
    const index: any = this.findProduct(this.SelectedProductInformation.id);
    if (index) {
      this.ProductDialogs.editCreate = true;
      this.SelectedProductInformation.nombre = index.product.nombre;
      this.SelectedProductInformation.precio = index.product.precio;
      this.SelectedProductInformation.id = index.product.id;
    }
  }
  openDeleteProductsDialog() {
    this.ProductDialogs.delete = true;
  }
  async deleteProduct(id:number){
    //this.vaciarCamposProductos();
    const data: AxiosResponse = await productosService.deleteProductosTiendas(id);
    if (data.status === 200){
      console.log("Se ha eliminado");
      this.Productos.productos = this.Productos.productos.filter(
        (product: { id: number }) => product.id !== id
      );
      this.ProductDialogs.delete = false;
      this.vaciarCamposProductos();
      this.SelectedProductInformation.id = null;
    }
  }
  async saveProducts(){
    const body = {
      nombre:this.SelectedProductInformation.nombre,
      precio:this.SelectedProductInformation.precio,
      tienda: this.SelectedStoreInformation.id
    };
    if (this.ProductFormMode === "create"){
      const data: AxiosResponse = await productosService.addProductosTiendas(body);
      if (data.status === 201){
        this.Productos.productos = [
          ...this.Productos.productos,
          { id: data.data.id, nombre: data.data.nombre, precio: data.data.precio }
        ];
        this.ProductDialogs.editCreate = false;
      }
    } else {
      const data: AxiosResponse = await productosService.editProductosTiendas(
        this.SelectedProductInformation.id,
        body
      );
      if (data.status === 200){
        const index:any = this.findProduct(this.SelectedProductInformation.id);
        if (index !== undefined){
          const product:any = this.Productos.productos[index.index];
          product.nombre = data.data.nombre;
          product.precio = data.data.precio;
          this.ProductDialogs.editCreate = false;
        }
      }
    }
  }

  async getProducts(tienda: TiendasInterface) {
    this.SelectedStoreInformation = JSON.parse(JSON.stringify(tienda));
    this.NombreTienda = this.SelectedStoreInformation.nombre;
    this.CargandoProductos = true;
    this.Productos = await productosService.getProductosTienda(
      `${tienda.id}?join=productos`
    );
    this.CargandoProductos = false;
  }

  deleteStore() {
    this.StoreDialogs.delete = true;
    this.deleteStoreServer(this.SelectedStoreInformation.id);
  }

  addStore() {
    this.StoreDialogs.editCreate = true;
    this.StoreFormMode = "create";
    this.vaciarCampos();
  }

  editStore() {
    this.StoreFormMode = "edit";
    const index = this.findStore(this.SelectedStoreInformation.id);
    if (index !== undefined) {
      const store = this.Tiendas[index];
      this.SelectedStoreInformation.nombre = store.nombre;
      this.SelectedStoreInformation.direccion = store.direccion;
    }
    this.StoreDialogs.editCreate = true;
  }
  async saveStore() {
    if (this.StoreFormMode === "create") {
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
    console.log(this.SelectedStoreInformation.nombre);
  }

  //start with helper function
  vaciarCampos() {
    this.SelectedStoreInformation.nombre = "";
    this.SelectedStoreInformation.direccion = "";
  }
  vaciarCamposProductos() {
    this.SelectedProductInformation.nombre = "";
    this.SelectedProductInformation.precio = "";
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
  findProduct(productId: number): object | undefined {
    for (const producto in this.Productos.productos) {
      if (productId === this.Productos.productos[producto].id) {
        return {index : parseInt(producto), product : this.Productos.productos[producto]};
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
    if (this.StoreFormMode === "edit") {
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
        this.StoreDialogs.editCreate = false;
      }
      return data;
    }
    return await tiendasService.editTiendas(
      this.SelectedStoreInformation.id,
      body
    );
  }
  /**
   * Delete store using axios
   * @param id
   */
  async deleteStoreServer(id:number){
    const data: AxiosResponse = await tiendasService.deleteTiendas(id);
    if (data.status === 200){
      console.log("Se ha eliminado");
      this.Tiendas = this.Tiendas.filter(
        (store: { id: number }) => store.id !== id
      );
      this.StoreDialogs.delete = false;
      this.Productos = [];
      this.vaciarCampos();
      this.SelectedStoreInformation.id = null;
    }
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
      this.StoreDialogs.editCreate = false;
    }
  }

}
</script>
