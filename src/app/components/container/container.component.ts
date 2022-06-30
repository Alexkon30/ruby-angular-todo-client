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

  isShowModal: boolean = false;
  constructor(public projectService: ProjectService) {
  }

  toggleModal(isShow: boolean): void {
    // console.log('toggle')
    this.isShowModal = isShow;
  }

  ngOnInit(): void {
  }

  get projects(): Project[] {
    return this.projectService.getProjects()
  }
}
