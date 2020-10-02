import { Command } from '../../decorator/Command';

@Command()
export class Test {
  constructor() {
    console.log('test command');
  }
}