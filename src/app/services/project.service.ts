import { Injectable } from '@angular/core';
import { Project, Todo } from '../models/model';

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

  updateProjectTodoById(pojectId: number, todoId: number, title: string) {
    
  }

  createTodo(newProject: Project, todo: Todo) {
    const projectIndex = this.projects.findIndex(project => project.id == newProject.id)
    if (projectIndex == -1) {
      this.projects.push({...newProject, todos: [todo]})
    } else {
      this.projects[projectIndex].todos.push(todo)
    }
  }
}
