const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url"); //this is a built in function made available from installing node
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const { sendGridKey } = require("../config/keys");

const Survey = mongoose.model("surveys");
const surveyTemplate = require("../services/template/surveyTemplate");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for Voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // template is the email template that the user wil see
    sgMail.setApiKey(sendGridKey);

    let list = survey.recipients.map(e => {
      return e.email;
    });

    const msg = {
      to: list,
      from: "test@example.com",
      subject: subject,
      text: title,
      html: surveyTemplate(survey)
    };

    try {
      sgMail.send(msg);
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
