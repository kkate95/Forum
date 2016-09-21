import './../css/index.css';
import 'quill/dist/quill.snow.css';
import ForumRouter from './routers/navigate';
import IndexRouter from './routers/index';
import ModeratorView from './views/moderator/index';

new ModeratorView({el: '.for_moderator'});

new IndexRouter();
new ForumRouter();

Backbone.history.start({pushState: true});
