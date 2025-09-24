function handleSubmit(event) {
  event.preventDefault();
  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const message = event.target.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }

  alert(`Thank you, ${name}! Your message has been sent.`);
  event.target.reset();
  return false;
}
