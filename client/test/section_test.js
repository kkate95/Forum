import SectionCollection from '../js/collections/sections';
import SectionModel from '../js/models/section';
import SectionView from '../js/views/sectionItem/index';
import SectionList from '../js/views/sectionList';
import ModerView from '../js/views/moderator/index';
import fauxServer from '../backbone-faux-server';

QUnit.module('sections', {
  before: function () {
    fauxServer.addRoute('sectionsGet', '/api/sections', 'GET', function () {
      const json_data = require('../stubs/sections.json');
      return json_data;
    });
  }
});


QUnit.test('section collection test', function(assert){
  const collection = new SectionCollection();
  const done = assert.async();
  collection.fetch({
    success: data => {
      console.dir(data);
      assert.equal(collection.length, 2);
      done();
    }
  });
});

QUnit.test('section model test', function(assert){
  const model = new SectionModel();
  const done = assert.async();
  model.fetch({
    success: () => {
      assert.ok(model.get('name') !== '');
      done();
    }
  });
});

QUnit.test('section view test', function(assert){
  const collection = new SectionCollection();
  const el = document.createElement('div');
  let view = new SectionList({ collection, el });
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


    view = new ModerView({el: el});
    view.render();
    let moder = el.querySelector('#enter_moderator');
    assert.equal(moder.innerHTML, 'Войти как модератор');

    done();
  }});

});
