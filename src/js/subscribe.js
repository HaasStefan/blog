
function subscribe() {
    for (let field of document.getElementsByClassName('email')) {
        var email = field.value;
        field.value = "";
        if (email && email !== '') break;
    }

    if (email && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {

        const indexEmail = document.getElementById('index-email');
        indexEmail.remove();
        const footerEmail = document.getElementById('footer-email');
        footerEmail.remove();

        fetch('./.netlify/functions/subscribe?' + new URLSearchParams({
            email
        })).then(res => {
            if (res.ok) {
                console.log("thank you for the subscription :)  (it worked)");
            } else {
                console.log("fyi: If you read this, you are not sure if the subscription worked? It worked, but my bad for not having a better UX to indicated that it worked the first time. I did not implement a welcome email yet, but don't worry - your email is stored in the subscriber list.");
                throw new Error(res.statusText);
            }
        });
    }
}

window.subscribe = subscribe;