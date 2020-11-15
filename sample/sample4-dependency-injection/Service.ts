import { Service } from '../../src/decorator';

@Service()
export class MyService {
  doSomething(message: string) {
    return `the service responses with ${message}`;
  }
}
