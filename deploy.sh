#!/usr/bin/env bash

git fetch
git merge origin master

npm i
npm run build
