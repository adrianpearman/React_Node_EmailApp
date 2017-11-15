const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // to highlight that the type is an array, the type variable is placed inside an array
  recipients: [RecipientSchema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  // how to reference to a specific user
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  // will dictate whether a survey is active based on the sent and received date
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('surveys', surveySchema)
