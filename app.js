import UAuth from "@uauth/js";

const uauth = new UAuth({
  clientID: "$CLIENT_ID",
  redirectUri: "http://localhost:5001",
  scope: "openid wallet messaging:notifications:optional",
});

window.login = async () => {
  try {
    // Perform login with popup
    const authorization = await uauth.loginWithPopup();
    console.log(authorization);

    // Get user information
    uauth.user()
      .then((user) => {
        // User information is available
        const username = user?.sub || "Guest"; // Default to "Guest" if username not found
        const userNameField = user?.name || username;

        // Check if user has a .u domain
        const domain = username.split('@')[1];
        const isDomainU = domain && domain.endsWith(".u");

        // Update message based on whether the user has a .u domain
        if (isDomainU) {
          document.getElementById("message").textContent = `Welcome ${userNameField}, you have a .u domain!`;
        } else {
          document.getElementById("message").textContent = `Welcome ${userNameField}, you do not have a .u domain.`;
        }
      })
      .catch((err) => {
        console.error("Error fetching user information:", err);
      });

  } catch (error) {
    console.error("Login Error: ", error);
  }
};

window.logout = async () => {
  try {
    await uauth.logout();
    console.log("Logged out with Unstoppable");

    // Reset message after logout
    document.getElementById("message").textContent = '';
  } catch (error) {
    console.error("Logout Error: ", error);
  }
};