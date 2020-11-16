import axios from "axios";
import { ProductosInterface } from "@/types/Productos.interface";

class ProductosService {
    URLBASE = 'http://localhost:3000/';
    //Services for Products
    async getProductosTienda(query ?: string){
        return await axios
            .get<ProductosInterface[]>(`${this.URLBASE}tiendas/${query}`)
            .then(response => response.data)
    }

    async addProductosTiendas(body: object) {
        return await axios
            .post<ProductosInterface[]>(`${this.URLBASE}productos`, body)
            .then(response => response);
    }
}

export const productosService = new ProductosService();