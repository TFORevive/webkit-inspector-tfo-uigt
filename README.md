WebKit inspector that works with UIGT. Bundling scripts that are meant to bundle this thing into a single js and css file rather than shipping 500+ files.

## Usage

We already bundle the devtools inspector with our game package. You can enable CoherentUIGT devtools in game with `-uigtdevtools` command line option (optionally change port with `-uigtdevtoolsport`, default 19999).

You have to use a recent WebKit browser to load devtools, for example this one: https://playwright.azureedge.net/builds/webkit/1508/webkit-win64.zip

Using Chromium or another browser for this is a bad idea (the devtools will work, but will be very glitched).

Navigate to `http://127.0.0.1:19999` then to see a list of pages to debug.

## Building

If you want to update the bundled inspector in `dist/`, just do `npm install`, `npm install --global gulp-cli` and then `gulp`.
