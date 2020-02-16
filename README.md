# Node.js Contact Form

A simple app with `Node.js` and `nodemailer`.

## Packages used

1. **Nodemailer**: [Docs](https://www.w3schools.com/nodejs/nodejs_email.asp)

## Installation

1. Clone this repo `git clone https://github.com/dvmhmdsd/node-contact-form.git` or using `ssh`.

2. Change directory into the repo `cd node-contact-form`.

3. Install dependencies `npm i` or using yarn `yarn`.

## Try the app

1. Update `/index.js` file with your gmail email and password:

```js
auth: {
  user: "yourEmail@gmail.com",
  pass: "passwordOfYourAccount"
}
```

and

```js
let mailOptions = {
  from: "yourEmail@gmail.com",
  to: "yourEmail@gmail.com",
  subject: `Message from ${bodyObject.name}`,
  text: `
    ${bodyObject.message}
    from: ${bodyObject.email}
`
};
```

2. Run the app `node index.js`.
