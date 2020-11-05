import { getMetadataStorage } from '../';
import { FlagMetadataArgs } from './args';
// import { CommandOptions } from '../commandOptions';
import { CommandMetadata } from './CommandMetadata';
import { FlagMetadata } from './FlagMetadata';
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
      command.flags = this.createFlags(command);
      return command;
    });
  }

  private createFlags(command: CommandMetadata): FlagMetadata[] {
    let target = command.target;
    const flagsWithTarget: FlagMetadataArgs[] = [];
    while (target) {
      flagsWithTarget.push(
        ...getMetadataStorage()
          .filterFlagsForTarget(target)
          .filter(flag => flagsWithTarget.map(f => f.method).indexOf(flag.method) === -1)
      );
      target = Object.getPrototypeOf(target);
    }
    return flagsWithTarget.map(args => {
      const flag = new FlagMetadata(args);
      return flag;
    });
  }
}