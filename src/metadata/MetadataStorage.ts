import { CommandMetaDataArgs } from './args/CommandMetadataArgs';

export class MetadataStorage {
  commands: CommandMetaDataArgs[];

  constructor() {
    this.commands = [];
  }

  filterMetadataForCommands(classes: Function[]) {
    return this.commands.filter(command => classes.filter(cls => command.target === cls).length > 0);
  }
}