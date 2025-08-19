function openPwGen() {
    document.getElementById('pwgen-modal').style.display = 'block';
}

function closePwGen() {
    document.getElementById('pwgen-modal').style.display = 'none';
}

function generatePassword() {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*()-_=+[]{};:,.<>/?|\\";
    let charset = lower;
    if (document.getElementById('uppercase').checked) charset += upper;
    if (document.getElementById('numbers').checked) charset += numbers;
    if (document.getElementById('special').checked) charset += special;
    let len = parseInt(document.getElementById('length').value, 10);
    if (isNaN(len) || len < 12) len = 12;
    if (len > 64) len = 64;
    if (charset.length === 0) {
        document.getElementById('result').value = "Please select at least one character set!";
        return;
    }
    let pw = "";
    for (let i = 0; i < len; i++) {
        const idx = Math.floor(Math.random() * charset.length);
        pw += charset[idx];
    }
    document.getElementById('result').value = pw;
}

function copyPassword() {
    const pwField = document.getElementById('result');
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pwField.value);
    } else {
        pwField.select();
        pwField.setSelectionRange(0, 999); // for mobile devices
        document.execCommand('copy');
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closePwGen();
});
