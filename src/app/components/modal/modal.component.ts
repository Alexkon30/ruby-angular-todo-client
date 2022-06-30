import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project, Todo, TodoForm } from 'src/app/models/model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  reactiveForm: FormGroup;

  @Output() toggleModal = new EventEmitter()
  @Input() projects: Project[]

  constructor(private fb: FormBuilder, public projectService: ProjectService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = this.fb.group(new TodoForm)
  }

  closeModal(): void {
    this.toggleModal.emit(false)
  }

  get isNewProject() { 
    return this.reactiveForm.value.projectId == 0
  }

  clearTextValue() {
    this.reactiveForm.controls['text'].setValue('')
  }

  clearProjectTitleValue() {
    this.reactiveForm.controls['projectTitle'].setValue('')
  }

  onSubmit(form: FormGroup) {
    const body = {
      text: form.value.text,
      projectid: form.value.projectId,
      title: form.value.projectTitle,
    }
    this.projectService.createTodo(body)
    this.closeModal()
  }

}
