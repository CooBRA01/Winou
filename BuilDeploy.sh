echo "$0: start at $(date +"%y-%m-%d %Hh%M")"

VERSION=$1
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z"
  exit 1
fi

./build.sh $VERSION && ./deploy.sh $VERSION

echo "$0: end at $(date +"%y-%m-%d %Hh%M")"
