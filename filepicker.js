FpApiKey = new Meteor.Collection('fpapikey');
FpFiles = new Meteor.Collection('fpfiles');
FilepickerLoaded = false;

if (Meteor.isClient) {

  // Want to force an API key?
  //   put your API key here
  // Session.set('apikey', 'xxxxxxxxxxxxxxxxxxxxxx');

  Meteor.startup(function () {
    Session.set('fpfiles', []);
    Session.set('apikey', null);

    // saved apikey?
    Tracker.autorun(function () {
      var saved = FpApiKey.findOne({_id: 'apikey'});
      if (saved && saved.val) {
        Session.set('apikey', saved.val);
      }
      // autoloading via session or saved apikey?
      if (Session.get('apikey')) {
        loadFilePicker(Session.get('apikey'));
      }
    });

    // setup reactive "loaded" variable
    //   since the filepicker plugin doesn't "tell" us that
    Tracker.autorun(function (filepicker) {
      FilepickerLoaded = (typeof filepicker === "object");
      Session.set('fploaded', (typeof filepicker === "object"));

      var apikey = Session.get('apikey');
      if (FilepickerLoaded && apikey && _.has(filepicker, 'setKey')) {
        filepicker.setKey(apikey);
      }
    });
  });

  Template.picker.events({
    'submit form': function(event) {
      event.preventDefault();
      var apikey = $('#apikey').val();
      if (apikey.length < 8) {
        return false;
      }
      FpApiKey.upsert({_id: 'apikey'}, {_id: 'apikey', val: apikey});
    },
    'click .new': function() {
      Session.set('apikey', null);
      FpApiKey.remove({_id: 'apikey'});
      delete filepicker;
    }
  });

  Template.lister.events({
    'click .store': function() {
      FpFiles.insert(this);
      _.each(Session.get('fpfiles'), function(fpfile, i, l) {
        if (fpfile.filename != this.filename) {
          return;
        }
        delete l[i];
        Session.set('fpfile', l);
      });
    }
  });
  Template.lister.helpers({
    files: function() {
      if (!Session.get('fpfiles')) {
        return [];
      }
      return Session.get('fpfiles');
    },
    isImg: function() {
     var fn = this.filename || '';
     return String(fn).indexOf(/\.(png|gif|jpg|jped)$/i)
    }
  });

  Template.stored.events({
    'click .forget': function() {
      if (!confirm('Are you sure?  (this does not delete the file, but forgets it from this screen)')) {
        return;
      }
      FpFiles.remove(this._id);
    }
  });
  Template.stored.helpers({
    files: function() {
      return FpFiles.find();
    },
    isImg: function() {
     var fn = this.filename || '';
     return String(fn).indexOf(/\.(png|gif|jpg|jped)$/i)
    }
  });

}

if (Meteor.isServer) {
  BrowserPolicy.content.allowImageOrigin("https://*.filepicker.io");
  BrowserPolicy.content.allowFrameOrigin("https://*.filepicker.io");
  BrowserPolicy.content.allowScriptOrigin("https://*.filepicker.io");
  BrowserPolicy.content.allowInlineScripts("https://*.filepicker.io");

  BrowserPolicy.content.allowImageOrigin("http://*.filepicker.io");
  BrowserPolicy.content.allowFrameOrigin("http://*.filepicker.io");
  BrowserPolicy.content.allowScriptOrigin("http://*.filepicker.io");
  BrowserPolicy.content.allowInlineScripts("http://*.filepicker.io");

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
