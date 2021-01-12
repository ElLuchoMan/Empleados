import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';
import { element } from 'protractor';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[]=[];

  constructor(private _empleadoService : EmpleadoService, private toastr: ToastrService) {
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
  eliminarEmpleado(id:string){
    this._empleadoService.eliminarEmpleados(id).then(()=>{
      console.log('Empleado eliminado');
      this.toastr.error('Empleado eliminado','El empleado se eliminó con éxito', {positionClass:"toast-bottom-right"});
      
    }).catch(error =>{
      console.log(error);
      this.toastr.error('Error','No sé qué pasó xd', {positionClass:"toast-bottom-right"});
    })
  }

}
