projet Angular modulaire (non-standalone):
ng new projectName --standalone=false
2) Vérification environnement 
node -v
npm -v
npm install -g @angular/cli@18
ng version
4) Structure attendue (Modulaire)
Projet modulaire = présence de :
src/app/app.module.ts
src/app/app.component.ts
src/main.ts
5) Standalone vs Modulaire — Analyse critique
Hypothèse : vous travaillez en contexte académique / projet structuré
Choix modulaire est rationnel si :
  Plusieurs fonctionnalités
  Routing complexe
  Travail en équipe
  Projet évolutif
Standalone est plus rapide mais :
  Moins structurant à grande échelle
  Moins pédagogique pour comprendre DI et architecture Angular classique
Conclusion logique :Pour apprentissage structuré → Modulaire est plus formateur.
7) Commandes essentielles 
Ordre optimal :
node -v
npm -v
npm install -g @angular/cli@18
ng version
ng new myApp --standalone=false
cd myApp
ng serve --open
********************************************
# Core Architecture (Modular Project)
In a non-standalone project, architecture is based on NgModules.
Execution chain: main.ts
  → AppModule
      → AppComponent
main.ts : Bootstraps the root module.
app.module.ts
      Declares:
      Components
      Imports other modules
      Provides services
      Defines bootstrap component
3)Components (Fundamental Unit)
A component = UI + logic.=> Each component has:Decorator @Component
Example:
    @Component({
      selector: 'app-user',
      templateUrl: './user.component.html',
      styleUrls: ['./user.component.css']
    })
export class UserComponent {
  name = "Meria";
}
Concepts you must know:
Property binding → [property]="value"
Event binding → (click)="method()"
Two-way binding → [(ngModel)]
Interpolation → {{ value }}
4) Data Binding (Critical Exam Topic)
Angular supports 4 types:
        1. Interpolation
        {{ username }}
        2. Property Binding
        <img [src]="imageUrl">
        3. Event Binding
        Common events: click,input,change, mouseover
                Example:
                <button (click)="status = !status">Toggle</button>
        4. Two-way Binding: Requires FormsModule.
        <input [(ngModel)]="username">
5) Directives : Directives modify DOM behavior.
***Structural Directives
Change DOM structure.
    *ngIf
    *ngFor
    *ngSwitch
Example:
<div *ngIf="isLogged">Welcome</div>
<li *ngFor="let user of users">{{ user }}</li>
**Attribute Directives
  ngClass
  ngStyle
6) Modules: Modules group functionality.
7) Routing: Angular uses RouterModule.
Example:
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent }
];
Template navigation:
  <a routerLink="/users">Users</a>
  <router-outlet></router-outlet>
8) Services & Dependency Injection 
A service:
@Injectable({
  providedIn: 'root'
}) export class UserService {
  getUsers() {
    return ["Ali", "Sara"];
  }
}
Inject into component: constructor(private userService: UserService) {}
9) HTTP Client :Used to call backend APIs.
Import HttpClientModule.
Example:
    constructor(private http: HttpClient) {}
    getUsers() {
      return this.http.get("http://localhost:3000/users");
    }
Returns Observable.
10) RxJS & Observables: Angular heavily uses RxJS.
Observable = async data stream.
Example:
this.userService.getUsers().subscribe(data => {
  this.users = data;
});
You must know:
    subscribe()
    map()
    pipe()
    async pipe
11) Forms
Two types:
Template-driven (simple) => Uses ngModel.
Reactive Forms (advanced) => Uses FormGroup, FormControl.
12) Lifecycle Hooks
Angular component lifecycle:
    ngOnInit()
    ngOnChanges()
    ngOnDestroy()

15) CLI Commands You Must Know
ng new app --standalone=false
ng serve
ng generate component user
ng generate service user
ng generate module admin
ng build
ng test
16) Build Process
Angular CLI:
Compiles TypeScript
Bundles files
Optimizes for production
Production build: ng build --configuration=production
*****************************************************
npm install bootstrap
/src/styles @import 'bootstrap/dist/css/bootstrap.min.css';
Correct way to add Bootstrap
Open:
angular.json
Inside:
"styles": [
  "src/styles.css"
]
You must add Bootstrap like this:
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
OR import it inside styles.css:
@import 'bootstrap/dist/css/bootstrap.min.css';
If you imported Bootstrap inside a component CSS → it will not work globally.
**********************************************
******************************************
**************************
****************
Part 1: Simple Routing
# Step 1 – Create required components
If not already done:
ng g c core/home --skip-tests
ng g c core/notfound --skip-tests
ng g c core/list-suggestion --skip-tests   
 HomeComponent → /home
 NotFoundComponent → 404 page
 ListSuggestionComponent → /listSuggestion
