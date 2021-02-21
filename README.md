<h1 align="center">MarketplaceJ2EE_Client</h1>

> Disclaimer: This is a project related to academic work. It may be not complete. DO NOT ENTER REAL PAIEMENT CREDENTIALS!

---

Partie serveur : https://github.com/hbollon/MarketplaceJ2EE_Server

## Table of Contents

- [Presentation](#presentation)
- [Problèmes connu](#problèmes-connu)
- [Hacking](#hacking)
- [Author](#author)

## Presentation

Bienvenue sur la partie frontend de mon projet marketplace !

Ce projet a été construit avec le framework Angular.

Les fonctionnalités suivantes sont pour l'instant implémentées:

- Visualisation de tout les articles disponible dans le catalogue
- Calcul et visualisation des frais de ports avant achat
- Renseignement des informations personnelles nécessaires avant achat
- Paiement sécurisé d'un article via MangoPay avec redirection automatique


Vous pouvez retrouver une live démo hébergé sur GitHub Page [ici](https://hbollon.github.io/MarketplaceJ2EE_Client/). Attention ce projet n'est pour l'instant pas compatible avec tout les navigateurs, certains requièrent une manipulation pour whitelist l'adresse ip du VPS vers lequel nous effectuons nos requêtes (voir section ***Problèmes Connu***).

Vous pouvez retrouver des moyens de paiement sandbox ici: https://docs.mangopay.com/guide/testing-payments

## Problèmes connu

### CORS
Il subsiste malheureusement un problème assez gênant au sein de ce projet mais heureusement contournable. En effet, le serveur a été doté d'un certificat ssl auto-signé sur l'ip pour pouvoir effectuer les requêtes en https et ainsi assurer plus de sécurité pour les clients mais aussi pour être compatible avec l'hébergement du client qui lui aussi en https.

Malheureusement, le fait que ce soit un certificat auto-signé le rend incompatible avec la politique CORS de certains navigateurs comme Firefox et Google Chrome. Il Fonctionne néanmoins sur Chromium.

Pour contourner ce problème, il vous suffit de whitelister dans votre navigateurs les certificats des  adresses suivantes:

- https://51.178.42.90:8081
- https://51.178.42.90:8181

Voici la marche à suivre pour Firefox:

- Naviguez vers: ```about:preferences#privacy``` via la barre de recherche
- Descendez jusqu'à la partie **Certificats** et cliquez sur **Afficher les certificats**
- Dans l'onglet **Serveurs** cliquez sur **Ajouter une exception...**
- Entrez une des adresses, cliquez sur **Obtenir le certificat** puis sur **Confirmer l'exception de sécurité**
- Faite le pour la deuxième url

Pour Chrome: 

- Accédez à l'url https://51.178.42.90:8081
- Cliquez sur **paramètres avancés** et ensuite sur **Continuer vers https://51.178.42.90:8081**
- Faite de même pour https://51.178.42.90:8181
- Vous pouvez maintenant accêder au client ! Cette solution n'est pas obligatoirement persistante contrairement à celle de Firefox.

Pour savoir si il y a un problème de CORS sur le client accédez à la console développeur et cherchez un message d'erreur comportant le terme **CORS** ou **Content Security Policy**.

Afin de résoudre ce problème, il m'aurait fallut un certificat plus poussé supportant les adresses IP ou un nom de domaine servant de passerelle avec, lui, un certificat Let's Encrypt (ce dernier ne supporte pas les IP).

## Hacking

You must have Angular CLI installed on your machine.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Author

👤 **Hugo Bollon**

* Github: [@hbollon](https://github.com/hbollon)
* LinkedIn: [@Hugo Bollon](https://www.linkedin.com/in/hugobollon/)
* Portfolio: [hugobollon.me](https://www.hugobollon.me)

## Show your support

Give a ⭐️ if this project helped you!
