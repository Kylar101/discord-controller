import { ClientEvents, Events } from "discord.js";
import { Listen, Listener, DiscordEvents } from "discord-controller";

@Listen(Events.MessageCreate)
export class TestListener implements Listener<DiscordEvents.Message> {
  async listen(parameters: ClientEvents[Events.MessageCreate]) {
    const [message] = parameters;
    return message.content.includes("hello");
  }

  run(parameters: ClientEvents[Events.MessageCreate]) {
    const [message] = parameters;
    message.channel.send("someone sent a greeting");
  }
}
