let modalLoaded = false;

function openPwGen() {
    if (!modalLoaded) {
        // Show loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'pwgen-loading';
        loadingDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border:2px solid #000;padding:20px;z-index:10000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;';
        loadingDiv.innerHTML = 'Loading password generator...';
        document.body.appendChild(loadingDiv);
        
        // Fetch and load the modal
        fetch('password-modal.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                modalLoaded = true;
                document.body.removeChild(loadingDiv);
                document.getElementById('pwgen-modal').style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading password generator:', error);
                document.body.removeChild(loadingDiv);
                alert('Failed to load password generator. Please try again.');
            });
    } else {
        document.getElementById('pwgen-modal').style.display = 'block';
    }
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
