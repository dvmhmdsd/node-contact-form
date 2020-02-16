const http = require("http");
const fs = require("fs");
const path = require("path");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourEmail@gmail.com",
    pass: "passwordOfYourAccount"
  }
});

// Cache the static files
let indexFile = path.resolve(__dirname, "public/index.html");
let jsFile = path.resolve(__dirname, "public/main.js");

// Create the server
let server = http.createServer((req, res) => {
  // send the html file
  if (req.url == "/") {
    // set the header
    res.setHeader("Content-Type", "text/html");
    // send the html file
    fs.createReadStream(indexFile).pipe(res);
  }

  if (path.extname(req.url) == ".js") {
    // Send the js file
    fs.createReadStream(jsFile).pipe(res);
  }

  // Get the contact form data
  if (req.method == "POST") {
    // 'data' is a buffer
    req.on("data", data => {
      // Convert buffer into object
      let bodyObject = JSON.parse(data.toString());

      let mailOptions = {
        from: "yourEmail@gmail.com",
        to: "yourEmail@gmail.com",
        subject: `Message from ${bodyObject.name}`,
        text: `
            ${bodyObject.message}
            from: ${bodyObject.email}
        `
      };

      // Send to email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);

        console.log(`Email Sent`);
      });
    });
  }
});

// Listen to the server
// You can specify any port u like
server.listen(8000, () => {
  console.log("server is listening on port 8000");
});
