const { rmSync } = require('fs');
const { join } = require('path');

rmSync(join(__dirname, 'lib'), { force: true, recursive: true });
