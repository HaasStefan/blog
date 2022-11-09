
function subscribe() {
    fetch('./functions/subscribe').then(res => {
        if (res.ok) {
            res.json().then(data => {
                console.log(data); 
            })
        } else {
            throw new Error(res.statusText);
        }
    });

}

subscribe();