import $ from 'jquery';
import {View} from 'backbone';
import tmpl_modal from './moderator_window.ejs';

export default View.extend({
  events: {
    'click .enter': 'enter',
    'click #overlay': 'close'
  },

  initialize: function(){
    this.$el.html(tmpl_modal()).
      find('.window_moderator, #overlay').
      fadeIn('normal');
  },

  enter: function() {
    let password = this.$el.find('.password').val();
    password = password.trim();

    if (password === '1') {
      sessionStorage.setItem('moderator', '1');
      $('.delete').show();
      $('.delete_theme').show();
      $('.delete_section').show();


      this.close();
      $('#exit_moderator').show();
      $('#enter_moderator').hide();
    } else {
      alert('Пароль не правильный');
    }
  },

  close: function(){
    this.$el.find('.window_moderator, #overlay').
      fadeOut(100);
  }
});
