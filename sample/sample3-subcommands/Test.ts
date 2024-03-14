import { Action, Command, Interaction, SubCommand, Flag, FlagType } from 'discord-controller';

@Command({ description: 'This is the description' })
export class Test extends Action {
  constructor() {
    super();
  }

  async run(
    message: Interaction,
    @Flag('FlagOne', { description: 'FlagOne', type: FlagType.Number, maxLength: 5, minLength: 1 }) test: number,
  ): Promise<void> {
    await message.reply(`Hello World flag1: ${test}`);
  }

  @SubCommand({ description: 'This is the description' })
  async leSubCommand(
    interaction: Interaction,
    @Flag('scFlagOne', { description: 'FlagOne', type: FlagType.Number, maxLength: 5, minLength: 1 }) test: number,
  ) {
    console.log('SubCommand', test);
    await interaction.reply('SubCommand');
  }
}