#!/bin/bash
docker stop imepoh
docker rm imepoh
docker build -t oknuj/imepoh .
docker run --name=imepoh --restart=always -p 42069:42069 -p 23301:23301/udp -d oknuj/imepoh
