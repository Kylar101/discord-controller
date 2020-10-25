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