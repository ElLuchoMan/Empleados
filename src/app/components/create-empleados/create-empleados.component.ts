import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
crearEmpleado: FormGroup;
submit =false;
invalid=false;
  constructor(private fb: FormBuilder, 
    private _empleadoservice: EmpleadoService,
    private router: Router,
    private toastr: ToastrService) {
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    })
   }

  ngOnInit() {
  }
  agregarEmpleado(){
    console.log(this.crearEmpleado);
    this.submit=true;
    if(this.crearEmpleado.invalid){
          return;
    }
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._empleadoservice.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('El empleado fue registrado con exito','Empleado registrado');
      this.router.navigate(['/listarEmpledos']);
    }).catch(error =>{
      console.log(error);
    })
 }
}
