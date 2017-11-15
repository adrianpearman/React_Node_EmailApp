const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //this is a built in function made available from installing node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys')
const surveyTemplate = require('../services/template/surveyTemplate')

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
      const surveys = await Survey.find({ _user: req.user.id})
        .select({ recipients: false });

      res.send(surveys);
  })

  app.get('/api/surveys/:surveyId/:choice', (req,res) => {
      res.send('Thanks for Voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body); //logs the response from sendgrip api
    //  Version 1
    // const events = _.map(req.body, (event) => {
    //   const pathname = new URL(event.url).pathname;
    //   const p = new Path('/api/surveys/:surveyId/:choice');
    //   const match = p.test(pathname);
    //   if (match) {
    //     return { email: event.email, surveyId: match.surveyId, choice: match.choice}
    //   }
    // })
    // const compactEvents = _.compact(events)
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
    // console.log(uniqueEvents);

    // Version 2 Refactor
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice}
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(( { email, surveyId, choice}) => {
        Survey.updateOne({
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true},
            lastResponded: new Date()
        }).exec() //.exec() is a function that executes the function request
      })
      .value();
      // console.log(events);
    })


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // return an email as an object to the model.
      recipients: recipients.split(',').map(email => { return {email: email.trim()}}),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // template is the email template that the user wil see
    const mailer = new Mailer (survey, surveyTemplate(survey) )

    try{
      await mailer.send();
      await survey.save();
      req.user.credits -=1;
      const user = await req.user.save();
      res.send(user);
    }catch(err){
      res.status(422).send(err);
    }
  });
};
