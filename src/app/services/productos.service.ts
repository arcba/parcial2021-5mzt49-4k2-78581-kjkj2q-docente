import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IProducto } from '../models/producto';


@Injectable()
export class ProductosService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = "https://pymesbackend.azurewebsites.net/api/productos";
  }

  get() {
    return this.httpClient.get(this.url);
    }

    post(obj: IProducto) {
      return this.httpClient.post(this.url, obj);
    }
}