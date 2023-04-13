echo "$0: start at $(date +"%y-%m-%d %Hh%M")"

VERSION=STAGING
if [ -z $VERSION ]; then
  echo "Please Add version X.Y.Z"
  exit 1
fi

./build_staging.sh $VERSION && ./deploy_staging.sh $VERSION

echo "$0: end at $(date +"%y-%m-%d %Hh%M")"
