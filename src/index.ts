import { MetadataStorage } from './metadata/MetadataStorage';

export function getMetadataStorage(): MetadataStorage {
  if (!(global as any).metaDataStorage)
      (global as any).metaDataStorage = new MetadataStorage();

  return (global as any).metaDataStorage;
}

export function createServer(options: any): any {
  return options;
}