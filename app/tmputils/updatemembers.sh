#!/bin/bash

while true
do
    node addmembers.js
    # 每小时更新一次参赛选手--
    sleep 3600
done