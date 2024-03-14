import { SubCommandMetadata, getMetadataStorage } from '../';
import { AuthorizedMetadataArgs, FlagMetadataArgs, SubCommandMetaDataArgs } from './args';
import { CommandMetadata } from './CommandMetadata';
import { ListenerMetadata } from './ListenerMetadata';
import { FlagMetadata } from './FlagMetadata';
import { MetadataStorage } from './MetadataStorage';
import { AuthMetadata } from './AuthMetadata';

export class MetadataBuilder {
  private readonly metadataStorage: MetadataStorage;

  constructor() {
    this.metadataStorage = getMetadataStorage();
  }

  buildCommandMetadata(classes?: Function[]): CommandMetadata[] {
    return this.createCommands(classes);
  }

  buildListenerMetadata(classes?: Function[]): ListenerMetadata[] {
    return this.createListeners(classes);
  }

  private createCommands(classes?: Function[]): CommandMetadata[] {
    const commands = classes ? this.metadataStorage.filterMetadataForCommands(classes) : this.metadataStorage.commands;
    return commands.map(args => {
      const command = new CommandMetadata(args);
      command.flags = this.createFlags(command);
      command.subCommands = this.createSubCommands(command);
      command.auth = this.createCommandAuth(command);
      return command;
    });
  }

  private createListeners(classes?: Function[]): ListenerMetadata[] {
    const listeners = classes ? this.metadataStorage.filterMetadataForListeners(classes) : this.metadataStorage.listeners;
    return listeners.map(args => {
      const listener = new ListenerMetadata(args);
      return listener;
    });
  }

  private createFlags(command: CommandMetadata): FlagMetadata[] {
    let target = command.target;
    const flagsWithTarget: FlagMetadataArgs[] = [];
    while (target) {
      flagsWithTarget.push(
        ...this.metadataStorage
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

  private createSubCommands(command: CommandMetadata): SubCommandMetadata[] {
    let target = command.target;
    const subCommandsWithTarget: SubCommandMetaDataArgs[] = [];
    while (target) {
      subCommandsWithTarget.push(
        ...this.metadataStorage
          .filterSubcommandsForTarget(target)
          .filter(sc => subCommandsWithTarget.map(s => s.method).indexOf(sc.method) === -1)
      );
      target = Object.getPrototypeOf(target);
    }
    return subCommandsWithTarget.map(args => new SubCommandMetadata(args));
  }

  private createCommandAuth(command: CommandMetadata): AuthMetadata[] {
    let target = command.target;
    const authWithTarget: AuthorizedMetadataArgs[] = [];
    while (target) {
      authWithTarget.push(
        ...this.metadataStorage
          .filterAuthForCommand(target)
          .filter(auth => authWithTarget.map(a => a.method).indexOf(auth.method) === -1)
      );
      target = Object.getPrototypeOf(target);
    }
    return authWithTarget.map(args => new AuthMetadata(args));
  }
}
