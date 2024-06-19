export class BlogpostDTO {
  constructor(
    public title: string,
    public content: string,
    public userId: number,
    public creationDate?: string,
    public id?: number
  ) {}
}
