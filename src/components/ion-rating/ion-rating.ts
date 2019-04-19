import { Component,Input,Output,EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';


/**
 * Generated class for the IonRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRatingComponent {

  @Input() numStars : number = 5;
  @Input() value : number = 0;
  @Input() read: boolean = false;
  

  @Output() ionClick:EventEmitter<number> = new EventEmitter<number>();
  
  stars: string[] = [];

  constructor(
    public navCtrl: NavController
  ) {
  }

  ngAfterViewInit(){
    setInterval (() => this.calc());

  }

  calc(){
    this.stars = [];
    let tmp = this.value;
    for(let i=0; i< this.numStars; i++, tmp--){
      if(tmp>=1){
        this.stars.push("star");
      }else if(tmp>0 && tmp<1){
        this.stars.push("star-half");
      }else{
        this.stars.push("star-outline");
      }
    }
  }

  starCliked(index){
    if(!this.read){
      this.value = index + 1;
      console.log(this.value);      
      this.ionClick.emit(this.value);
      this.calc();
    }
  }
}
