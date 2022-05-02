# homebridge-hue-proxy
A rough project for more programmatically interfacing with a Phillips Hue box, potentially from Homekit

# Getting started
Go through Hue's setup to create an authorized user on your device:
[getting started with hue](https://developers.meethue.com/develop/get-started-2/)

Create an .env file that matches this schema:
```
hue_address="<hue hub ip address>" 
PORT=<port to run the node app on>
hue_key="<key generated from the previous step for creating an authorized user>"
```

