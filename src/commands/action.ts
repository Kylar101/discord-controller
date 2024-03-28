import type { Interaction } from 'discord.js';

export abstract class Action {
  abstract run(message: Interaction, ...flags: any[]): Promise<void> | void;
}
