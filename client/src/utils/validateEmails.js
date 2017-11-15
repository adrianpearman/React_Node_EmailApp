//validates the presence of accepatble email characters
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (emails) => {
  const invalideEmails = emails
  // seperates each email entry by the ','
  .split(',')
  // creates a new array with the excess space also removed
  .map(email => email.trim())
  //
  .filter(email => !re.test(email)) //can be writtten also as (email => re.test(email === false))

  if (invalideEmails.length) {
    return `These emails are invalid: ${invalideEmails}`
  }
}
