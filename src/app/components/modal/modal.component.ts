import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/models/model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  reactiveForm: FormGroup;

  @Output() toggleModal = new EventEmitter()
  @Input() projects: Project[]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      projectId: 0,
      projectTitle: '',
      text: ''
    })
  }

  closeModal(): void {
    this.toggleModal.emit(false)
  }

  get isNewProject() { 
    return !this.reactiveForm.controls['projectId'].value
  }

  get isTextValue() {
    return this.reactiveForm.controls['text'].value
  }

  get isProjectTitleValue() {
    return this.reactiveForm.controls['projectTitle'].value
  }

  clearTextValue() {
    this.reactiveForm.controls['text'].setValue('')
  }

  clearProjectTitleValue() {
    this.reactiveForm.controls['projectTitle'].setValue('')
  }

}
