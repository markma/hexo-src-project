#!/bin/sh
# author: joway
# 如果参数个数不等于0
if test $# -gt 0
then
  if test $1 = '-img'
  then
    cd ./source/photos/
    node photo-tool.js
    cd ../../
    echo 'Upload complete'
  else
    echo 'Parameter error'
  fi
else
  echo 'No image needs upload'
fi
hexo clean
hexo g && gulp
hexo deploy
git add .
git commit -m 'update backup'
git push origin master
