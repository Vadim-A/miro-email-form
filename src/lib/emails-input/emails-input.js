(function () {
  const NEW_LINE_CHAR = "\n";
  const NEW_LINE_KEY = 13;
  const COMMA_CHAR = ",";
  const COMMA_KEY = 188;

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function getEmails(context) {
    const elements = context.children[0].getElementsByClassName(
      "ei-email-wrapper"
    );

    const result = [];
    for (let i = 0; i < elements.length; i++) {
      result.push(elements[i].innerText);
    }
    return result;
  }

  function addEmail(email, context) {
    container = context.children[0];
    const emailWrapper = document.createElement("div");

    emailWrapper.className =
      "ei-email-wrapper " +
      (validateEmail(email)
        ? "ei-email-wrapper_valid"
        : "ei-email-wrapper_invalid");

    const emailContainer = document.createElement("span");
    emailContainer.textContent = email;

    const button = document.createElement("button");
    button.className = "ei-button ei-button-remove";
    button.addEventListener("click", function (event) {
      event.target.parentElement.parentElement.removeChild(
        event.target.parentElement
      );
      context.emailsChange && context.emailsChange(context.getEmails());
    });

    emailWrapper.appendChild(emailContainer);
    emailWrapper.appendChild(button);
    container.insertBefore(
      emailWrapper,
      container.getElementsByTagName("input")[0]
    );
  }

  function clearEmails(context) {
    container = context.children[0];
    const elements = container.getElementsByClassName("ei-email-wrapper");
    for (let i = 0; i < elements.length; i++) {
      container.removeChild(elements[i]);
    }
  }

  HTMLElement.prototype.emailsInput = function (args) {
    const that = this;
    const emails = args.emails;
    const emailsChange = args.emailsChange;

    if (this.tagName !== "DIV") {
      throw "emailsInput can be apply only to DIV element!";
    }

    if (emailsChange && typeof emailsChange !== "function") {
      throw "emailsChange must be a function!";
    }

    this.emailsChange = emailsChange;

    this.getEmails = function () {
      return getEmails(that);
    };

    this.setEmails = function (emails) {
      clearEmails(that);
      emails.forEach(function (email) {
        addEmail(email, that);
      });
      that.emailsChange && that.emailsChange(that.getEmails());
    };

    this.addEmail = function (email) {
      addEmail(email, that);
      that.emailsChange && that.emailsChange(that.getEmails());
    };

    this.innerText = "";
    this.style.display = "flex";
    this.style.flex = "auto";

    const container = document.createElement("div");
    container.className = "ei-email-editor-container";

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("placeholder", "add more people ...");
    emailInput.className = "ei-input";

    emailInput.addEventListener("paste", function (event) {
      const text = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      const emails = [];

      const lines = text.split(NEW_LINE_CHAR);
      lines.forEach(function (line) {
        const blocks = line.split(COMMA_CHAR);
        blocks.forEach(function (block) {
          email = block.trim();
          if (Boolean(email)) {
            emails.push(email);
          }
        });
      });

      if (emails.length) {
        emails.forEach(function (email) {
          addEmail(email, that);
        });
        that.emailsChange && that.emailsChange(that.getEmails());
      }
      event.preventDefault();
    });

    container.addEventListener("focusout", function (event) {
      const value = event.target.value;
      if (Boolean(value)) {
        addEmail(value.trim(), that);
        that.emailsChange && that.emailsChange(that.getEmails());
      }
      event.target.value = "";
      event.preventDefault();
    });

    emailInput.addEventListener("keyup", function (event) {
      let email = "";
      switch (event.keyCode) {
        case NEW_LINE_KEY:
          email = event.target.value.trim();
          break;
        case COMMA_KEY:
          email = event.target.value.slice(0, -1).trim();
        default:
          break;
      }
      if (Boolean(email)) {
        addEmail(email, that);
        that.emailsChange && that.emailsChange(that.getEmails());
        event.target.value = "";
      }
    });

    container.appendChild(emailInput);
    this.appendChild(container);

    // note: при клике на ei-email-editor-container, но вне input срабатывает focusout и формируется email. удобная фича :)
    this.addEventListener("click", function (event) {
      emailInput.focus();
    });

    emails.forEach(function (email) {
      addEmail(email, that);
    });

    return this;
  };
})();
