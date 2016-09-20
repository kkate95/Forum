import './../css/index.css';
import 'quill/dist/quill.snow.css';
import IndexRouter from './routers/index';
import  ForumRouter from './routers/navigate';
import ModeratorView from './views/moderator/index';
// import fauxServer from '../backbone-faux-server';

new ModeratorView({el: '.for_moderator'});

const router = new IndexRouter();
const nav = new ForumRouter();
/*fauxServer.addRoute('commentsGet', '/api/themes/theme1/comments', 'GET', function () {
  const data = require('../stubs/comments.json');
  console.log(data);
  return data;
});*/

Backbone.history.start({pushState: true});
