import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../article.service';
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
  articleIdToUpdate = null;
  processValidation = false;

  // Create form
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  // Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }

  // Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles_();
  }


  // Fetch all articles
  // getAllArticles() {
  //   this.articleService.getAllArticles()
  //     .subscribe(
  //       data => this.allArticles = data,
  //       errorCode => this.statusCode = errorCode
  //     );
  // }
  getAllArticles_() {
    this.articleService.read(this.allArticles)
      .subscribe(
        // res => console.log(res),
        res => this.allArticles = res as Article[],
        errorCode => this.statusCode = errorCode,
        () => console.log(this.allArticles),
      );
  }

  // Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; // Validation failed, exit from method.
    }

    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      // Generate article id then create article
      this.articleService.read(this.allArticles) // getAllArticles()
        .subscribe(articles => {

          // Generate article id
          const maxIndex = (articles as Article[]).length - 1;
          const articleWithMaxIndex = articles[maxIndex];
          const articleId = articleWithMaxIndex.id + 1;
          article.id = articleId;
          console.log(article, 'this is form data---');

          // Create article
          this.articleService.createArticle(article)
            .subscribe(successCode => {
              this.statusCode = 201; // successCode;
              this.getAllArticles_();
              this.backToCreateArticle();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update article
      article.id = this.articleIdToUpdate;
      this.articleService.updateArticle(article)
        .subscribe(successCode => {
          this.statusCode = 200; // successCode;
          this.getAllArticles_();
          this.backToCreateArticle();
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  // Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.getArticleById(articleId)
      .subscribe(article => {
        console.log(article, 'poiuytre');
        this.articleIdToUpdate = article.id;
        this.articleForm.setValue({ title: article.title, category: article.category });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }

  // Delete article
  deleteArticle(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.deleteArticleById(articleId)
      .subscribe(successCode => {
        // this.statusCode = successCode;
        // Expecting success code 204 from server
        this.statusCode = 204;
        this.getAllArticles_();
        this.backToCreateArticle();
      },
        errorCode => this.statusCode = errorCode);
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  // Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }

}
