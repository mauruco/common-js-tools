# common-js-tools
Common Tools Library

## Class Log
How to use:

```javascript
/**
You can set NODE_ENV to "development" and the log will always print
or create a common-js-tools.json file in the project root and set it to:

common-js-tools.json
    {
        "deploy": "development",
        "stackSize": 100
    }

If "development" is not enabled, Log is automatically at "production" level.
*/

const { Log } = require('common-js-tools');
const log = new Log('ScriptName or ControllerName');
log.console('This will always be displayed.');
log.trace('This goes to the stack and will be displayed if an error occurs.');
log.error('This will always be displayed after printing the entire stack.');
// Sequelize use
{ logging: Log.sequelize }
```

## Function round
How to use:

```javascript
const { round } = require('common-js-tools');
// Prevention
let a = 600.90 * 3;
console.log(a);         // result 1802.6999999999998
console.log(round(a))   // whit round 1802.7
a = 200.30 * 3;
console.log(a);         // result 600.9000000000001
console.log(round(a))   // whit round = 600.9
a = 261.65;
console.log(a);         // result 261.65
console.log(round(a))   // whit round = 26.65
a = 261.61 * 3;
console.log(a);         // result 784.83
console.log(round(a))   // whit round = 784.83
```