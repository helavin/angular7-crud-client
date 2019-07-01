import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
  HttpResponse
} from '@angular/common/http';

import { Observable /*, Subject*/ } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Article } from "./_models/Article";
// import { TmpClass } from './tmpClass';

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  // URL for CRUD operations (to server)
  myHost = "http://localhost:3000"; // + '/article';

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // Create constructor to get Http instance
  constructor(private http: HttpClient) { }

  // Fetch all articles:
  // getAllArticles(): Observable<Article[]> {
  //   return this.http.get(this.articleUrl + '/get-articles')
  //     .pipe(
  //       map((data: HttpResponseBase) => {
  //         return this.extractDataA(data);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // READ
  read<T>(model: T | any): Observable<T | T[]> {
    // console.log(this.httpOptions.params.get('url'));
    return this.http.get<T | T[]>(
      this.myHost + "/article/get-articles" // , this.httpOptions
    ); // /${model.tableName}`
  }

  // Create article:
  createArticle(article: Article): Observable<number> {
    const articleUrl = this.myHost + "/create-article";
    return this.http.post(articleUrl, article, this.httpOptions).pipe(
      map((success: HttpResponse<any>) => {
        console.log("Creating article...");
        console.log("success", success.status);
        return success.status;
      }),
      catchError(this.handleError)
    );
  }

  // Fetch article by id
  getArticleById(articleId: string): Observable<Article> {
    const articleUrl = this.myHost + "/get-article-by-id?id=" + articleId;
    // For pass blob in API
    return this.http.get(articleUrl).pipe(
      map((data: HttpResponseBase) => {
        return this.extractDataA(data);
      }),
      catchError(this.handleError)
    );
  }

  // Update article
  updateArticle(article: Article): Observable<number> {
    const articleUrl = this.myHost + "/update-article";
    return this.http.put(articleUrl, article, this.httpOptions).pipe(
      map((success: HttpResponse<any>) => {
        console.log("Updating article...");
        console.log("success", success.status);
        return success.status;
      }),
      catchError(this.handleError)
    );
  }

  // Delete article
  deleteArticleById(articleId: string): Observable<number> {
    const articleUrl = this.myHost + "/delete-article?id=" + articleId;
    return this.http.delete(articleUrl).pipe(
      map((success: any /*HttpResponse<any>*/) => {
        return success.status;
      })
    );
  }

  private extractDataA(res: any) {
    const body = res; // .body; // .json();
    console.log("Extracting datas...");
    console.log(body);
    return body;
  }
  private extractData(res: HttpResponse<any /*Article*/>) {
    const body = res; // .body; // .json();
    console.log("body");
    console.log(body);
    return body;
  }

  private handleError(error: HttpResponse<any> | any) {
    console.log("handleError!!! \n:" + error);
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
