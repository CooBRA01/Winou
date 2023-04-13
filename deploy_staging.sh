VERSION=STAGING
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z"
  exit 1
fi

docker -H cargo02.node02.infraplus.net:2375 service rm mern-stack 

docker -H cargo02.node02.infraplus.net:2375 stack deploy -c docker-compose.yml --with-registry-auth=true mern-stack  
