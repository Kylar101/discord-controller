import { Client } from './client/client';
import { MetadataBuilder } from './metadata/MetadataBuilder';

export class CommandController {
  private metadataBuilder: MetadataBuilder;

  constructor(private client: Client) {
    this.metadataBuilder = new MetadataBuilder();
  }

  registerCommands(classes?: Function[]): this {
    const commands = this.metadataBuilder.buildCommandMetadata(classes);
    commands.map(command => {
      this.client.registerActionCommand(command);
    });
    return this;
  }
}
