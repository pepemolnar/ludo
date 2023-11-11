import type { Request, Response } from 'express';
import * as fs from 'fs';

export class GeneralController {
  public getHomePage(request: Request, response: Response) {
    const content = fs.readFileSync('dist/app/home/home.html', 'utf-8');
    response.setHeader('Content-Type', 'text/html');
    response.status(200).send(content);
  }

  public getLoginPage(request: Request, response: Response) {
    const content = fs.readFileSync('dist/app/login/login.html', 'utf-8');
    response.setHeader('Content-Type', 'text/html');
    response.status(200).send(content);
  }

  public getRegisterPage(request: Request, response: Response) {
    const content = fs.readFileSync('dist/app/register/register.html', 'utf-8');
    response.setHeader('Content-Type', 'text/html');
    response.status(200).send(content);
  }

  public login(request: Request, response: Response) {
    response.status(200).json({ authToken: '' });
  }

  public register(request: Request, response: Response) {
    response.status(200).json({ success: true });
  }
}
