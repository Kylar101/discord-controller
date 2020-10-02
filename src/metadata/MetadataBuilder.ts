import { getMetadataStorage } from '../';
// import { CommandOptions } from '../commandOptions';
import { CommandMetadata } from './CommandMetadata';
import { MetadataStorage } from './MetadataStorage';

export class MetadataBuilder {
  private readonly metadataStorage: MetadataStorage;

  constructor() {
    this.metadataStorage = getMetadataStorage();
  }

  buildCommandMetadata(classes?: Function[]) {
    return this.createCommands(classes);
  }

  private createCommands(classes?: Function[]) {
    const commands = classes ? this.metadataStorage.filterMetadataForCommands(classes) : this.metadataStorage.commands;
    return commands.map(args => new CommandMetadata(args));
  }
}