import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  reactiveForm!: FormGroup;

  @Output() toggleModal = new EventEmitter()

  // constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = new FormGroup({
      title: new FormControl('')
    })
  }

  closeModal(): void {
    this.toggleModal.emit(false)
  }

}
