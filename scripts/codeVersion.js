var codeVersion = "1.0";

document.addEventListener("DOMContentLoaded", function() {
    var versionElement = document.getElementById("code-version");
    if (versionElement) {
        versionElement.innerText = "Version: " + codeVersion;
        versionElement.classList.add("version-color");
    }
});