import Modal from '../modalSection/index';
import SectionsCollection from '../../collections/sections';
import SectionsView from '../sectionItem/index';
import {View} from 'backbone';
import _ from 'underscore';
import tmpl from './section.ejs';

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
    this.$el.find('tbody').html('');
    const tbody = this.$el.find('tbody');
    _.each(this.coll.models, function (model) {

      const modelView = new SectionsView({
        model: model
      });

      modelView.render();
      tbody.append(modelView.$el);
    }, this);

    if (sessionStorage.getItem('moderator')){
      this.$el.find('.delete_section').show();
    }
  },

  navigation: function (e) {
    const section_name = this.$el.find(e.target).text();
    sessionStorage.setItem('section', section_name);

    Backbone.history.navigate('themes', {trigger: true});
  },

  addSection: function () {
    new Modal({
      el: '.modal',
      coll: this.coll
    });
  }
});
