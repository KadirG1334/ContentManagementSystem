import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from './content';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class ContentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiServerUrl}/content/all`);
  }

  public addContent(content: Content): Observable<Content> {
    return this.http.post<Content>(`${this.apiServerUrl}/content/add`, content);
  }

  public updateContent(content: Content): Observable<Content> {
    return this.http.put<Content>(`${this.apiServerUrl}/content/update`, content);
  }

  public deleteContent(contentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/content/delete/${contentId}`);
  }
}
