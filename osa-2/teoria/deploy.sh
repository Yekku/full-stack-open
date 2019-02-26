#!/bin/sh
npm run build
rm -rf ../../../../full-stack_osa-3_teoria/build
cp -r build ../../../../full-stack_osa-3_teoria