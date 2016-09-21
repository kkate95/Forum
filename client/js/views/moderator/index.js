import $ from 'jquery';
import ModerModal from '../moderator_window/index';
import {View} from 'backbone';
import tmpl from './moderatorButtons.ejs';

export default View.extend({
  events: {
    'click #exit_moderator' : 'exitModerator',
    'click #enter_moderator' : 'enterModerator'
  },

  initialize: function() {
    this.$el.html(tmpl());
    this.showButt();
  },

  exitModerator: function(){
    sessionStorage.removeItem('moderator');
    this.$el.find('#enter_moderator').fadeIn(200);
    this.$el.find('#exit_moderator').hide();
    $('.delete_theme').hide();
    $('.delete_section').hide();
    $('.delete').hide();
  },

  enterModerator: function(){
    new ModerModal({el: '.modal'});
  },

  showButt: function(){
    if (sessionStorage.getItem('moderator')) {
      this.$el.find('#enter_moderator').hide();
      this.$el.find('#exit_moderator').show();
    }
  }
});
