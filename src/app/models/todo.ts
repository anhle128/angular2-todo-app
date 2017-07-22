export class Todo {

  public id: number;
  public title: string;
  public complete: boolean;


  constructor( title: string, complete: boolean) {
    this.title = title;
    this.complete = complete;
  }

}