# Step 2 – Set up App Routing
Open src/app/app-routing.module.ts:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { NotFoundComponent } from './core/notfound/notfound.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // default route
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { path: '**', component: NotFoundComponent }          // catch-all route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
# Step 3 – Add navigation links in Header
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" routerLink="/home">Home</a>
  <a class="nav-link" routerLink="/listSuggestion">Suggestions</a>
</nav>
routerLink directive automatically changes the route without page reload.

# Step 4 – Add<router-outlet>in AppComponent
In app.component.html:
<app-header></app-header>
<router-outlet></router-outlet>  <!-- where routed components display -->
<app-footer></app-footer>
router-outlet is mandatory to render routed components.
<router-outlet> : zone dynamique où Angular affiche le composant lié à la route active.

routerLink : lien interne SPA, évite le rechargement de page.

# Partie 2 : Lazy Loading
Lazy loading = ne charge le module que lorsque la route est visitée.
ng g module features/suggestions --route suggestions --module app.module
ng g module features/users --route users --module app.module
Exemple app-routing.module.ts après lazy loading :
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: '**', component: NotFoundComponent }
];
# Étape 2 : Routage interne du module Suggestions
Dans features/suggestions/suggestions-routing.module.ts :
const routes: Routes = [
  { path: '', component: SuggestionListComponent },           // /suggestions
  { path: ':id', component: SuggestionDetailsComponent }      // /suggestions/:id
];

constructor(private route: ActivatedRoute, private router: Router) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');  // Récupération de l'id
  // Charger les détails correspondant à l'id
}

goBack() {
  this.router.navigate(['/suggestions']);  // Retour à la liste
}
ActivatedRoute → service Angular pour lire les paramètres d’URL.

paramMap.get('id') → récupère la valeur de :id dans /suggestions/:id.
Constructor → injecte services, pas de logique.

ngOnInit → logique d’initialisation, lecture paramètres, récupération données.

ActivatedRoute → lire paramètres de l’URL (:id).

Router → naviguer vers une autre page via code.

snapshot → lecture immédiate des paramètres actuels.

Toujours utiliser ngOnInit pour initialiser les données dépendantes de la route.
**********************************
*******************************************
************************************************
Configuration du formulaire réactif
# Imports nécessaires
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../models/suggestion';
import { SuggestionService } from '../core/Services/suggestion.service';
FormGroup : conteneur principal du formulaire.
FormControl : chaque champ du formulaire.

Validators : règles de validation.

Router : navigation après soumission.
# Déclaration et initialisation
suggform!: FormGroup;
categorie:string[]=['santé','sport','education'];
suggform : référence du formulaire.
categorie : liste des options pour le select.
! : TypeScript "definite assignment assertion", permet de dire « je vais initialiser ce champ plus tard ».
# ngOnInit : Construction du formulaire

# Accès aux contrôles
add(): void {
  this.suggservice.Createsugg(this.suggform.value).subscribe(()=>{
    this.router.navigate(['/suggestions'])
    console.log('added!!!')
  })
  console.log(this.suggform.value);  
}

Explications :

this.suggform.value → objet JS avec les valeurs du formulaire.

Createsugg() → service pour envoyer la suggestion au backend.

.subscribe() → observables RxJS, la requête est asynchrone.

router.navigate(['/suggestions']) → redirection automatique vers la liste.

⚠️ Important : nbLikes n’est pas dans le formulaire → par défaut 0.

# this.suggform.value → objet JS avec les valeurs du formulaire.

# Createsugg() → service pour envoyer la suggestion au backend.

# .subscribe() → observables RxJS, la requête est asynchrone.

# router.navigate(['/suggestions']) → redirection automatique vers la liste.

⚠️ Important : nbLikes n’est pas dans le formulaire → par défaut 0.
*ngIf : condition d’affichage du message d’erreur.
touched : l’utilisateur a interagi avec le champ.
errors['required'] : type d’erreur.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
Points à retenir pour l’examen

Différence Reactive Form vs Template Form :

Reactive Form = TypeScript contrôle tout.

Template Form = logique dans template HTML.

Validators courants :

Validators.required → champ obligatoire

Validators.minLength(n) → minimum de caractères

Validators.maxLength(n) → maximum de caractères

Validators.pattern(regex) → expression régulière

Messages d’erreur conditionnels :

Toujours vérifier touched ou dirty.

Utiliser errors['type'].

Disabled/readonly :

Champ non modifiable = new FormControl({value: x, disabled: true}).

Soumission :

form.value récupère uniquement les champs enabled.

Pour ajouter des champs automatiques, ajouter dans le service ou avant l’envoi.

Navigation après submit : Router.navigate(['/route']).

Examen tip : montrer que tu sais connecter Reactive Form + Validators + Service + Router.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




1.1 Qu’est-ce qu’un service ?

Service = une classe Angular réutilisable, injectable dans plusieurs composants.

Il contient la logique métier et/ou l’accès aux données (ex: CRUD via API REST).

Permet de séparer la logique du composant (UI) de la logique métier ou data.
