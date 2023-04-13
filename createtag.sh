#!/bin/sh

# SET NEW TAG NAME
RES=$(curl -s --header "PRIVATE-TOKEN: $ETCL_TOKEN" "https://gitlab.infraplus.net/api/v4/projects/$CI_PROJECT_ID/repository/tags/" | jq '.[].release.tag_name' | sed 's/"//g')
if [ -z "$RES" ]; then
    export my_tag_name=0.0.1
else
    export my_tag_name=$(echo $RES | awk '{print $1}' | awk -F. '{OFS="."; $NF+=1; print $0}')
fi

# CHECK IF NEW TAG ALREADY EXISTS
STATUS_NEWTAG=$(curl -s --header "PRIVATE-TOKEN: $ETCL_TOKEN" "https://gitlab.infraplus.net/api/v4/projects/$CI_PROJECT_ID/repository/tags/$my_tag_name" | grep $my_tag_name)
if [ ! -z $STATUS_NEWTAG ]; then
 echo "ERROR: tag already exists, check changelog file" && exit 1; 
fi

# CREATE NEW TAG
STATUS_CURL=$(curl -s -X POST --header "PRIVATE-TOKEN: $ETCL_TOKEN" "https://gitlab.infraplus.net/api/v4/projects/$CI_PROJECT_ID/repository/tags?tag_name=$my_tag_name&ref=master" --data-urlencode "message=Tag created from pipeline ID $CI_PIPELINE_ID by user $GITLAB_USER_NAME")
echo "$STATUS_CURL" | grep -q "already exists"
[ $? -eq 0 ] && echo "TAG: $my_tag_name already exists"  && exit 1

export my_tag_release_notes="the new tag successfully created"

STATUS_CURL=$(curl -s -X POST -G --header "PRIVATE-TOKEN: $ETCL_TOKEN" "https://gitlab.infraplus.net/api/v4/projects/$CI_PROJECT_ID/repository/tags/$my_tag_name/release" --data-urlencode "description=$my_tag_release_notes")
echo "$STATUS_CURL" | grep -q "already exists"
[ $? -eq 0 ] && echo "$my_tag_release_notes already exists"  && exit 2

echo $my_tag_name
exit 0


