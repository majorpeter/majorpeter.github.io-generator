#!/usr/bin/env bash

EXPORT_DIR='export'
PUBLISH_GIT_PROJ='git@github.com:majorpeter/majorpeter.github.io.git'
PUBLISH_DIR='majorpeter.github.io'

make all

if [ ! $? ]; then
    echo 'Make finished with error, stopping.'
    exit 1
fi

echo 'Shall I open the exported index.html? [y/n]'
read IN
case "$IN" in
y)
    ;&
Y)
    xdg-open $EXPORT_DIR'/index.html'
    ;;
*)
    ;;
esac

if [ -d $PUBLISH_DIR ]; then
    echo 'Removing publish git project'
    rm -Rf $PUBLISH_DIR
fi

git clone $PUBLISH_GIT_PROJ $PUBLISH_DIR --depth 1 --no-checkout
if [ ! $? ]; then
    echo 'Echo git clone failed, stopping.'
    exit 2
fi

cp $EXPORT_DIR/* $PUBLISH_DIR -R
cd $PUBLISH_DIR
git add -A
git commit -m "automatic export"

echo 'Shall I push to remote? [y/n]'
read IN
case "$IN" in
y)
    ;&
Y)
    git push
    ;;
esac

exit 0
