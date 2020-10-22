import { getMetadataStorage } from '../';
// import { CommandOptions } from '../commandOptions';
import { CommandMetadata } from './CommandMetadata';
import { MetadataStorage } from './MetadataStorage';

export class MetadataBuilder {
  private readonly metadataStorage: MetadataStorage;

  constructor() {
    this.metadataStorage = getMetadataStorage();
  }

  buildCommandMetadata(classes?: Function[]): CommandMetadata[] {
    return this.createCommands(classes);
  }

  private createCommands(classes?: Function[]): CommandMetadata[] {
    const commands = classes ? this.metadataStorage.filterMetadataForCommands(classes) : this.metadataStorage.commands;
    return commands.map(args => {
      const command = new CommandMetadata(args);
      return command;
    });
  }
}