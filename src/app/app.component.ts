import { Component, OnInit } from '@angular/core';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ruby-angular-todo-client';

  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.initProjects()
  }
}
