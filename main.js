// Initial settings
var request = require('request');
var settings = require('./settings.json');
var dataset = {title: 'No shows today', 'body': ''}

/**
 * Setting up callback functions
 */

var callback = {
    MyEpisodes: function(error, response, body) {
        if (!error && response.statusCode == 200)
        {
            console.log(body);
        }
    },

    PushBullet: function(error, response, body) {
        if (!error && response.statusCode == 200)
        {
            console.log(body);
        }
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
            'Authorization': 'Bearer '+settings.PushBullet.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "note",
            "title": dataset.title,
            "body": dataset.body
        })
    },
    MyEpisodes: {
        url: 'https://www.myepisodes.com/rss.php?feed=today&uid='+settings.MyEpisodes.uid+'&pwdmd5='+settings.MyEpisodes.pwdmd5
    }
}

/**
 * Get data from MyEpisodes.com
 */

request(requestSettings.MyEpisodes, callback.MyEpisodes);

/**
 * Brace yourself for data transfer
 */

//request(requestSettings.PushBulletSettings, callback.PushBullet);

/**
 *  Data transfer is complete
 */
