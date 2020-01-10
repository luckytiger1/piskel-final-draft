import "./landing.scss";

// eslint-disable-next-line no-undef
netlifyIdentity.on("login", () => {
  const outputText = document.querySelector(".login-text");
  const profilePic = document.querySelector(".profile-pic");
  outputText.style.display = "block";
  profilePic.style.backgroundImage = `url('${
    // eslint-disable-next-line no-undef
    netlifyIdentity.currentUser().user_metadata.avatar_url
  }')`;
  outputText.innerText = ` Welcome, ${
    // eslint-disable-next-line no-undef
    netlifyIdentity.currentUser().user_metadata.full_name
  }!`;
});

// eslint-disable-next-line no-undef
netlifyIdentity.on("logout", () => {
  const outputText = document.querySelector(".login-text");
  const profilePic = document.querySelector(".profile-pic");

  outputText.style.display = "none";
  profilePic.style.display = "none";
});
