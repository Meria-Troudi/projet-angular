import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { FormComponent } from '../../addform/form.component';

const routes: Routes = [
  { path: '', component: ListSuggestionComponent },      // /suggestions → SuggestionsListComponent
  { path: 'ajouter', component: FormComponent },
  { path: ':id', component: SuggestionDetailsComponent } // /suggestions/:id
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
