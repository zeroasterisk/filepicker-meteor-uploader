# Filepicker Meteor Uploader

A very simple interface allowing you to very easily upload and "preview"
uploaded files to [filepicker.io](http://filepicker.io) - a totally excellent
file uploading/picking/manipulation/hosting service.

Lovingly crafted with [meteor](https://meteor.com) on [meteorday](http://meteorday.com).

### Demo:

[file-picker.meteor.com](http://file-picker.meteor.com)

Just enter your API Key and use it...

The API Key is stored in a Collection,
so it should only be required the first time you run it.

Click "Forget API Key" *(on the right)* to remove/delete/forget the API key and start over.
*If you're using the demo site, or any public host, be sure to do this!*

### Setup:

    git clone https://github.com/zeroasterisk/filepicker-meteor-uploader.git
    cd filepicker-meteor-uploader
    meteor

then go to [http://localhost:3000](http://localhost:3000)

### Todo:

* preview other filetypes besides images
* make secure
* make publish/subscribe
* any way to tie into AWS S3 storage for *"all exisitng files"*?


### License: MIT

Copyright (C) 2014 Alan Blount <alan@zeroasterisk.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



