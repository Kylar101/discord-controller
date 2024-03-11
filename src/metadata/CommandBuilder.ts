import { Interaction, SlashCommandBuilder } from 'discord.js';

export type CommandBuilder = {
  data: SlashCommandBuilder,
  execute(interaction: Interaction): Promise<void>
}