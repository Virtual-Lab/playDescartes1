# playDescartes1

Instructions
--------------

This folder contains a full **rhizome** application.

It shows simple message sending / receiving with different clients for **rhizome** :

- a static webpage (communication over websockets)
- SuperCollider (communication over OSC)
- Pure Data (communication over OSC)

To start the server, open your terminal, go to the example folder and run `rhizome config.js`. This should start the server and print an extract of the configuration.

To open the web page (websocket client), just go to [http://localhost:8000/index.html](http://localhost:8000/index.html).

All the code for the web page is in [pages/index.html](pages/index.html) 