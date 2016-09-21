import {Model} from 'backbone';

export default Model.extend({
  urlRoot: BACKEND_URL + '/api/themes',
  defaults: {
    name: 'Theme-name',
    date: 'Date'
  }
});
