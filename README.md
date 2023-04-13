# Winou Project

## Introduction
* This project was developed for my thesis a year ago. it demonstrates how to build and deploy a MERN (MongoDB, Express.js, React.js, Node.js) web application using GitLab Ci, Docker stack and Nexus.

* GitLab CI is used to automate the build, test, and deployment process of the MERN stack application. Docker stack is used to orchestrate  the application, which is then deployed to OVH Cloud, a cloud hosting provider.


## Installation package inside runner

```bash 
apk --no-cache add curl jq
```

## TAG_MANAGEMENT : solution 1 

* In This solution we have created a file "File.txt" in which we added the value of the script "createtag.sh" .
* we have added APP_VERsion (Make sure that you have added all informations that you need) .
* finally we exoprt APP_VERSION in $VARIABLES_FILE and we add artifacts to this stage .


```bash 
variables:
  VARIABLES_FILE: ./variables.txt 

tag_managment:
  stage: tag_managment
   image: alpine
    rules:
     - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
       when: never
     - if: '$CI_COMMIT_REF_NAME == "master1"'
      when: always
     - when: never

  before_script:
              - apk --no-cache add curl jq bash
    - chmod +x createtag.sh
 
  script:
              - $VARIABLES_FILE == "variables.txt"
              - chmod 777 $VARIABLES_FILE  
    - ./createtag.sh > file.txt
    - APP_VERSION=$(cat file.txt) 
    - echo "The image iiiis $APP_VERSION"
    - echo "export APP_VERSION=$APP_VERSION" > $VARIABLES_FILE

  artifacts:
    when: on_success
    paths:
      - $VARIABLES_FILE
  tags:
    - node02
```


## TAG_MANAGEMENT : solution 2

* we used cache and artifacts to store a path between stages.
* before script as we said we should install curl and jq.
* after that we have created a file named "tagname".
* we have added MY_TAG (Make sure that you have added all informations that you need) .
* finally we putted this variable in tagname/MY_TAG .


```bash 
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - tagname

tag_managment:
  image: alpine:latest
  stage: tag_managment
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: never
    - if: '$CI_COMMIT_REF_NAME == "master"'
      when: always
    - when: never
  before_script:
    - apk --no-cache add curl jq
    - chmod 700 createtag.sh
    - mkdir tagname
  script:
    - MY_TAG="$(./createtag.sh)"
    - echo $MY_TAG > tagname/MY_TAG
  tags:
    - node02
```
