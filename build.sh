VERSION=$1
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z" 
  exit 1
fi

docker build -t nexus01.node02.infraplus.net:8082/front:$VERSION -f Dockerfile_front
docker push nexus01.node02.infraplus.net:8082/front:$VERSION

docker build -t nexus01.node02.infraplus.net:8082/back:$VERSION -f Dockerfile_back
docker push nexus01.node02.infraplus.net:8082/back:$VERSION


ssh -p 22 -i id_rsa -o StrictHostKeyChecking=no opsuser@cargo02.node02.infraplus.net "docker pull nexus01.node02.infraplus.net:8082/front:$VERSION ; docker pull nexus01.node02.infraplus.net:8082/back:$VERSION "
