
const elem = document.getElementById('copy-clipboard');
elem.addEventListener('click', () => copyClipBoard())

function copyClipBoard() {
    const elem = document.getElementById('code-content');
    const code = elem.innerText;

    navigator.clipboard.writeText(code);
}