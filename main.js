/**
 * Set initial settings
 */

var request = require('request');
var parseString = require('xml2js').parseString;

// Get user settings
var settings = require('./settings.json');

// Default data for PushBullet
var data = {type: 'note', title: 'No shows today', 'body': ''};

// Current user must be predefined to zero-index because of lazy coder...
if (settings.length == 0) return false;
var currentUser = settings[0];

/**
 * Parse title into array
 * @param title
 * @constructor
 */
function parseTitle(title) {
    return title.split(/\[\s?|\s?\]\[\s?|\s?\]\s?/).filter(function(el) {return el.length != 0});
}

/**
 * Get rss-data from MyEpisodes.com
 */
function MyEpisodes(error, response, body) {
    // Is request successful?
    if (!error && response.statusCode == 200)
    {
        // Parse result from XML to Object
        parseString(body, function(err, result) {
            // Save useful info
            var r = result.rss.channel[0].item;

            // No shows today
            if (r.length == 0) {
                return false;
            }

            // Set title to something more useful
            data.title = "Shows airing today";

            // Go through each show
            for (var i = 0; i < r.length; i++)
            {
                // Save title
                var info = parseTitle(r[i].title[0]);

                // Add to data-text
                data.body += info[0]+"\n";
            }

            // Save data to data-object
            requestSettings.PushBulletSettings.body = JSON.stringify(data);

            // Push to PushBullet
            request(requestSettings.PushBulletSettings, PushBullet);
        });
    }
}

/**
 * Push to PushBullet
 */
function PushBullet(error, response, body) {
    if (!error && response.statusCode == 200)
    {
        // There's really nothing to do
    }
}

/**
 * Setting up request settings
 */
var requestSettings = {
    PushBulletSettings: {
        url: 'https://api.pushbullet.com/v2/pushes',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+currentUser.PushBullet.token,
            'Content-Type': 'application/json'
        },
        body: {}
    },
    MyEpisodes: {
        url: 'https://www.myepisodes.com/rss.php?feed=today&uid='+currentUser.MyEpisodes.uid+'&pwdmd5='+currentUser.MyEpisodes.pwdmd5
    }
}

/**
 * Start the mayhem!
 */
for (var i = 0; i < settings.length; i++) {
    currentUser = settings[i];
    request(requestSettings.MyEpisodes, MyEpisodes);
}

