import CommentCollection from '../js/collections/comments';
import CommentModel from '../js/models/comment';
import CommentView from '../js/views/commentItem/index';
import CommentList from '../js/views/commentList';
import fauxServer from '../backbone-faux-server';

QUnit.module('comments', {
  before: function () {
    fauxServer
      .addRoute('commentsGet', '/api/themes/theme1/comments', 'GET', function () {
      return require('../stubs/comments.json');
    })
      .addRoute('all_commentsGet', '/api/themes', 'GET', function () {
        return require('../stubs/all_comments.json');
      });
  }
});

QUnit.test('comment model test', function(assert){
  assert.expect(5);
  const model = new CommentModel();
  assert.ok(model.urlRoot !== '');
  assert.ok(model.get('text') === 'Text');
  assert.ok(model.get('date') === 'Date');

  model.set('text', 'some text...');
  model.set('date', '2016-09-20 12:32:46');

  assert.ok(model.get('text') === 'some text...');
  assert.ok(model.get('date') === '2016-09-20 12:32:46');
});

QUnit.test('comment collection test', function(assert){
  assert.expect(5);

  const model = new CommentModel();
  const collection = new CommentCollection('theme1');
  assert.ok(collection.theme === 'theme1');
  assert.ok(collection.url() !== '');

  const done = assert.async();
  collection.fetch({
    success: data => {
      console.dir(data);
      assert.equal(collection.length, 1);
      collection.add(model);
      assert.equal(collection.length, 2);
      collection.remove(model);
      assert.equal(collection.length, 1);
      done();
    }
  });
});

QUnit.test('comment view test', function (assert) {
  const model = new CommentModel();
  model.set('text', 'some text...');
  model.set('date', '2016-09-20 12:32:46');

  const view = new CommentView({model: model});
  view.render();
  assert.ok(view.tagName === 'div');
  assert.ok(view.className === 'comment');
  assert.ok(view.$el.find('.delete').click !== undefined);
  assert.ok(view.$el.html() !== '');
});

QUnit.test('comment list test', function(assert){
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
    assert.equal( comment.innerHTML, 'First message');

    done();
  }});

});

