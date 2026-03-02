import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
  searchText: string = '';
    search = '';
  constructor(private suggservice: SuggestionService) {}
  listsuggdatabase: Suggestion[] = [];
  ngOnInit(): void {
    this.suggservice.getAllsugg().subscribe({
      next: (data: any) => {
        this.listsuggdatabase = data;
        // If API returns empty data, use hardcoded suggestions as fallback
        if (!this.listsuggdatabase || this.listsuggdatabase.length === 0) {
          this.listsuggdatabase = this.suggestions;
        }
      },
      error: (error) => {
        console.error('Error fetching suggestions:', error);
        // Use hardcoded suggestions if API fails
        this.listsuggdatabase = this.suggestions;
      }
    });
  }



/*
  get filteredSuggestions(): Suggestion[] {
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(search) ||
      suggestion.category.toLowerCase().includes(search)
    );
  } */
  suggestions: Suggestion[] = [{
id: 1,
title: 'Organiser une journée team building',
description: "Suggestion pour organiser une journée de team building pour renforcer lesliens entre les membres de l'équipe.",
category: 'Événements',
date: new Date('2025-01-20'),
status: 'acceptee',
nbLikes:10
},
{
id: 2,
title: 'Améliorer le système de réservation',
description: "Proposition pour améliorer la gestion des réservations en ligne avec unsystème de confirmation automatique.",
category: 'Technologie',
date: new Date('2025-01-15'),
status: 'refusee',
nbLikes:0
},
{
id: 3,
title: 'Créer un système de récompenses',
description: "Mise en place d'un programme de récompenses pour motiver les employéset reconnaître leurs efforts.",
category: 'Ressources Humaines',
date: new Date('2025-01-25'),
status: 'refusee',
nbLikes:0
},
{
id: 4,
title: "Moderniser l'interface utilisateur",
description: "Refonte complète de l'interface utilisateur pour une meilleure expérienceutilisateur.",
category: 'Technologie',
date: new Date('2025-01-30'),
status: 'en_attente',
nbLikes:0
},
];
favoris: number[] = [];

//like(s: Suggestion) {
 // s.nbLikes++;}

addToFavorite(s: Suggestion) {
  if (!this.favoris.includes(s.id)) {
    this.favoris.push(s.id);
  }
}
  searchbytitle() {
    if (!this.listsuggdatabase || this.listsuggdatabase.length === 0) {
      return [];
    }
    return this.listsuggdatabase.filter((s) =>
      s.title.toLowerCase().includes(this.search.toLowerCase()),
    );
  }
  deletesugg(id: any) {
    console.log('id: ' + id);
    this.suggservice.deletesugg(id).subscribe(()=>{
console.log('deleted!!!');
this.ngOnInit()
    });
    
  }
like(s: Suggestion) {
  const newLikes = s.nbLikes + 1;
  console.log('Liking suggestion:', s.id, 'New likes:', newLikes);

  this.suggservice.updateLikes(s.id, newLikes).subscribe({
    next: (updatedSuggestion: Suggestion) => {
      console.log('Like successful:', updatedSuggestion);
      s.nbLikes = updatedSuggestion.nbLikes;
    },
    error: (error) => {
      console.error('Error updating likes:', error);
      // Fallback: update locally if API fails
      s.nbLikes = newLikes;
    }
  });
}
}
