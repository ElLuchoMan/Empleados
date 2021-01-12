import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {
crearEmpleado: FormGroup;
submit =false;
loading=false;
id: string | null;
titulo = 'Agregar Empelado'
  constructor(private fb: FormBuilder, 
    private _empleadoservice: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    })
    this.id=this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.editarEmpleado();
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
    this.loading=true;
    this._empleadoservice.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('El empleado fue registrado con exito','Empleado registrado',{positionClass:'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/listarEmpledos']);
    }).catch(error =>{
      console.log(error);
      this.toastr.error('No sé qué pasó xd','Error',{positionClass:'toast-bottom-right'});
      this.loading=false;
    })
 }
 editarEmpleado(){
  if( this.id != null){
    this.titulo="Editar Empelado";
    this._empleadoservice.getEmpleado(this.id).subscribe(data=>{
      console.log(data);
    })
  }
 }
}
