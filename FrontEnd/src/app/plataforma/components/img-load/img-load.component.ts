import { Component, Input, OnChanges, SimpleChanges, input, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-img-load',
  templateUrl: './img-load.component.html',
  styleUrl: './img-load.component.css'
})
export class ImgLoadComponent implements OnChanges{

  @Input()
  public isShow: boolean = false;
  
  public tempImg = signal<string | ArrayBuffer>('');

  @Input()
  public eventImg: any = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['eventImg'] || changes['eventImg'].isFirstChange()) return;
    this.tempImg.update(()=>'');
    this.loadImg();
  }

  loadImg(){
    const blob = this.eventImg.target.files[0];
    const fileReader = new FileReader();
    let newImg: string | ArrayBuffer | null = '';
    fileReader.onload = function(e){
      if (!e) return;
      const imgUrl = e.target!.result;
      newImg = imgUrl;
      console.log(newImg);
    }
    fileReader.readAsDataURL(blob);
    setTimeout(() => {
      this.updateTempImg(newImg);
    }, 500);
  }

  updateTempImg(temp: string | ArrayBuffer | null){
    if (!temp) return;
    this.tempImg.update(()=>temp)
  }

}
