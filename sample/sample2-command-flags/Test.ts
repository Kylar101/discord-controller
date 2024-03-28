import { Action, Command, Interaction, Flag, FlagType } from 'discord-controller';

@Command({ description: 'This is the description' })
export class Test extends Action {
  constructor() {
    super();
  }

  async run(
    message: Interaction,
    @Flag('RandomFlag', { description: 'RandomFlag', type: FlagType.Number, maxLength: 5, minLength: 1 }) test: number,
  ): Promise<void> {
    console.log(test);
    await message.reply(`Hello World flag1: ${test}`);
  }
}