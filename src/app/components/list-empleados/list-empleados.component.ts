import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';
import { element } from 'protractor';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[]=[];

  constructor(private _empleadoService : EmpleadoService) {
       }

  ngOnInit() {
    this.getEmpleados();
  }
  getEmpleados(){
  this._empleadoService.getEmpleados().subscribe(data=>{
   data.forEach((element: any) => {
        this.empleados.push({
       id: element.payload.doc.id,
       ...element.payload.doc.data()
     })
   });
   console.log(this.empleados);
  })
  }

}
