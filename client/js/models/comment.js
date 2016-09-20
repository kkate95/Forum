import {Model} from 'backbone';

export default Model.extend ({
  urlRoot: BACKEND_URL +  '/api/comments',
  defaults: {
      text: 'Text',
      date: 'Date'
  }
})

