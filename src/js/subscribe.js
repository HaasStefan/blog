
function subscribe() {
    for (let field of document.getElementsByClassName('email')) {
        var email = field.value;

        if (email && email !== '') break;
    }

    if (email && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        fetch('./.netlify/functions/subscribe?' + new URLSearchParams({
            email
        })).then(res => {
            if (res.ok) {
                console.log("thank you :)");
            } else {
                throw new Error(res.statusText);
            }
        });
    }
}

window.subscribe = subscribe;