import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core'; 
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-news-reader-card',
  templateUrl: './news-reader-card.component.html',
  styleUrls: ['./news-reader-card.component.css']
})
export class NewsReaderCardComponent implements OnInit {
 @Input() newsItem:News;
 @Output() refresh= new EventEmitter();
  constructor(private _newsserve : NewsService,private _root :RouteService) { }

  ngOnInit() {
    console.log(this.newsItem)
  }
  remove(id:any){
      this._newsserve.removeBookMarkedNews(id).subscribe(res=>{
        console.log(res);
        //this._root.toBookmarks();
        this.refresh.emit();                        
      },error => {
        if (error.status === 404){
          console.log('Http failure response for RemoveNews 404 Not Found');
        } else{
          console.log('Some error occured. Please try again!!');
        }
      });;
  }

}
