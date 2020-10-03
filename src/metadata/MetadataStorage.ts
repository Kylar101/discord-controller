import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { ServiceMetadataArgs } from './args/ServiceMetadataArgs';

export class MetadataStorage {
  commands: CommandMetaDataArgs[];
  services: ServiceMetadataArgs[];

  constructor() {
    this.commands = [];
  }

  filterMetadataForCommands(classes: Function[]): CommandMetaDataArgs[] {
    return this.commands.filter(command => classes.filter(cls => command.target === cls).length > 0);
  }
}