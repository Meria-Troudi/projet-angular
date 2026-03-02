import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor( private http:HttpClient) { }
   getAllsugg():Observable<Suggestion>{
    return this.http.get<Suggestion>('http://localhost:3000/suggestions')
  }
  getsugg(id:any){
    return this.http.get('http://localhost:3000/suggestions'+'/'+id)
  }
     deletesugg(id:any):Observable<Suggestion>{
    return this.http.delete<Suggestion>('http://localhost:3000/suggestions'+'/'+id)
  }

   Createsugg(sugg:Suggestion):Observable<Suggestion>{
    return this.http.post<Suggestion>('http://localhost:3000/suggestions',sugg)
  }

   updatesugg(id:any,sugg:Suggestion){
    return this.http.put('http://localhost:3000/suggestions'+'/'+id,sugg)
  }
    updateLikes(id: number, nbLikes: number): Observable<Suggestion> {
  return this.http.patch<Suggestion>(`http://localhost:3000/suggestions/${id}`, { nbLikes });
}
}
