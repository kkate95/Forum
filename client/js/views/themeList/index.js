import Modal from '../modalTheme/index';
import ThemesCollection from '../../collections/themes';
import ThemesView from '../themeItem/index';
import {View} from 'backbone';
import _ from 'underscore';
import tmpl from './theme.ejs';

export default View.extend({

  events: {
    'click .add_theme' : 'addTheme',
    'click td:first-child': 'navigation',
    'click .back' : 'back'
  },

  template: tmpl,

  initialize: function (options = {}) {

    const section = options.section || sessionStorage.getItem('section');
    this.$el.html(this.template({section: section}));
    this.coll = new ThemesCollection(section);

    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();
  },

  render: function () {

    this.$el.find('tbody').html('');
    const tbody = this.$el.find('tbody');

    _.each(this.coll.models, function (model) {

      const modelView = new ThemesView({model: model});

      modelView.render();
      tbody.append(modelView.$el);
    }, this);


    if (sessionStorage.getItem('moderator')){
      this.$el.find('.delete_theme').show();
    }
  },

  navigation: function(e) {
      const theme_name = this.$el.find(e.target).text();
      sessionStorage.setItem('theme', theme_name);
      Backbone.history.navigate('comments', {trigger: true});
  },

  addTheme: function() {
    new Modal({
      el: '.modal',
      coll: this.coll
    });
  },

  back() {
    Backbone.history.navigate('sections', {trigger: true});
    this.$el.find('.back').fadeOut(200);
  }
});
