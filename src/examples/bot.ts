import { createServer } from '../index';
const bot = createServer({
  token: 'NzI5MTk3NzA4MTQwODcxNzcx.XwFlwA.fYNACDiuYIHCENFhvPtZmTCjQXI',
  commands: [
    __dirname + '/commands/*.ts',
  ]
});

bot.start();