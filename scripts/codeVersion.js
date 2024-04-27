var codeVersion = "0.3";

document.addEventListener("DOMContentLoaded", function() {
    var versionElement = document.getElementById("code-version");
    if (versionElement) {
        versionElement.innerText = "Version: " + codeVersion;
    }
});