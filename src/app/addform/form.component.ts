import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../models/suggestion';
import { SuggestionService } from '../core/Services/suggestion.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
 suggform!: FormGroup;
constructor(private suggservice:SuggestionService,private router:Router){}
categorie:string[]=[
    'santé','sport','education'
  ]; 

  ngOnInit(): void {
    this.suggform = new FormGroup({
      title: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Z][A-Za-z]*$')]),
      description: new FormControl('', [Validators.required,Validators.minLength(10)]),
      category: new FormControl('', Validators.required),
      status: new FormControl('', [Validators.required,Validators.pattern('en-attente')]),
  date: new FormControl({value: new Date(), disabled: true}),
    });
  }
  get description(){
    return this.suggform?.get('description');
  }
  add(): void {
    this.suggservice.Createsugg(this.suggform.value).subscribe(()=>{
      this.router.navigate(['/suggestions'])
      console.log('added!!!')
    })
    console.log(this.suggform.value);  

}
}
