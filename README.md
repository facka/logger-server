# logger-server
Node Server that opens a socket to stream any log file.


# Install
```
npm install logger-server -g
```
# Deploy
Deploy this server in any folder where you have a log file.

# Run

Go to the folder where you have the log files and then run:

```
logger-server
```
It will open a socket in port 3000

Then go to http://facka.github.io/logger-web/ to connect to the servers. Create a panel and set host= localhost, port=3000, path='THEPATH', file='YOURFILE'


# Test it!

To test this server I created a node that logs to the standard output. To run it:
```
logger-server-example >> example.log
```

Enjoy!
