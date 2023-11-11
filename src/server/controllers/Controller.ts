export class Controller {
  protected request;
  protected response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }
}
