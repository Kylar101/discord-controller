import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadataArgs } from './args/FlagMetadataArgs';
import { ServiceMetadataArgs } from './args/ServiceMetadataArgs';
import { AuthorizedMetadataArgs } from './args/AuthorizedMetadataArgs';

export class MetadataStorage {
  commands: CommandMetaDataArgs[];
  services: ServiceMetadataArgs[];
  flags: FlagMetadataArgs[];
  authorized: AuthorizedMetadataArgs[];

  constructor() {
    this.commands = [];
    this.services = [];
    this.flags = [];
    this.authorized = [];
  }

  filterMetadataForCommands(classes: Function[]): CommandMetaDataArgs[] {
    return this.commands.filter(command => classes.filter(cls => command.target === cls).length > 0);
  }

  filterFlagsForTarget(target: Function): FlagMetadataArgs[] {
    return this.flags.filter(flag => flag.target === target);
  }

  filterAuthForCommand(target: Function): AuthorizedMetadataArgs {
    return this.authorized.find(auth => auth.target === target && !auth.method);
  }

  filterAuthForFlag(target: Function, method: string): AuthorizedMetadataArgs {
    return this.authorized.find(auth => auth.target === target && auth.method === method);
  }
}
