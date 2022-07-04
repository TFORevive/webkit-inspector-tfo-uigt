WebKit inspector that works with UIGT. Bundling scripts that are meant to bundle this thing into a single js and css file rather than shipping 500+ files.

## Usage

We already bundle the devtools inspector with our game package. You can enable CoherentUIGT devtools in game with `-uigtdevtools` command line option (optionally change port with `-uigtdevtoolsport`, default 19999).

You have to use a recent WebKit browser to load devtools, for example this one: https://playwright.azureedge.net/builds/webkit/1508/webkit-win64.zip (open MiniBrowser.exe)

Using Chromium or another browser for this is a bad idea (the devtools will work, but will be very glitched).

Navigate to `http://127.0.0.1:19999` then to see a list of pages to debug.

## Building

If you want to update the bundled inspector in `dist/`, just do `npm install`, `npm install --global gulp-cli` and then `gulp`.

## About

These devtools come from Safari's WebKit project and this particular bundle appears to be modified by Coherent to support CoherentUIGT 2.x. In this repo we make a few adjustments to make it work better with CoherentUIGT 1.x, and also bundle everything from 500+ files into just 4, using some further code changes to ensure all images are bundled properly.

Changes we made:
* bundled all assets into a single JS and CSS with gulp scripts
* replaced the way svg symbols are created from an `<svg>` with `<use>` inside of it to `<img>` tag with `content:url()` style, which seems to support `data:` URIs better
* force the inspector to use backend commands script for legacy Safari 7.0, which seems to work much better with our CoherentUIGT 1.x (trying to copy 6.0 one from older devtools did not work however)
* fix typos in a few image references so that they load properly again

Overall the devtools work propely and in the interface everything besides "start element selection" feature works, however there are still ocassional console errors about minor incompatibilities, for example:
```
[Error] ReferenceError: Can't find variable: HeapAgent
	navigationItems (main.js:23874)
	_updateContentViewNavigationItems (main.js:14625:221)
	_currentContentViewDidChange (main.js:14646:297)
	dispatch (main.js:8738:149)
	dispatchEventToListeners (main.js:8740)
	showBackForwardEntryForIndex (main.js:20853)
	showContentView (main.js:20847)
	(anonymous function) (main.js:32368:118)
	(anonymous function) (main.js:32277)
	(anonymous function)
[Error] Missing handling of Timeline Event Type: ParseHTML
	_processRecord (main.js:32027:1412)
	eventRecorded (main.js:31991:267)
	eventRecorded (main.js:10165)
	dispatchEvent (main.js:9587)
	_dispatchEvent (main.js:9653:124)
	dispatch (main.js:9622)
	dispatch (main.js:9543)
	(anonymous function) (main.js:8618:106)
```
While not breaking, they could be looked into and attempted to be fixed at some point. Assuming they weren't some upstream pre-existing hidden bugs in the first place...
