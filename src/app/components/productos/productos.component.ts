import { Component, OnInit } from '@angular/core';
import { IProducto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Productos: IProducto[] = [];
  esAlta: boolean = false;
  frmProducto: FormGroup;
  submitted = false;

  constructor(
    private productosService: ProductosService,
    private fb: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.GetProductos();
    this.frmProducto = this.fb.group({
      ProductoID: [0],
      ProductoNombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      ProductoFechaAlta: ['', [Validators.required, Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}')]],
      ProductoStock: [null, [Validators.required, Validators.pattern('[0-9]{1,3}')]]
    });
  }

  GetProductos() {
    this.productosService.get().subscribe((res: IProducto[]) => {
      this.Productos = res;
    });
  }

  Registrar() {
    this.submitted = true;
    if (this.frmProducto.invalid) {
      return;
    }
    const prod = { ...this.frmProducto.value };

    var arrFecha = prod.ProductoFechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      prod.ProductoFechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();

    this.productosService.post(prod).subscribe((res: any) => {
      this.modalDialogService.Alert('Se agregó correctamente el producto');
      this.GetProductos();
    });
  }
}
