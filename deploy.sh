VERSION=$1
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z"
  exit 1
fi

docker -H cargo02.node02.infraplus.net:2375 service rm STACK

docker -H cargo02.node02.infraplus.net:2375 service create --name svc_asc_cgt_fr --replicas 1 -p 8080:80 --mount type=bind,src=/var/opt/log/site1,dst=/var/log/apache2/ --with-registry-auth=true nexus01.node02.infraplus.net:8082/asc_cgt_fr:$VERSION
