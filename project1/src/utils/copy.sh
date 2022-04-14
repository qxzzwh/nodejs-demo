#!/bin/sh
cd /home/qxz/nodejs-demo/project1/log
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log