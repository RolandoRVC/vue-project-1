import axios from 'axios';
import { TiendasInterface } from "@/types/Tiendas.interface";
import { ProductosInterface } from "@/types/Productos.interface";

class TiendasService {
  public async getTiendas(query ?: string) {
    return await axios
      .get<TiendasInterface[]>(`http://localhost:3000/tiendas/${query ? query : ''}`)
      .then(response => response.data);
  }

  public async getProductosTienda(query ?: string){
    return await axios
        .get<ProductosInterface[]>(`http://localhost:3000/tiendas/${query}`)
        .then(response => response.data)
  }
}

export const tiendasService = new TiendasService();
