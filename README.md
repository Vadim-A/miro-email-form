# Emails-Input

## About Emails-Input

Emails-Input is a text editor, that observe user inputs in real time and transform text into email blocks. Email blocks are stylized for correct and incorrect input.

## Live Demo

You can see library in work here: https://vadim-a.github.io/miro-email-form/src/.

## Requirements

Emails-Input use Open Sans fonts, that you must to include into your project for correct work.

## Installation

For install library you need to download [emails-input folder from repository](https://github.com/Vadim-A/miro-email-form/tree/master/src/lib) and copy in your project. Then add JavaScript and CSS Files to your HTML document:

```HTML
  ...
  <head>
    <link href="emails-input/emails-input.css" rel="stylesheet" />
    <script src="emails-input/emails-input.js"></script>
  </head>
  ...
```

## Usage

Creating Emails-Input object:

```HTML
  ...
  <div id="emails-input"></div>
  ...
```

```javascript
...
document.addEventListener("DOMContentLoaded", function () {
  const emailsInput1 = document.getElementById("emails-input").emailsInput({
    emails: [
      "john@miro.com",
      "invalid.email",
      "mike@miro.com",
      "alexander@miro.com",
    ],
    emailsChange: function (event) {
      console.log("emails: " + event.join(", "));
    },
  });
});
...
```

### Arguments

- `emails` - `Array` initial collection of emails
- `emailsChange` - `Function` called when emails collection is changed

### API

- `getEmails` - `function(): Array` - Return array of emails
- `setEmails` - `function(Array emails)` - Set a new collection of emails. Previous emails will be removed.
- `addEmail` - `function(String email)` - Add email to current collection.
