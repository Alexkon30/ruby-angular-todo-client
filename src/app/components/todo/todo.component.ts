import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
  }

  changeCheckBox() {
    this.projectService.updateProjectTodoById(this.todo.project_id, this.todo.id)
  }

}
