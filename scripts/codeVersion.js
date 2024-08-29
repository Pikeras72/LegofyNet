var codeVersion = "0.6";

document.addEventListener("DOMContentLoaded", function() {
    var versionElement = document.getElementById("code-version");
    if (versionElement) {
        versionElement.innerText = "Version: " + codeVersion;
        versionElement.classList.add("version-color");
    }
});