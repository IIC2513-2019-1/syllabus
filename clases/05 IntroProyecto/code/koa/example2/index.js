const Koa = require('koa');
const Router = require('koa-router');

const router = new Router()
const app = new Koa();

router.get('/todos', (ctx) => {
  ctx.status = 200;
  ctx.body = [{
    id: 1,
    text: 'Install postgreSQL',
    completed: false,
  }, {
    id: 2,
    text: 'Review template',
    completed: false,
  }, {
    id: 3,
    text: 'Write some code',
    completed: false,
  }];
});


app.use(router.routes());
// makes sure a 405 Method Not Allowed is sent
app.use(router.allowedMethods());

app.listen(3000);
