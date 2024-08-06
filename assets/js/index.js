const formSend = () => {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const selectSubject = document.getElementById("selectSubject").value;
  const yourMessage = document.getElementById("yourMessage").value;

  if (name === "") return alert("Please insert your name");
  if (email === "") return alert("Please insert your email");
  if (phoneNumber === "") return alert("Please insert your phone number");
  if (selectSubject === "") return alert("Please insert your subject");
  if (yourMessage === "") return alert("Please insert your message");

  const myEmail = "geko477@gmail.com";
  const subject = "introduction";
  const a = document.createElement("a");
  a.href = `mailto:${myEmail}?subject=${subject}&body=${yourMessage}`;
  a.click();
};
