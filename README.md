# Win10.Rocks HTML5/JS Starter
Windows 10 starting architecture for HTML5/JS developers

[![Build Status](https://travis-ci.org/DeepElement/Win10Rocks-JS-Starter.svg?branch=master)](https://travis-ci.org/DeepElement/Win10Rocks-JS-Starter)

Features:

- CommonJS Business Layer (NodeJS friendly!)
- Visual Studio 2015 Test Runner Mocha integration
- Svelte Application Architecture (Service, Provider, Helper, Messages)
- MVVM Support (ViewBase, ViewModelBase, Commands, Events)
- Indexed Memory Storage with [LokiJS]( (supports momento with Storage Provider)
- Message-based Navigation Architecture (Data Posting, View/ViewModel Life-Cycle, BackStack)
- Bring-Your-Own-UI (WinJS 4.0 included by default)

#Setup
- Install Visual Studio 2015 RC
- Install Python 2.7.9 at https://www.python.org/downloads/release/python-279/
	- set the PYTHON env variable to local python.exe
- Install NodeJS tools at https://github.com/Microsoft/nodejstools/releases 
- (Temporary) Install Visual Studio 2010 C++ Expression (https://goo.gl/SsCI2D)
	- package `node-pgy` requires this but will be updated Q4 to reference new VS2015 deps 
- run `npm install` in the repo root
- run `npm install` in the test folder 

#Building

##Enviromental Variables
Prefix Gulp command with variable (e.g. `Version_Major=1 gulp build-win10`)

- `Version_Major`
- `Version_Minor`
- `Version_Revision`
- `Version_Build`

##Targets

- `gulp clean` 
	- deletes ./publish
- `gulp build-win10`
	- Test package deployed at ./publish/win10/*_Test
	- OneStore package at ./publish/win10/*.appxupload
- `gulp build-win8.1`
	- Test package deployed at ./publish/win8.1/*_Test
	- OneStore package at ./publish/win8.1/*.appxupload

#Known Issues

- Mocha Debugger Broken for some environments - https://github.com/Microsoft/nodejstools/issues/79
- 
