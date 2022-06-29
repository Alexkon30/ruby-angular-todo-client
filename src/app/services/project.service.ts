import { Injectable } from '@angular/core';
import { Project } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = []
  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }

  setProjects(projects: Project[]): void {
    this.projects = projects
  }

  addProject(project: Project): void {
    this.projects.push(project)
  }

  updateProjectTodoById(pojectId: number, todoId: number) {
    
  }
}
