import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion: Suggestion | undefined;

  suggestions: Suggestion[] = [
    {id: 1, title: 'Organiser une journée team building', description: "Suggestion pour organiser une journée de team building.", category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', nbLikes: 10},
    {id: 2, title: 'Améliorer le système de réservation', description: "Proposition pour améliorer la gestion des réservations.", category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', nbLikes: 0},
    {id: 3, title: 'Créer un système de récompenses', description: "Programme de récompenses pour motiver les employés.", category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', nbLikes: 0},
    {id: 4, title: "Moderniser l'interface utilisateur", description: "Refonte complète de l'interface utilisateur.", category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', nbLikes: 0},
  ];

constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private suggservice: SuggestionService
  ) { }
  ngOnInit(): void {
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
     this.suggservice.getsugg( this.suggestionId).subscribe({
    next: (data: any) => {
        this.suggestion = data;
        console.log('Fetched suggestion details:', this.suggestion);
      },
      error: (error) => {
        console.error('Error fetching suggestion details:', error);
        // Handle case where suggestion is not found
        this.router.navigate(['/suggestions']);
      }
    });}

  backToList() {
    this.router.navigate(['/suggestions']);
  }
}