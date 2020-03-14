#!/bin/bash

DIR=$(pwd)

rm -rf "$DIR/dist"
mkdir -p "$DIR/dist/public/"
tsc

yarn cleancss -o "$DIR/dist/public/main.css" "$DIR/src/main.css"
