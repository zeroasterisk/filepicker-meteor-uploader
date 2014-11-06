FpFiles = new Meteor.Collection('fpfiles');
FilepickerLoaded = false;

if (Meteor.isClient) {

  // Want to force an API key?
  //   put your API key here
  // Session.set('apikey', 'xxxxxxxxxxxxxxxxxxxxxx');

  Meteor.startup(function () {
    Session.set('fpfiles', []);

    Tracker.autorun(function (filepicker) {
      FilepickerLoaded = (typeof filepicker === "object");
    });


    if (Session.get('apikey')) {
      loadFilePicker(Session.get('apikey'));
    }

  });

  Template.picker.events({
    'submit form': function(event) {
      event.preventDefault();
      Session.set('apikey', $('#apikey').val());
      loadFilePicker(Session.get('apikey'));
    }
  });

  Template.picker.helpers({
    'isKeyEntered': function() {
      return (Session.get('apikey'));
    },
    'isReady': function() {
      return FilepickerLoaded;
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
