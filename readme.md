# Discord Controller
> A discord bot framework with inbuilt dependency injection

## Installation

1. Install module and the discord sdk

    `npm install discord-controller discord.js`

2. `reflect-metadata` shim is required

    `npm install reflect-metadata`

   and make sure to import it before using discord-controller

3. Its important to set the following options in the `tsconfig.json` file of your project

    ```
    {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    }
    ```

## Example of useage

1. Register a new bot with [discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot), add it to your server and copy your auth token

2. Create a file `MyCommand.ts`

    ```typescript
    import { Action, Command, Interaction } from 'discord-controller';

    @Command({ description: 'This is the description' })
    export class MyCommand extends Action {
      constructor() {
        super();
      }
    
      async run(message: Interaction) {
        await message.reply('This command will reply to the user');
      }
    }
    ```

    this class will register a command with the bot

3. Create a file `bot.ts`
    ```typescript
    import { createServer } from 'discord-controller';
    import { MyCommand } from './MyCommand';
    
    (async () => {
      try {
        const bot = await createServer({
          permissions: [],
          token: 'TOKEN',
          guildId: 'GUILD_ID',
          clientId: 'CLIENT_ID',
          commands: [
            MyCommand,
          ],
        });
        bot.start();
      } catch (e) {
        console.log('Unable to start bot');
      }
    })();

    ```

4. Run your bot and type `/mycommand` in your discord server. The bot will respond with `"This command will reply to the user"`

## More Examples

### Sub Commands

If you are designing a command that has options, you can use `@SubCommand` in addition to `@Command` to add flags to your command.

```typescript
import { Action, Command, Interaction, SubCommand, Flag, FlagType } from 'discord-controller';

@Command({ description: 'This is the description' })
export class Test extends Action {
  constructor() {
    super();
  }

  async run(
    message: Interaction
  ): Promise<void> {
    await message.reply('This will be send from the base command');
  }

  @SubCommand({ description: 'This is the description' })
  async subCommand(
    interaction: Interaction
  ) {
    await interaction.reply('This will be sent from the subcommand');
  }
}
```

This will create 2 commands for `MyCommand`, a `default` command and a `subCommand` command. Accesable like `/mycommand default` and `/mycommand subcommand`

`/mycommand default` will respond with `"This will be sent from the base command"` and `/mycommand subcommand` will respond with `"This will be sent from the subcommand"`

### Dependency Injection

`discord-controller` has inbuilt dependency injection that will work automatically when using the `@Service` decorator

```typescript
import { Command, Interaction, Service, Action } from 'discord-controller';

@Service()
export class MyService {
    myFunction() {
        return 'this is from a service';
    }
}

@Command({ description: 'description' })
export class MyCommand extends Action {
    constructor(private service: MyService) {
        super();
    }

    run(message: Interaction) {
        message.channel.send(this.service.myFunction());
    }
}
```

### Authorisation

If you are designing a command that needs to be restricted to users with a particular role, you can use `@Authorized` in addition to `@Command` to restrict access.

```typescript
import { Command, Authorized, Action } from 'discord-controller';
import { Message } from 'discord.js'

@Authorized('AllowedRole')
@Command({ description: 'description' })
export class MyCommand extends Action {
  constructor() {
    super();
  }

  run(message: Interaction) {
    message.channel.send('This command can be used by members who have the `AllowedRole` role');
  }
}
```

### Listeners

If you are to monitor for a certain action being performed, you can use `@Listen` and pass in the event that you wish to monitor

```typescript
import { ClientEvents, Events } from 'discord.js';
import { Listen, Listener, DiscordEvents } from 'discord-controller';

@Listen(Events.MessageCreate)
export class TestListener implements Listener<DiscordEvents.Message> {
  async listen(parameters: ClientEvents[Events.MessageCreate]) {
    const [message] = parameters;
    return message.content.includes('hello');
  }

  run(parameters: ClientEvents[Events.MessageCreate]) {
    const [message] = parameters;
    message.channel.send('someone sent a greeting');
  }
}
```

> NOTE: If you find that the listener is not working, check that you have added the required permissions during start up

To view supported events visit the [discord.js documentation](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate)
