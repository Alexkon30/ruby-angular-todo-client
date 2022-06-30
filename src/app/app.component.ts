import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { ajax } from 'rxjs/ajax';
import { Project } from './models/model';
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
    const projects = ajax<Project[]>({
      method: 'GET',
      // url: 'https://murmuring-sands-47455.herokuapp.com/projects',
      url: 'http://localhost:3000/projects',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      }
    })
    projects.subscribe(res => {
      this.projectService.setProjects(plainToInstance(Project, res.response))
    })
  }
}
