# Discord Client
> A discord bot framework with inbuilt dependency injection

## Installation

1. Install module

    `npm install discord-controller`

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

1. Register a new bot with [discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot), it to your server and copy your auth token

2. Create a file `MyCommand.ts`

    ```ts
    import { Command, Action, Message } from 'discord-controller';

    @Command()
    export class MyCommand extends Action {
        run(message: Message) {
            message.channel.send('This command will reply to the user');
        }
    }
    ```

    this class will register a command with the bot

3. Create a file `bot.ts`
    ```ts
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

4. Run `node bot.ts` and type `!mycommand` in your discord server. The bot will respond with `"This command will reply to the user"`