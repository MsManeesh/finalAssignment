import { Component, OnInit ,Input} from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-news-story-card',
  templateUrl: './news-story-card.component.html',
  styleUrls: ['./news-story-card.component.css']
})
export class NewsStoryCardComponent implements OnInit {
@Input() newsItem:News;
  constructor(private _news:NewsService) { }
  confirmationMessage="";
  errorMessage="";
  ngOnInit() {
  }

  addNews(news:News){
    // this method should add the news item marked for read later 
    // and save it to db.json file at server through NewsService
    this._news.addNews(news).subscribe(response => {
      if (response) {
        this.confirmationMessage = 'This News Article is Bookmarked';
      }
    },
      error => {
        if (error.status === 404) {
          this.errorMessage = 'Unable to access news server to add this news item';
        } else if (error.status === 403) {
          this.errorMessage = 'Unauthorized Access !!!';
        } else {
          this.errorMessage = 'Internal Server Error, Please Try Again Later';
        }
      });
    //  the method should handle unauthorized, not found and any other server error 
    // that may be returned as Http Response
  }

}
