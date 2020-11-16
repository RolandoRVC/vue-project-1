import axios from "axios";
import { TiendasInterface } from "@/types/Tiendas.interface";
import { ProductosInterface } from "@/types/Productos.interface";

class TiendasService {
  URLBASE = 'http://localhost:3000/';
  public async getTiendas(query ?: string) {
    return await axios
      .get<TiendasInterface[]>(`${this.URLBASE}tiendas/${query ? query : ''}`)
      .then(response => response.data);
  }
  async addTiendas(body:object){
    return await axios
        .post<TiendasInterface[]>(`${this.URLBASE}tiendas`, body)
        .then(response => response);
  }
  async editTiendas(storeId:number, body:object){
    return await axios
        .patch<TiendasInterface[]>(`${this.URLBASE}tiendas/${storeId}`, body)
        .then(response => response);
  }
  async deleteTiendas(storeId:number){
    return await axios
        .delete<TiendasInterface[]>(`${this.URLBASE}tiendas/${storeId}`)
        .then(response => response);
  }
  //Services for Products
  public async getProductosTienda(query ?: string){
    return await axios
        .get<ProductosInterface[]>(`${this.URLBASE}tiendas/${query}`)
        .then(response => response.data)
  }
}

export const tiendasService = new TiendasService();
