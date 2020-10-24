import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadataArgs } from './args/FlagMetadataArgs';
import { ServiceMetadataArgs } from './args/ServiceMetadataArgs';

export class MetadataStorage {
  commands: CommandMetaDataArgs[];
  services: ServiceMetadataArgs[];
  flags: FlagMetadataArgs[];

  constructor() {
    this.commands = [];
    this.services = [];
    this.flags = [];
  }

  filterMetadataForCommands(classes: Function[]): CommandMetaDataArgs[] {
    return this.commands.filter(command => classes.filter(cls => command.target === cls).length > 0);
  }

  filterFlagsForTarget(target: Function): FlagMetadataArgs[] {
    return this.flags.filter(flag => flag.target === target);
  }
}