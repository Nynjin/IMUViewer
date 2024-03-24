# Ansible-project

<div align="center">
  <a href="https://github.com/Nynjin/IMUViewer/releases/latest"><img alt="Latest Release" src="https://img.shields.io/github/v/release/Nynjin/IMUViewer?label=Latest%20Release&logo=github"></a>
  <a href="https://github.com/Nynjin/IMUViewer/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/Nynjin/IMUViewer"></a>
  <a href="https://github.com/Nynjin/IMUViewer/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/Nynjin/IMUViewer"></a>
</div>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,threejs,docker" />
  </a>
</p>

Ce projet Git permet de visualiser les déplacements dans l'espace d'un tracker connecté en Socket.IO à une application NextJS.

L'architecture est automatisée avec l'implémentation de scripts permettant d'exécuter l'intégralité du processus à l'aide d'une seule commande.

## Getting started

1. Créer un fichier ".env" en suivant l'exemple ".env.example".

2. Accorder les permissions au script principal à l'aide de la commande "chmod u+x run.sh".

3. Lancer le script à l'aide de la commande

   ```bash
   ./run.sh [DEV|PROD] [dev|build|start]
   ```

4. Ouvrir la page web du serveur `IP:PORT`

5. Connecter un tracker en Socket.IO à `ws://IP:PORT`

6. Envoyer des données à l'évènement "updateIMU" sous le format :

```bash
{
  "position": {
      "x": pX,
      "y": pY,
      "z": pZ
  },
  "rotation": {
      "x": rX,
      "y": rY,
      "z": rZ
  }
}
```

## Authors

- Moncef Hassani
