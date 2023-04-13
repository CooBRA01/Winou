VERSION=STAGING
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z" 
  exit 1
fi

docker build -t nexus01.node02.infraplus.net:8082/react-app:$VERSION ./client
docker push nexus01.node02.infraplus.net:8082/react-app:$VERSION

docker build -t nexus01.node02.infraplus.net:8082/api-server:$VERSION ./server
docker push nexus01.node02.infraplus.net:8082/api-server:$VERSION

ssh -p 22 -o StrictHostKeyChecking=no -i id_rsa opsuser@cargo02.node02.infraplus.net "docker pull nexus01.node02.infraplus.net:8082/react-app:$VERSION ; docker pull nexus01.node02.infraplus.net:8082/api-server:$VERSION "
