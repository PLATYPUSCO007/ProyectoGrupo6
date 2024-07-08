import { Component, Input } from '@angular/core';
import { Menu } from '../../interfaces/Menu.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  @Input()
  menuList: Menu[] = [];

}
