import CommentCollection from '../js/collections/comments';
import CommentModel from '../js/models/comment';
import CommentView from '../js/views/commentItem/index';
import CommentList from '../js/views/commentList';
import fauxServer from '../backbone-faux-server';

QUnit.module('comments', {
  before: function () {
    fauxServer.addRoute('commentsGet', '/api/themes/theme1/comments', 'GET', function () {
      return require('../stubs/comments.json');
    });
  }
});

QUnit.test('comment collection test', function(assert){
  const collection = new CommentCollection('theme1');
  const done = assert.async();
  collection.fetch({
    success: data => {
      console.dir(data);
      assert.ok(collection.length == 1);
      done();
    }
  });
});

QUnit.test('comment view test', function(assert){
  const collection = new CommentCollection('theme1');
  const el = document.createElement('div');
  let view = new CommentList({ collection, el, theme: 'theme1' });
  const done = assert.async();

  collection.fetch({success: function () {
    view.render();

    let add_resp = el.querySelector('#button_center > .add_response');
    assert.equal( add_resp.innerHTML, 'Добавить ответ');

    let captcha = el.querySelector('.captcha1');
    assert.equal( captcha.innerHTML, '');

    let comment = el.querySelector('.comment > h4');
    assert.equal( comment.innerHTML, 'Text');

    done();
  }});

});
