const mongoose = require('mongoose');
// const Schema = mongoose.Schema; is un destructured version of the code below
const { Schema } = mongoose;

// the Schema object describes what each individual record will look like
const userSchema = new Schema({
  googleID: String
});

// adds a new collection called 'users' with the information from userSchema
mongoose.model('users', userSchema);
