import { Interaction, SlashCommandBuilder } from 'discord.js';
import { FlagMetadata } from './FlagMetadata';

export type CommandBuilder = {
  data: SlashCommandBuilder,
  flags: FlagMetadata[],
  execute(interaction: Interaction, ...flags: any[]): Promise<void>
}