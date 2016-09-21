import ThemeCollection from '../js/collections/themes';
import ThemeModel from '../js/models/theme';
import ThemeList from '../js/views/themeList/index';
import fauxServer from '../backbone-faux-server';

QUnit.module('themes', {
  before: function () {
    fauxServer.addRoute('themesGet', '/api/sections/Section1/themes', 'GET', function () {
      return require('../stubs/themes.json');
    })
      .addRoute('all_themesGet', '/api/themes/:name', 'GET', function (context, name) {
        return require('../stubs/all_themes.json');
      });
  }
});

QUnit.test('theme1 collection test', function(assert){

  const model = new ThemeModel({name: 'Theme1'});
  model.idAttribute = 'name';
  const coll = new ThemeCollection('Section1');
  assert.ok(coll.section === 'Section1');
  assert.ok(coll.url() !== '');

  const done = assert.async();
  coll.fetch({
    success: data => {
      console.dir(data);
      assert.equal(coll.length, 2);
      coll.add(model);
      assert.equal(coll.length, 3);
      coll.remove(model);
      assert.equal(coll.length, 2);
      done();
    }
  });
});

QUnit.test('theme model test', function(assert){
  const model = new ThemeModel({name: 'Theme1'});
  model.idAttribute = 'name';
  assert.ok(model.get('name') === 'Theme1');
  assert.ok(model.urlRoot !== '');
  assert.ok(model.idAttribute === 'name');
  assert.ok(model.has('name'));

  const done = assert.async();
  model.fetch({
    success: () => {
      assert.ok(model.get('name') !== '');
      done();
    }
  });
});

QUnit.test('theme view test', function(assert){
  const collection = new ThemeCollection('Section1');
  const el = document.createElement('div');
  let view = new ThemeList({ collection, el, section: 'Section1' });
  const done = assert.async();

  collection.fetch({success: function (){
    view.render();
    const table = el.querySelector('table');
    console.dir(table);
    assert.equal(table.className, 'chapter');

    let td = el.querySelector('td:first-child');
    assert.equal(td.innerHTML, 'theme1');

    td = el.querySelector('tr:last-child > td:first-child');
    assert.equal(td.innerHTML, 'theme2');

    let back  = el.querySelector('.back');
    assert.equal(back.innerHTML, 'Вернуться на главную');

    let add_th = el.querySelector('.add_theme');
    assert.equal(add_th.innerHTML, 'Добавить тему');

    done();
  }});
});
