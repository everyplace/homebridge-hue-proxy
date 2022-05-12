#!/bin/bash
docker build . -t everyplace/homebridge-hue-proxy-alpine;
docker save everyplace/homebridge-hue-proxy-alpine > hue-proxy.tar;
