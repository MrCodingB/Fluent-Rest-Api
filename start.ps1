Push-Location $PSScriptRoot

.\node_modules\.bin\tsc.cmd -p .\tsconfig.json

node . --trace-warnings

Pop-Location
