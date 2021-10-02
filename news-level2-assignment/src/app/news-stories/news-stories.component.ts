import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { News } from '../models/news';
@Component({
  selector: 'app-news-stories',
  templateUrl: './news-stories.component.html',
  styleUrls: ['./news-stories.component.css']
})
export class NewsStoriesComponent implements OnInit {
  
  constructor(private _news:NewsService) { }
  public errorMessage = '';

  public newsList: Array<News> = [];
  ngOnInit() {
    // The code here should fetch the trending news details through NewsService method
    this._news.getTrendingNews().subscribe(sub=>{
      if(sub['articles'] !== undefined &&sub['articles'].length > 0) {
        this.newsList = sub['articles'];}
      },
      error => {
        console.log(error);
        if (error.status === 404) {
          this.errorMessage = 'Unable to access news server to fetch news';
        }else if (error.status === 403){
          this.errorMessage = 'Unauthorized Access !!!';
        }else{
          this.errorMessage = 'Internal Server Error, Please Try Again Later';
      }
    });
    // the code should handle unauthorized, resource not found and internal server error
    // that can be returned as HttpResponse
  }
}
