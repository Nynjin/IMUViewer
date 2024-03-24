#! bin/sh

#? This file runs automatically with the docker
npm install

case "$1" in
    "dev")
        npm run dev -- -p $2
        ;;
    "build")
        npm run build
        ;;
    "start")
        npm run start -- -p $2
        ;;
    *)
        echo "Usage: $0 {dev|build|start}"
        exit 1
        ;;
esac

exit 0