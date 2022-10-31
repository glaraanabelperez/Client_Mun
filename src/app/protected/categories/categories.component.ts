import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
  })

  export class CategoriesComponent implements OnInit {

  @Input() data: any;
  @Output() closeModal = new EventEmitter();


  constructor(){}

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
    
}
  
  