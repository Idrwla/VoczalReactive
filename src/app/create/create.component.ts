import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ListOfVagons} from '../Shared/listOfVagons';
import {Vagon} from '../Shared/vagon';
import {getMatIconFailedToSanitizeLiteralError} from '@angular/material/icon';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  regex = /^[0-9]+$/;
  errorMessage: string;
  model = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern(this.regex),
        Validators.maxLength(8), Validators.minLength(8)]),
    name: new FormControl('', [Validators.required , Validators.maxLength(50)]),
    state: new FormControl('', [Validators.required])
  });
  idEditor = '';
  constructor() { }
  checkingId(control: string): boolean{
    let exist = false;
    ListOfVagons.listOfVagons.forEach((item) => {
      if (control === item.id) {
        exist = true;
      }
    });
    return exist;
  }
  edit(railwayId): void{
    this.idEditor = railwayId;
    const temp = ListOfVagons.listOfVagons.filter(
      (item) => {
        return item.id === railwayId;
      }
    );
    this.model.controls.id.setValue(  temp[0].id);
    this.model.controls.name.setValue(  temp[0].name);
    this.model.controls.state.setValue( temp[0].state);
  }
  submitEdit(): void{
    if (!this.model.invalid){
      let types: string;
      switch (this.model.value.id[0]){
        case '2':
          types = 'Крытый грузовой вагон';
          break;
        case '4':
          types = 'Платформа';
          break;
        case '6':
          types = 'Полувагон';
          break;
        case '7':
          types =  'Цистерна';
          break;
        case '8':
          types =  'Изотермические вагон';
          break;
        case '5':
          types =  'Собственные';
          break;
        case '9' || '3':
          types =  'Прочие';
          break;
      }
      ListOfVagons.listOfVagons.forEach(
        item => {
          if ( item.id === this.idEditor){
            item.id = this.model.value.id;
            item.name = this.model.value.name;
            item.state = this.model.value.state;
            item.type = types;
          }
        }
      );
      this.idEditor = '';
      this.model.reset();
    }
  }
  submit(): void{
    if (this.idEditor !== ''){
      this.submitEdit();
      this.idEditor = '';
    }else if (this.checkingId(this.model.value.id)){
      this.errorMessage = 'Вагон с данным номером уже существует.';
      console.log(this.errorMessage);
    } else if (!this.model.invalid){
      let type: string;
      switch (this.model.value.id[0]){
        case '2':
          type = 'Крытый грузовой вагон';
          break;
        case '4':
          type = 'Платформа';
          break;
        case '6':
          type = 'Полувагон';
          break;
        case '7':
          type =  'Цистерна';
          break;
        case '8':
          type =  'Изотермические вагон';
          break;
        case '5':
          type =  'Собственные';
          break;
        case '9' || '3':
          type =  'Прочие';
          break;
      }
      const newRailway = new Vagon(
        this.model.value.name, this.model.value.id, this.model.value.state, type
        );
      ListOfVagons.listOfVagons.push(newRailway);
      this.model.controls.name.reset('');
      this.model.controls.id.reset('');
      this.model.controls.state.reset('');
      this.errorMessage = '';
    }else {
      this.errorMessage = 'Неправильно введены данные';
    }
  }
}
