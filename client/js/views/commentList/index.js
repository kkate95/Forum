import $ from 'jquery';
import Backbone from 'backbone';
import tmpl from  './comment.ejs';
import CommentsCollection from '../../collections/comments';
import CommentsView from '../commentItem/index';
import striptags from 'striptags';
import Quill from 'quill';

let CommentList = Backbone.View.extend({

  events: {
    'click .back' : 'back',
    'click .add_response' : 'add_response',
    'click #arrow' : 'arrow'
  },

  template: tmpl,

  initialize: function ( options={} ) {
    const theme =  options.theme || sessionStorage.getItem('theme');
    this.$el.html(this.template({theme: theme}));
    this.coll = new CommentsCollection(theme);

    this.listenTo(this.coll, 'change', this.render);
    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();

    var options = {
      placeholder: 'Введите ваше сообщение...',
      theme: 'snow'
    };
    var editor = new Quill('.next', options);
  },

  render: function () {

    $('.all_commentaries').html('');
    const comment = this.$('.all_commentaries');

    $('.random1').text(Math.round(Math.random()*1000));

    const models = this.coll.models;
    for(let i = models.length-1; i >=0; i--){
      const modelView = new CommentsView({
        model: models[i]
      });

      modelView.render();
      comment.append(modelView.$el);
    }

    if (sessionStorage.getItem('moderator')){
      $('.delete').show();
    }

    $(window).scroll(() => {
      const st = $(window).scrollTop();
      if (st > 100) {
        $('#arrow').fadeIn('normal');
      } else {
        $('#arrow').fadeOut('normal');
      }
    });

  },

  add_response: function(){

    let next_message = $('.ql-editor');
    let current =  new Date().toLocaleString();
    const theme_name = $('#commentsHead > h2').text();
    let text = next_message.html();
    text = striptags(text, ['a', 'p', 'br', 'b', 'u', 'em', 'li', 'ol', 'ul', 'h1', 'h2', 'h3']);
    text = $.trim(text);

    if (text === "") {
      alert('Пожалуйста,напишите в поле для сообщения что-нибудь!');
      return;
    }

    let captcha1 = $('.captcha1').val();
    captcha1 = $.trim(captcha1);

    if (captcha1 !== $('.random1').text()) {
      alert('Не правильно введено число! Попробуйте ещё раз!');
      $('.captcha1').val('');
      return;
    }

    this.coll.create({date: current, text: text, themeId: theme_name});
    next_message.html('');
    $('.captcha1').val('');
  },

  arrow: function(){
      $('body,html').animate({"scrollTop" : 0}, "normal");
  },

  back: function() {
    Backbone.history.navigate('sections', {trigger: true});
    $('.back').fadeOut(200);
  }

});

export default CommentList;
