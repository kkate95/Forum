const moment = require('moment');

module.exports = function(Comment) {
  Comment.on('attached', function (){

    var d = new Date();

    Comment.create({ text: "First message", themeId: 'theme1',
          date : d.toLocaleString()});
    Comment.create({ text: "First message", themeId: 'theme2',
          date: d.toLocaleString()});
    Comment.create({ text: "First message", themeId: 'theme3',
      date : d.toLocaleString()});
    Comment.create({ text: "First message", themeId: 'theme4',
      date : d.toLocaleString()});
  });
};
