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
    import { Command, Action } from 'discord-controller';
    import { Message } from 'discord.js';

    @Command()
    export class MyCommand extends Action {
        constructor() {
            super();
        }

        run(message: Message) {
            message.channel.send('This command will reply to the user');
        }
    }
    ```

    this class will register a command with the bot

3. Create a file `bot.ts`
    ```typescript
    import 'reflect-metadata';
    import { createServer } from 'discord-controller';
    import { MyCommand } from './MyCommand';

    // creates the bot and registers all commands
    const bot = createServer({
        token: 'YOUR_AUTH_TOKEN',
        commands: [MyCommand] // specify which commands you want to use
    });

    // starts the bot
    bot.start();
    ```

4. Run your bot and type `!mycommand` in your discord server. The bot will respond with `"This command will reply to the user"`

## More Examples

### Custom Command Prefixes

You can change the command prefix from the default `!` by passing it into the command decorator

```typescript
import { Command, Action } from 'discord-controller';
import { Message } from 'discord.js';

@Command('&')
export class MyCommand extends Action {
    constructor() {
        super();
    }

    run(message: Message) {
        message.channel.send('This command will reply to the user');
    }
}
```

This will make the command respond to `&mycommand`

### Command Flags

If you are designing a command that has options, you can use `@Flag` in addition to `@Command` to add flags to your command.

```typescript
import { Command, Flag, Action } from 'discord-controller';
import { Message } from 'discord.js';

@Command()
export class MyCommand extends Action {
    constructor() {
        super();
    }

    run(message: Message) {
        message.channel.send('This will be sent from the base command');
    }

    @Flag()
    myFlag(message: Message) {
        message.channel.send('This will be sent from the flag');
    }
}
```

`!mycommand` will respond with `"This will be sent from the base command"` and `!mycommand myflag` will respond with `"This will be sent from the flag"`

### Dependency Injection

`discord-controller` has inbuilt dependency injection that will work automatically when using the `@Service` decorator

```typescript
import { Command, Service, Action } from 'discord-controller';
import { Message } from 'discord.js';

@Service()
export class MyService {
    myFunction() {
        return 'this is from a service';
    }
}

@Command()
export class MyCommand extends Action {
    constructor(private service: MyService) {
        super();
    }

    run(message: Message) {
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
@Command()
export class MyCommand extends Action {
  constructor() {
    super();
  }

  run(message: Message) {
    message.channel.send('This command can be used by members who have the `AllowedRole` role');
  }
}
```

### Listeners

If you are to monitor for a certain action being performed, you can use `@Listen` and pass in the event that you wish to monitor

> NOTE: Currently only available for monitoring messages

```typepscript
import { Listen, DiscordEvents, Listener } from 'discord-controller';
import { Message } from 'discord.js';

@Listen(DiscordEvents.Message)
export class MyListener extends Listener {
  constructor() {
    super();
  }

  listen(message: Message) {
    return message.content.includes('hello');
  }

  run(message: Message) {
    message.channel.send('someone sent a greeting');
  }
}
```

