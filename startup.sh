#! /bin/bash

cd './ui'

echo "INSTALLING DEPENDENCIES FROM package.json"
yarn install

echo "COMPLETE"

echo "STARTING APPLICATION "
yarn start