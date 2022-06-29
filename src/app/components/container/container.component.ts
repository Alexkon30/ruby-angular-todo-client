import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { ajax } from 'rxjs/ajax';
import { Project } from 'src/app/models/model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  projects: Project[] = []
  isShowModal: boolean = false;
  constructor(public projectService: ProjectService) {
    this.projects = projectService.getProjects()
  }

  toggleModal(isShow: boolean): void {
    // console.log('toggle')
    this.isShowModal = isShow;
  }

  ngOnInit(): void {
    const projects = ajax<Project[]>({
      method: 'GET',
      url: 'https://murmuring-sands-47455.herokuapp.com/projects',
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
