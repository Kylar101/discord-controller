import { Service } from 'discord-controller';

@Service()
export class MyService {
  doSomething(message: string) {
    return `the service responses with ${message}`;
  }
}
