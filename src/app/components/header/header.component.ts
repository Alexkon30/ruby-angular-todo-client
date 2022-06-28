import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleModal = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.toggleModal.emit(true)
  }

}
