import { Action, Command, Interaction } from "discord-controller";

@Command({ description: "This is the description" })
export class Test extends Action {
  constructor() {
    super();
  }

  async run(message: Interaction) {
    await message.reply("Hello world");
  }
}
