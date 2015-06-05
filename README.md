# Win10.Rocks HTML5/JS Starter
Windows 10 starting architecture for HTML5/JS developers

[![Build Status](https://travis-ci.org/DeepElement/Win10Rocks-JS-Starter.svg?branch=master)](https://travis-ci.org/DeepElement/Win10Rocks-JS-Starter)

Features:

- CommonJS Business Layer (NodeJS friendly!)
- Visual Studio 2015 Test Runner Mocha integration
- Svelte Application Architecture (Service, Provider, Helper pattern)
- Lean-and-Mean Inversion-of-Control API
- Windows 10 Compatible Navigation

#Setup
- Install Visual Studio 2015 RC
- Install Python 2.7.9 at https://www.python.org/downloads/release/python-279/
	- set the PYTHON env variable to local python.exe
- Install NodeJS tools at https://github.com/Microsoft/nodejstools/releases 
- (Temporary) Install Visual Studio 2010 C++ Expression (https://goo.gl/SsCI2D)
	- package `node-pgy` requires this but will be updated Q4 to reference new VS2015 deps 
- run `npm install` in the repo root
- run `npm install` in the test folder 

#Development Guide

## Tests
Using http://sinonjs.org/ and http://mochajs.org/


#Known Issues

- Mocha Debugger Broken for some environments - https://github.com/Microsoft/nodejstools/issues/79

