import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls: ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {

  // inject the required dependency for news service here
  constructor(private _news:NewsService) { }
  public errorMessage = '';

  public newsList: Array<News> = [];
  ngOnInit() {
      this.bookMarks()
    // The code here should fetch the bookmarked (read later) news details through NewsService method
    
    // the code should handle unauthorized, resource not found and internal server error
    // that can be returned as HttpResponse
  }
  bookMarks(){
    console.log("123");
    this._news.getBookmarkedNews().subscribe(response => {

      /// If there are any news in the response
      if (response !== undefined &&response.length > 0) {
        this.newsList = response;
      }
    },
      error => {
        console.log(error);
        if (error.status === 404) {
          this.errorMessage = 'Unable to access news server to fetch news';
        } else if (error.status === 403) {
          this.errorMessage = 'Unauthorized Access !!!';
        } else {
          this.errorMessage = 'Internal Server Error, Please Try Again Later';
        }
      });
  }

}
