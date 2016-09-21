import {Model} from 'backbone';

export default Model.extend({
  urlRoot: BACKEND_URL + '/api/sections',
  defaults: {
      name: 'Section',
      date: 'Created-date'
  }
});
