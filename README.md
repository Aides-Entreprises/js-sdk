# Librairie

Cette librairie Javascript permet d'interagir avec les données du service [aides-entreprises.fr](https://www.aides-entreprises.fr)


# Utilisation côté navigateur

```html
<script type="text/javascript" src="aides-entreprises-sdk.js"></script>
```
```js
<script>
var sdk = new window.aidesEntreprisesSDK();
sdk.projets().then(function(data) {
    console.log(data)
});
sdk.query()
    .profils(6)
    .projets([57, 131])
    .execute()
    .then(function(data) {
        console.log(data)                
    });
</script>
```

# Utilisation côté serveur

plus d'informations à venir

# Développement

Cette librairie est récente, il est possible de participer à son développement

## Prérequis

nodejs, npm, webpack

## Lancer la génération de la librairie

```bash
git clone https://github.com/aides-entreprises/js-sdk.git
```
```bash
cd js-sdk
```
```bash
webpack --mode=development --watch
```

