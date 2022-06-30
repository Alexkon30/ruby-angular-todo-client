import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { ajax } from 'rxjs/ajax';
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

  onSubmit(form: FormGroup) {
    const body = {
      text: form.value.text as string,
      projectid: form.value.projectId as number,
      title: form.value.projectTitle as string,
    }

    const newTodo = ajax<{success: boolean, project: Project, todo: Todo}>({
      method: 'POST',
      // url: `https://murmuring-sands-47455.herokuapp.com/todos`,
      url: `http://localhost:3000/todos`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      },
      body,
    })
    newTodo.subscribe(res => {
      const {success, project, todo} = res.response
      if (success) {
        this.projectService.createTodo(project, todo)
      }
    })
  }

}
