import SectionCollection from '../js/collections/sections';
import SectionModel from '../js/models/section';
import SectionView from '../js/views/sectionItem/index';
import SectionList from '../js/views/sectionList';
import ModerView from '../js/views/moderator/index';
import fauxServer from '../backbone-faux-server';

QUnit.module('sections', {
  before: function () {
    fauxServer.addRoute('sectionsGet', '/api/sections', 'GET', function () {
      return require('../stubs/sections.json');
    });
  }
});

QUnit.test('section collection test', function(assert){
  const model = new SectionModel();
  assert.expect(4);
  const collection = new SectionCollection();
  assert.ok(collection.url() !== '');

  const done = assert.async();
  collection.fetch({
    success: data => {
      console.dir(data);
      assert.equal(collection.length, 2);
      collection.add(model);
      assert.equal(collection.length, 3);
      collection.remove(model);
      assert.equal(collection.length, 2);
      done();
    }
  });
});

QUnit.test('section model test', function(assert){
  assert.expect(5);

  const model = new SectionModel();
  assert.equal(model.get('name'), 'Section');
  assert.equal(model.get('date'), 'Created-date');
  assert.ok(model.has('date'));
  assert.ok(model.urlRoot !== '');

  const done = assert.async();
  model.fetch({
    success: () => {
      assert.ok(model.get('name') !== '');
      done();
    }
  });
});

QUnit.test('section list test', function(assert){
  assert.expect(9);
  const collection = new SectionCollection();
  const el = document.createElement('div');
  let view = new SectionList({ collection, el });

  assert.ok(view.$el.find('td:first-child').click !== undefined);
  assert.ok(view.$el.find('.add_section').click !== undefined);

  const done = assert.async();

  collection.fetch({success: function () {
    view.render();
    const table = el.querySelector('table');
    console.dir(table);
    assert.equal(table.className, 'chapter');

    let td = el.querySelector('td:first-child');
    assert.equal(td.innerHTML, 'Section1');

    td = el.querySelector('tr:last-child > td:first-child');
    assert.equal(td.innerHTML, 'Section2');

    assert.ok(view.$el.find('tbody').html() !== '');

    view = new ModerView({el: el});
    view.render();
    const moder = el.querySelector('#enter_moderator');
    assert.equal(moder.innerHTML, 'Войти как модератор');
    assert.ok(view.$el.find('#enter_moderator').click !== undefined);
    assert.ok(view.$el.find('#exit_moderator').click !== undefined);

    done();
  }});
});

QUnit.test('section view test', function(assert){
  const model = new SectionModel();
  model.set('name', 'Section1');
  model.set('date', new Date().toDateString());

  assert.ok(model.get('name') !== '');

  const view = new SectionView({model: model});

  view.render();

  assert.ok(view.$el.html() !== '');
  assert.ok(view.tagName === 'tr');
  assert.ok(view.$el.find('.delete_section').click !== undefined);
});
