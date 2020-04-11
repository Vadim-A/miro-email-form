(function () {
  const NEW_LINE_CHAR = "\n";
  const NEW_LINE_CODE = "Enter";
  const COMMA_CHAR = ",";
  const COMMA_CODE = "Comma";

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function addEmail(email, container) {
    email = email.trim();
    if (!Boolean(email)) {
      return;
    }
    const emailWrapper = document.createElement("div");
    emailWrapper.classList.add(
      "ei-email-wrapper",
      validateEmail(email)
        ? "ei-email-wrapper_valid"
        : "ei-email-wrapper_invalid"
    );

    const emailContainer = document.createElement("span");
    emailContainer.textContent = email;
    const button = document.createElement("button");
    button.classList.add("ei-button", "ei-button-remove");

    emailWrapper.append(emailContainer);
    emailWrapper.append(button);
    container.insertBefore(
      emailWrapper,
      container.getElementsByTagName("input")[0]
    );
  }

  HTMLElement.prototype.emailsInput = function ({ emails } = {}) {
    if (this.tagName !== "DIV") {
      throw "emailsInput can be apply only to div element";
    }

    this.innerText = "";
    this.style.display = "flex";

    const container = document.createElement("div");
    container.classList.add("ei-email-editor-container");

    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("placeholder", "add more people ...");
    emailInput.classList.add("ei-input");

    emailInput.addEventListener("paste", (event) => {
      const text = event.clipboardData.getData("text");
      const lines = text.split(NEW_LINE_CHAR);
      const emails = lines.reduce(
        (acc, curr) => [...acc, ...curr.split(COMMA_CHAR)],
        []
      );
      emails.forEach((email) => {
        addEmail(email, container);
      });
      event.preventDefault();
    });

    emailInput.addEventListener("blur", (event) => {
      addEmail(event.target.value, container);
      event.target.value = "";
      event.preventDefault();
    });

    emailInput.onkeyup = (event) => {
      const value = event.target.value;
      switch (event.code) {
        case NEW_LINE_CODE:
          addEmail(value, container);
          event.target.value = "";
          break;
        case COMMA_CODE:
          addEmail(value.slice(0, -1), container);
          event.target.value = "";
        default:
          break;
      }
    };

    container.append(emailInput);
    this.append(container);

    emails.forEach((email) => {
      addEmail(email, container);
    });

    this.getEmails = () =>
      [...container.getElementsByClassName("ei-email-wrapper")].map(
        (el) => el.innerText
      );

    return this;
  };
})();
