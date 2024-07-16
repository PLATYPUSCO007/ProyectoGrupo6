import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input()
  keys: string[] | null =  null;
  
  @Input()
  listArray: any[] | null =  null;

  @Output()
  objectEdit: EventEmitter<any> = new EventEmitter();

  sendValueEdit(val: any){
    this.objectEdit.emit(val);
  }

}
