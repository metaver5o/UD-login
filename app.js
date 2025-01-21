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
        const user = await uauth.user();
        const username = user?.sub || "Guest"; // Default to "Guest" if username not found
        const userNameField = user?.name || username;

        // Update message based on whether the user has a .u domain
        document.getElementById("message").textContent = `Welcome ${userNameField}, this is a list of your .u domains:`;

        // Fetch domains from Unstoppable Domains API
        const walletAddress = '0x992aeEfbAa8c5612d0afaEa8f2fC066154cb7BFb'; // Example, should be dynamic
        const apiUrl = `https://api.unstoppabledomains.com/profile/user/${walletAddress}/domains?take=50`;

        // Make API request
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter for .u domains
        const uDomains = data.data
            .filter((domainObj) => domainObj.domain.endsWith(".u"))
            .map((domainObj) => domainObj.domain);

        // Log the filtered domains to check
        console.log("User's .u Domains: ", uDomains);

        // Display the domains in a list
        const domainsList = document.getElementById("domains-list");
        if (uDomains.length > 0) {
            domainsList.innerHTML = uDomains.map((domain) => `<li>${domain}</li>`).join("");
        } else {
            domainsList.innerHTML = "<li>No .u domains found</li>";
        }
    } catch (error) {
        console.error("Login Error: ", error);
    }
};

window.logout = async () => {
    try {
        await uauth.logout();
        console.log("Logged out");
    } catch (error) {
        console.error("Logout Error: ", error);
    }
};