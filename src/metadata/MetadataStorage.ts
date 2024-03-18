import type { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import type { ListenerMetadataArgs } from './args/ListenerMetadataArgs';
import type { FlagMetadataArgs } from './args/FlagMetadataArgs';
import type { ServiceMetadataArgs } from './args/ServiceMetadataArgs';
import type { AuthorizedMetadataArgs } from './args/AuthorizedMetadataArgs';
import type { SubCommandMetaDataArgs } from './args';

export class MetadataStorage {
  commands: CommandMetaDataArgs[];
  subCommands: SubCommandMetaDataArgs[];
  listeners: ListenerMetadataArgs[];
  services: ServiceMetadataArgs[];
  flags: FlagMetadataArgs[];
  authorized: AuthorizedMetadataArgs[];

  constructor() {
    this.commands = [];
    this.subCommands = [];
    this.listeners = [];
    this.services = [];
    this.flags = [];
    this.authorized = [];
  }

  filterMetadataForCommands(classes: Function[]): CommandMetaDataArgs[] {
    return this.commands.filter(
      (command) => classes.filter((cls) => command.target === cls).length > 0,
    );
  }

  filterMetadataForListeners(classes: Function[]): ListenerMetadataArgs[] {
    return this.listeners.filter(
      (listener) => classes.filter((cls) => listener.target === cls).length > 0,
    );
  }

  filterSubcommandsForTarget(target: Function): SubCommandMetaDataArgs[] {
    return this.subCommands.filter(
      (subCommand) => subCommand.target === target,
    );
  }

  filterFlagsForTarget(target: Function): FlagMetadataArgs[] {
    return this.flags.filter((flag) => flag.target === target);
  }

  filterAuthForCommand(target: Function): AuthorizedMetadataArgs[] {
    return this.authorized.filter((auth) => auth.target === target);
  }

  filterAuthForFlag(
    target: Function,
    method: string,
  ): AuthorizedMetadataArgs[] {
    return this.authorized.filter(
      (auth) => auth.target === target && auth.method === method,
    );
  }
}
