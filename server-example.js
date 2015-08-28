#!/usr/bin/env node

var count = 0;

setInterval(function() {
    console.log(new Date() + ': Message ' + count++);
},1000);
