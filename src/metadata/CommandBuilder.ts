import { Interaction, SlashCommandBuilder } from 'discord.js';
import { FlagMetadata } from './FlagMetadata';
import { SubCommandMetadata } from './SubCommandMetadata';
import { Action } from '../commands';

export type CommandBuilder = {
  data: SlashCommandBuilder,
  flags: FlagMetadata[],
  subCommands: SubCommandMetadata[],
  execute(interaction: Interaction, ...flags: any[]): Promise<void>,
  compiled: Action
}