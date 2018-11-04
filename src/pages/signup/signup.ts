import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDto } from '../../model/estado.dto';
import { CidadeDto } from '../../model/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  formGroup : FormGroup;
  estados : EstadoDto[];
  cidades : CidadeDto[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBiulder: FormBuilder, 
    public cidadeService : CidadeService,
    public estadoService : EstadoService
    ) {
    this.formGroup = formBiulder.group({
      nome: ['Alvaro Phelipe', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['suportevestebem@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]      
    });
  }
  
  

  ionViewDidLoad(){
    this.estadoService.findAll().subscribe(response=>{
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },error=>{

    });
  }
  signupUser(){
    console.log("Enviou");
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;  
    this.cidadeService.findAll(estado_id).subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },error=>{

    });
  }
  
}
