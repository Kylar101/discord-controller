import { Client } from './client/client';
import { CommandOptions } from './commandOptions';
import { MetadataBuilder } from './metadata/MetadataBuilder';

export class CommandController {
  private metadataBuilder: MetadataBuilder;

  constructor(private client: Client, private options: CommandOptions) {
    this.metadataBuilder = new MetadataBuilder(options);
  }
}