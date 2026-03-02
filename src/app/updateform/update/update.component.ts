import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuggestionService } from '../../core/Services/suggestion.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent   implements OnInit{
id: any;
listsugg:Suggestion=new Suggestion


  suggform!: FormGroup;
  constructor(
    private suggservice: SuggestionService,
    private router: Router,
    private act: ActivatedRoute,
  ) {}
  categorie: string[] = ['sante', 'sport', 'education'];
ngOnInit(): void {
  this.id = this.act.snapshot.params['id'];
  this.suggform = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[A-Z][A-Za-z]*$'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      category: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      status: new FormControl('', [
        Validators.required,
        Validators.pattern('acceptee'),
      ]),
    });
    
    // Fetch suggestion data and prefill the form
    this.suggservice.getsugg(this.id).subscribe({
      next: (data: any) => {
        console.log('Fetched suggestion data:', data);
        this.listsugg = data;
        
        // Prefill the form with the fetched data
        this.suggform.patchValue({
          title: this.listsugg.title,
          description: this.listsugg.description,
          category: this.listsugg.category,
          date: this.listsugg.date,
          status: this.listsugg.status
        });
        
        console.log('Form prefill completed');
      },
      error: (error) => {
        console.error('Error fetching suggestion:', error);
      }
    });
  }
  get description() {
    return this.suggform.get('description');
  }

  update() {
    this.suggservice.updatesugg(this.id, this.suggform.value).subscribe(() => {
      console.log('updated');

      this.router.navigate(['/suggestions']);
    });
  }
}
