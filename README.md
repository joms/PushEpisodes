PushEpisodes
============

A simple node.js application for pushing if any of the shows you follow on myepisodes.com air today, and if which one.

===

### How to run it

You need to create the file settings.json and configure it like so

```JSON
[
    {
        "MyEpisodes":
        {
            "uid": "<your username on myepisodes.com>",
            "pwdmd5": "<your md5 hash on myepisodes.com>"
        },

        "PushBullet": {
            "token": "<your token from PushBullet>"
        }
    }
]
```

