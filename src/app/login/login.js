async function setLogin() {
  const outputText = document.querySelector(".login-text");
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token e08102e5d8e0a19a590ad44b2857b601c336fc8f"
    }
  });
  const data = await response.json();
  const { login } = data;
  outputText.style.display = "block";
  // if (data) {
  outputText.innerText = ` Welcome, ${login}!`;
  // } else {
  //   // eslint-disable-next-line no-undef
  //   outputText.innerText = ` Welcome, ${netlifyIdentity.currentUser()}!`;
  // }
}

export default { setLogin };
