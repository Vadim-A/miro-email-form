require("../emails-input");

const testEmails = [
  "john@miro.com",
  "invalid.email",
  "mike@miro.com",
  "alexander@miro.com",
];

test("check getEmails() after init", () => {
  const div = document.createElement("div");
  div.emailsInput({
    emails: testEmails,
  });

  expect(div.getEmails().length).toEqual(4);
});

test("check emailsChange called", () => {
  const omEmailsChangeMock = jest.fn().mockImplementationOnce((cb) => {});

  const div = document.createElement("div");
  div.emailsInput({
    emails: testEmails,
    emailsChange: omEmailsChangeMock,
  });

  div.addEmail("test@mail.com");
  expect(omEmailsChangeMock).toBeCalled();
});

test("check addEmail()", () => {
  const div = document.createElement("div");
  div.emailsInput({
    emails: testEmails,
  });

  expect(div.getEmails().length).toEqual(4);
  div.addEmail("test@mail.com");
  expect(div.getEmails().length).toEqual(5);
});

test("check setEmails()", () => {
  const div = document.createElement("div");
  div.emailsInput({
    emails: ["john@miro.com"],
  });

  expect(div.getEmails().length).toEqual(1);
  div.setEmails(testEmails);
  expect(div.getEmails().length).toEqual(4);
});
