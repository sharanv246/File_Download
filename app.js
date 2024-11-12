// app.js
const userIP = document.getElementById("fileUrl");
const dBtn = document.getElementById("downloadBtn");
const errMsg = document.getElementById("error-message");
dBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dBtn.innerText = "Downloading file...";
    downFn(userIP.value);
});
function downFn(url) {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!pattern.test(url)) {
        errMsg.textContent = "Wrong URL Entered";
        dBtn.innerText = "Download File";
        return;
    }
    errMsg.textContent = "";
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network Problem");
            }
            return res.blob();
        })
        .then((file) => {
            const ex = extFn(url);
            let tUrl = URL.createObjectURL(file);
            const tmp1 = document.createElement("a");
            tmp1.href = tUrl;
            tmp1.download = `downloaded_file.${ex}`;
            document.body.appendChild(tmp1);
            tmp1.click();
            dBtn.innerText = "Download File";
            URL.revokeObjectURL(tUrl);
            tmp1.remove();
        })
        .catch(() => {
            errMsg.textContent =
                "Cannot Download Restricted Content!";
            dBtn.innerText = "Download File";
        });
}
function extFn(url) {
    const match = url.match(/\.[0-9a-z]+$/i);
    return match ? match[0].slice(1) : "";
}