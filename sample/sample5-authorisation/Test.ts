import { Authorized, Action, Command, Interaction } from "discord-controller";

@Authorized("AllowedRole")
@Command({ description: "This is the description" })
export class Test extends Action {
  constructor() {
    super();
  }

  async run(message: Interaction) {
    message.channel.send(
      "This command can be used by members who have 'AllowedRole' role",
    );
  }
}
