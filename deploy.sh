#!/usr/bin/env bash

git fetch
git merge origin master

npm i --only=prod
npm run build
