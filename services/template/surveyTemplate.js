const keys = require('../../config/keys')

// this will create the template that user will see in the email
module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>I'd like to get your input!</h3>
          <p>Can you please answer the following questions? </p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `
}
