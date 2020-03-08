#!/bin/bash

DIR=$(pwd)

rm -rf ./bash
tsc

NODE_PATH="$DIR/dist" node dist/main.js
