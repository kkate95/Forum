import SectionList from '../views/sectionList/index';
import ThemeList from '../views/themeList/index';
import CommentList from '../views/commentList/index';
import { Router } from 'backbone';
import $ from 'jquery';

export default Router.extend({
  routes: {
    'sections': 'navigate_sections',
    'themes'  : 'navigate_themes',
    'comments': 'navigate_comments'
  },

  oldView : null,

  $el: $('.content'),

  closeOld: function(){
    this.oldView.remove();
  },

  navigate_sections: function(){
    if (this.oldView) this.closeOld();
    $(document.body).append(this.$el);
    this.oldView = new SectionList({el : this.$el});
  },

  navigate_themes: function(){
    if (this.oldView) this.closeOld();
    $(document.body).append(this.$el);
    this.oldView = new ThemeList({el : this.$el});
  },

  navigate_comments: function(){
    if (this.oldView) this.closeOld();
    $(document.body).append(this.$el);
    this.oldView = new CommentList({el : this.$el});
  }
});
