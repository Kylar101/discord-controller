import { Interaction } from 'discord.js';

export abstract class Action {
  abstract run(message: Interaction): Promise<void> | void;
}
