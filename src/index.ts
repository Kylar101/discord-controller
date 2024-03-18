import { Client } from './client/client';
import { CommandController } from './CommandController';
import type { BotOptions } from './BotOptions';
import { MetadataStorage } from './metadata/MetadataStorage';
import { importClassesFromDirectories } from './utils/importClassesFromDirectories';

export * from './BotOptions';
export * from './CommandController';
export * from './metadata';
export * from './decorator';
export * from './client';
export * from './commands';
export * from './utils';
export * from './types';

export function getMetadataStorage(): MetadataStorage {
  if (!(global as any).metaDataStorage)
    (global as any).metaDataStorage = new MetadataStorage();

  return (global as any).metaDataStorage;
}

export async function createServer(options: BotOptions): Promise<Client> {
  const client = new Client(options);
  return managerServer(client, options);
}

async function managerServer(
  client: Client,
  options: BotOptions,
): Promise<Client> {
  createExecutor(client, options);
  return client;
}

async function createExecutor(client: Client, options: BotOptions) {
  let commandClasses: Function[] = [];
  if (options?.commands?.length) {
    commandClasses = (options.commands as any[]).filter(
      (command) => command instanceof Function,
    );
    const commandDirs = (options.commands as any[]).filter(
      (command) => typeof command === 'string',
    );
    commandClasses.push(...importClassesFromDirectories(commandDirs));
  }

  let listenerClasses: Function[] = [];
  if (options?.listeners?.length) {
    listenerClasses = (options.listeners as any[]).filter(
      (listener) => listener instanceof Function,
    );
    const listenerDirs = (options.listeners as any[]).filter(
      (listener) => typeof listener === 'string',
    );
    listenerClasses.push(...importClassesFromDirectories(listenerDirs));
  }

  (
    await new CommandController(client, options).registerCommands(
      commandClasses,
    )
  )
    .resolveCommands()
    .registerListeners(listenerClasses);
}
