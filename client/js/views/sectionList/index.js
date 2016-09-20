import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import Modal from '../modalSection/index';
import SectionsCollection from '../../collections/sections';
import SectionsView from '../sectionItem/index';
import tmpl from  './section.ejs';

export default View.extend({

  events: {
    'click td:first-child': 'navigation',
    'click .add_section': 'addSection'
  },

  template: tmpl,

  initialize: function () {

    this.$el.html(this.template());
    this.coll = new SectionsCollection();

    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();
  },

  render: function () {
    $('tbody').html('');                          //!!!!!!!
    const tbody = this.$('tbody');
    _.each(this.coll.models, function (model) {

      const modelView = new SectionsView({
        model: model
      });

      modelView.render();
      tbody.append(modelView.$el);
    }, this);

    if (sessionStorage.getItem('moderator')){
      $('.delete_section').show();
    }
  },

  navigation: function (e) {
    const section_name = $(e.target).text();
    sessionStorage.setItem('section', section_name);

     Backbone.history.navigate('themes',  {trigger: true});
  },

  addSection: function () {
    new Modal({
      el: '.modal',
      coll: this.coll
    });
  }
});
