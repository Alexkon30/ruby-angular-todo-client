import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { ajax } from 'rxjs/ajax';
import { Project, Todo } from '../models/model';

import { config } from '../../config'

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

  updateProjectTodoById(projectId: number, todoId: number) {

    const updatedTodo = ajax<{success: boolean, todo: Todo}>({
      method: 'PATCH',
      url: `${config.prodDomen}/projects/${projectId}/todos/${todoId}`,
      // url: `${config.testDomen}/projects/${projectId}/todos/${todoId}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      },
    })
    updatedTodo.subscribe(res => {
      const {success, todo: refreshedTodo} = res.response

      if (success) {
        const projectIndex = this.projects.findIndex(project => project.id == refreshedTodo.project_id)
        this.projects[projectIndex].todos.forEach(todo => {
          if (todo.id == refreshedTodo.id) {
            todo.isCompleted = !todo.isCompleted
          }
        })  
      }
    })
  }

  createTodo(body: {text: string, projectid: number, title: string}) {
    const newTodo = ajax<{success: boolean, project: Project, todo: Todo}>({
      method: 'POST',
      url: `${config.prodDomen}/todos`,
      // url: `${config.testDomen}/todos`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      },
      body,
    })
    newTodo.subscribe(res => {
      const {success, project: newProject, todo} = res.response
      if (success) {
        const projectIndex = this.projects.findIndex(project => project.id == newProject.id)
        if (projectIndex == -1) {
          this.projects.push({...newProject, todos: [todo]})
        } else {
          this.projects[projectIndex].todos.push(todo)
        }
      }
    })
  }

  initProjects() {
    const projects = ajax<Project[]>({
      method: 'GET',
      url: `${config.prodDomen}/projects`,
      // url: `${config.testDomen}/projects`,
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
