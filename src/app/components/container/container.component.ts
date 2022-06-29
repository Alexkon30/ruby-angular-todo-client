import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Project } from 'src/app/models/model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {

  projects: Project[] = []
  isShowModal: boolean = false;
  // constructor() {}

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
      this.projects = plainToInstance(Project, res.response) 
    })
  }
}
