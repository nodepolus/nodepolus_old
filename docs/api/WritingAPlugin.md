# Writing a plugin
## Setup
Clone the latest version of NodePolus
```shell
$ git clone https://github.com/NodePolus/NodePolus
```
Install dependencies
```shell
$ npm install
```
## Writing the plugin
Create a new typescript file for your plugin\
Add the following code
```typescript
/* Imports are relative to the plugins folder in the bin directory of the project */
import { BasePlugin } from "../../lib/util/BasePlugin";
import { Plugin } from "../../lib/util/Plugin";

//Extending BasePlugin is required implementing Plugin is optional but recommended
export default class ExamplePlugin extends BasePlugin implements Plugin {
    public name = "ExamplePLugin"; //Name of your plugin
    public author = "YourName"; //Name of the author of the plugin
    public version = "1.0.0"; //Version of the plugin

    //Required, called when the plugin is enabled
    onEnable() {

    }

    //Required, called when the plugin is disabled (not yet implemented)
    onDisable() {

    }
}
```
You now have a working plugin, but it does nothing\
Time to add event listeners

Inside your plugin class add the following code
```typescript
import { JoinRoomEvent } from "../../lib/events"; // Once again, imports are relative to the bin directory
// Event listeners can have any name you want
onRoomCreated(e: JoinRoomEvent /* Use type anotation to get autocompletion for the event */) {
    console.log('Room created with code ' + e.room.code)
}
```
Now all we need to do is register this event listener\
In your onEnable() method add the following code
```typescript
onEnable() {
    // _eventManager is available in all plugins
    _eventManager.registerEvent('roomCreated', this.onRoomCreated)
}
```
You now have a fully working plugin\
All you need to do is to load it to the server

## Loading a plugin
see [Loading a plugin](LoadingAPlugin.md)