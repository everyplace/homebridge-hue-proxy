#!/bin/sh
docker build . -t everyplace/homebridge-hue-proxy-alpine --network host;
docker save everyplace/homebridge-hue-proxy-alpine > hue-proxy.tar;
