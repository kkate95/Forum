import {View} from 'backbone';
import moment from 'moment';
import striptags from 'striptags';
import tmpl_modal from './modal.ejs';

export default View.extend({
  events: {
    'click #overlay': 'close',
    'click .create_section': 'create'
  },

  initialize: function (options) {
    this.coll = options.coll;
    this.$el.html(tmpl_modal()).
      find('.modal_section, #overlay').
      fadeIn('normal');
  },

  close: function () {
    this.$el.find('.modal_section, #overlay').
      fadeOut(100);
  },
  
  create: function () {
    let section_name = this.$el.find('.modal_section > input').val();
    section_name = striptags(section_name);
    section_name = section_name.trim();

    if (section_name === '') {
      alert('Введите название раздела!');
      return;
    }

    this.coll.create({name: section_name, date: moment().format('YYYY MM DD')});

    this.close();
  }
});
