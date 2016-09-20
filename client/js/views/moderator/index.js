import $ from 'jquery';
import {View} from 'backbone';
import tmpl from './moderatorButtons.ejs';
import ModerModal from '../moderator_window/index';


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
    $('#enter_moderator').fadeIn(200);
    $('#exit_moderator').hide();
    $('.delete_theme').hide();
    $('.delete_section').hide();
    $('.delete').hide();
  },

  enterModerator: function(){

    new ModerModal({el: '.modal'});

    // $("#overlay").show().click(() => {
    //   $(".window_moderator").hide();
    //   $("#overlay").hide();
    // });
    // $('.enter').click(this.enter);
  },

  showButt: function(){
    if (sessionStorage.getItem('moderator')) {
      $('#enter_moderator').hide();
      $('#exit_moderator').show();
    }
  }

});
