export class Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

export class Project {
    id: number;
    title: string;
    todos: Todo[];
}