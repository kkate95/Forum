import $ from 'jquery';
import CommentsCollection from '../../collections/comments';
import CommentsView from '../commentItem/index';
import Quill from 'quill';
import {View} from 'backbone';
import striptags from 'striptags';
import tmpl from './comment.ejs';

export default View.extend({

  events: {
    'click .back' : 'back',
    'click .add_response' : 'add_response',
    'click #arrow' : 'arrow'
  },

  template: tmpl,

  initialize: function ( options = {} ) {
    const theme = options.theme || sessionStorage.getItem('theme');
    this.$el.html(this.template({theme: theme}));
    this.coll = new CommentsCollection(theme);

    this.listenTo(this.coll, 'change', this.render);
    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();

    var editor = new Quill('.next', {
      placeholder: 'Введите ваше сообщение...',
      theme: 'snow'
    });
  },

  render: function () {

    this.$el.find('.all_commentaries').html('');
    const comment = this.$el.find('.all_commentaries');

    this.$el.find('.random1').text(Math.round(Math.random() * 1000));

    const models = this.coll.models;
    for (let i = models.length - 1; i >= 0; i--){
      const modelView = new CommentsView({
        model: models[i]
      });

      modelView.render();
      comment.append(modelView.$el);
    }

    if (sessionStorage.getItem('moderator')){
      this.$el.find('.delete').show();
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

    let next_message = this.$el.find('.ql-editor');
    let current = new Date().toLocaleString();
    const theme_name = this.$el.find('#commentsHead > h2').text();
    let text = next_message.html();
    text = striptags(text, ['a', 'p', 'br', 'b', 'u', 'em', 'li', 'ol', 'ul', 'h1', 'h2', 'h3']);
    text = $.trim(text);

    if (text === "") {
      alert('Пожалуйста,напишите в поле для сообщения что-нибудь!');
      return;
    }

    let captcha1 = this.$el.find('.captcha1').val();
    captcha1 = captcha1.trim();

    if (captcha1 !== this.$el.find('.random1').text()) {
      alert('Не правильно введено число! Попробуйте ещё раз!');
      this.$el.find('.captcha1').val('');
      return;
    }

    this.coll.create({
      date: current,
      text: text,
      themeId: theme_name
    });
    next_message.html('');
    this.$el.find('.captcha1').val('');
  },

  arrow: function(){
      $('body,html').animate({"scrollTop" : 0}, "normal");
  },

  back: function() {
    Backbone.history.navigate('sections', {trigger: true});
    $('.back').fadeOut(200);
  }

});
