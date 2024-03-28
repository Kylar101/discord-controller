import type { Interaction, SlashCommandBuilder } from 'discord.js';
import type { FlagMetadata } from './FlagMetadata';
import type { SubCommandMetadata } from './SubCommandMetadata';
import type { Action } from '../commands';
import type { AuthMetadata } from './AuthMetadata';

export type CommandBuilder = {
  data: SlashCommandBuilder;
  flags: FlagMetadata[];
  subCommands: SubCommandMetadata[];
  authentication: AuthMetadata[];
  execute(interaction: Interaction, ...flags: any[]): Promise<void>;
  compiled: Action;
};
