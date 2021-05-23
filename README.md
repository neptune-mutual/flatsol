# Flatsol

This is a zero-dependency and lightweight Solidity flattener. This tool combines any given Solidity file's dependency and prints out the value in the shell.

## Installation

```
npm install -g flatsol
```

## Usage

Compatible with truffle-flattener

Just intall it with npm in your truffle project and run 

```
flatsol ./contracts/Token.sol > ./contracts/.Token.flat.sol
```

## Limitations

Aliased imports (eg: import {symbol1 as alias, symbol2} from "filename";) are not supported by flatsol.

