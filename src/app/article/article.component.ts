import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GenericCRUD_Service } from '../genericCRUD.service';
import { Article } from '../_models/Article';

// import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  displayDateTime = new Date().toLocaleString();

  // Component properties
  // article: Article;
  allArticles: Article[];
  // tslint:disable-next-line:variable-name
  // allArticles_: any;
  statusCode: number;
  requestProcessing = false;
  idToUpdate = null;
  processValidation = false;

  // Create form
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  // Create constructor to get service instance
  constructor(private genericCRUDService: GenericCRUD_Service) {
  }

  // Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllObjects();
  }


  // Fetch all articles
  // getAllArticles() {
  //   this.articleService.getAllArticles()
  //     .subscribe(
  //       data => this.allArticles = data,
  //       errorCode => this.statusCode = errorCode
  //     );
  // }
  getAllObjects() {
    // this.generateId(articles as Article[]);
    this.genericCRUDService.read(this.allArticles, "/articles/get-articles")
      .subscribe(

        // res => console.log(res),
        res => this.allArticles = res as Article[],
        errorCode => this.statusCode = errorCode,
        () => // console.log(this.generateId(this.allArticles))
        //console.log(this.allArticles.length + ' Articles read')
        this.allArticles.forEach(obj => console.log(obj.id))
      );
  }

  generateId(articles: Article[]) {
    var num = 1;
    articles.forEach(obj => {
      console.log(obj.id);
      if (obj.id == num.toString()) num++;
      else return num;
    }
    );
    return num;
  }

  // Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; // Validation failed, exit from method.
    }

    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const objectToCreateUpdate = this.articleForm.value;
    if (this.idToUpdate === null) {
      // Generate article id then create article
      this.genericCRUDService.read(this.allArticles, "/articles/get-articles") // getAllArticles()
        .subscribe(articles => {

          // Generate article id
          // const maxIndex = (articles as Article[]).length - 1;
          // const articleWithMaxIndex = articles[maxIndex];
          // const articleId = articleWithMaxIndex.id + 1;
          objectToCreateUpdate.id = this.generateId(articles as Article[]); // articleId;
          console.log(objectToCreateUpdate, 'this is form data---');

          // Create article
          this.genericCRUDService.create(Article/*this.article*/, "/create-article", objectToCreateUpdate) // createArticle(article)
            .subscribe(successCode => {
              this.statusCode = 201; // successCode;
              this.getAllObjects();
              this.backToCreateObject();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update article
      objectToCreateUpdate.id = this.idToUpdate;
      this.genericCRUDService.
        // updateArticle(articleObjToCreateUpdate)
        update(Article, objectToCreateUpdate, "/articles/update-article")
        .subscribe(successCode => {
          this.statusCode = 200; // successCode;
          this.getAllObjects();
          this.backToCreateObject();
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  // Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.preProcessConfigurations();
    this.genericCRUDService.
      readById(Article, articleId, "/articles/get-article-by-id?id=")
      // getArticleById(articleId)
      .subscribe(article => {
        console.log(article, 'poiuytre');
        // console.log((article as Article).id);

        this.idToUpdate = (article as Article).id
        this.articleForm.setValue(
          {
            title: (article as Article).title.trim(),
            category: (article as Article).category.trim()
          }
        );
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }

  // Delete article
  deleteArticle(articleId: string) {
    this.preProcessConfigurations();
    this.genericCRUDService.delete(Article, articleId, "/articles/delete-article?id=")
      // deleteArticleById(articleId)

      .subscribe(successCode => {
        // this.statusCode = successCode;
        // Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllObjects();
        this.backToCreateObject();
      },
        errorCode => this.statusCode = errorCode);
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  // Go back from update to create
  backToCreateObject() {
    this.idToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }

}
