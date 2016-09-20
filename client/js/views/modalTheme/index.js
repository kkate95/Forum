import {View} from 'backbone';
import moment from 'moment';
import striptags from 'striptags';
import tmpl from './modal_newThemeForm.ejs';

export default View.extend({
  events: {
    'click #overlay': 'close',
    'click .button_create': 'create'
  },

  initialize: function (options) {
    this.coll = options.coll;
    this.$el.html(tmpl()).
      find('.new_theme, #overlay').
      fadeIn('normal').
      find('.random2').text(Math.round(Math.random()*1000));
  },

  close: function () {
    this.$el.find('.new_theme, #overlay').
      fadeOut(100);
  },

  create: function(){
    let theme_name = this.$el.find("#theme").val();
    theme_name = striptags(theme_name);
    theme_name = theme_name.trim();

    const section = sessionStorage.getItem('section');
    const captcha2 = this.$el.find('.captcha2').val();

    if (theme_name === ''){
      alert('Напишите, пожалуйста, название темы! ');
      return;
    }

    if (captcha2 !== this.$el.find('.random2').text()){
      alert('Не правильно введено число! Попробуйте ещё раз!');
      return;
    }
    this.coll.create({
      name: theme_name,
      date: moment().format('YYYY MM DD'),
      sectionId: section
    });

    this.close();
  }
});
