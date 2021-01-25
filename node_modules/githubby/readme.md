<b>GitHubby</b> uses <a href="https://www.npmjs.com/package/request">request</a> (simplified http request client) to fetch the contents of a <a href="https://github.com/">GitHub</a> page and then <a href="https://www.npmjs.com/package/cheerio">Cheerio</a> (server side jQuery implementation) to parse the document. 

<i style="color: red;">Note: this is the first commit/version of package GitHubby. Currently proper error handling is on the todo list but right now the functions assume that you are not an idiot programmer and provide the proper arguments as described below.</i>
<hr/>

## Install it
Install GitHubby from the command line or download it from GitHub.

```javascript
npm install GitHubby
```

## Require it
Require it in your Node.js application.

```javascript
var GitHubby = require('githubby');
```

## Use it
This is  a list of all methods.

<hr/>

### getUser
Get the information of a single user.
```javascript
GitHubby.getUser('jochemstoel', (data) => 
{
	console.log(data);
});
```
Response
```json
{
    "name": "Jochem Stoel",
    "image": "https://avatars0.githubusercontent.com/u/4212360?v=3&s=400",
    "worksFor": "Jochem Stoel",
    "homeLocation": "Netherlands",
    "website": "http://jochemstoel.github.io/",
    "joined": "Apr 20, 2013"
}
```

### getUserRepositories
Get a list of user repositories.
```javascript
GitHubby.getUserRepositories('jochemstoel', (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "href": "https://github.com/jochemstoel/php-ago",
        "text": "Convert the difference between a given timestamp and the present moment to human language."
    },
    {
        "href": "https://github.com/jochemstoel/google-search-suggestions",
        "text": "This PHP class will return 10 Google Search suggestions for any given language and phrase(s)"
    },
    {
        "href": "https://github.com/jochemstoel/jquery-bootstrap-contextmenu",
        "text": "Tiny right-mouseclick contextmenu for jQuery / Bootstrap."
    },

    ...etc etc
]
```

### getUserFollowing
Get a list of all girls the user is following. 
```javascript
GitHubby.getUserFollowing('jochemstoel', (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "name": "Morteza Milani",
        "url": "https://github.com/milani",
        "image": "https://avatars1.githubusercontent.com/u/508130?v=3&s=192"
    },
    {
        "name": "Sjoer van der Ploeg",
        "url": "https://github.com/sfjuocekr",
        "image": "https://avatars1.githubusercontent.com/u/398018?v=3&s=192"
    },
    {
        "name": "Erik Smit",
        "url": "https://github.com/erik-smit",
        "image": "https://avatars2.githubusercontent.com/u/1376121?v=3&s=192"
    },
    {
        "name": "Abe",
        "url": "https://github.com/abrahamkoshy",
        "image": "https://avatars3.githubusercontent.com/u/323375?v=3&s=192"
    },
    {
        "name": "Alan Hamlett",
        "url": "https://github.com/alanhamlett",
        "image": "https://avatars1.githubusercontent.com/u/522344?v=3&s=192"
    }
]
```

### getUserFollowers
Get a list of all the stalkers who are following a user.
```javascript
GitHubby.getUserFollowers('jochemstoel', (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "name": "Sjoer van der Ploeg",
        "url": "/sfjuocekr",
        "image": "https://avatars1.githubusercontent.com/u/398018?v=3&s=192"
    },
    {
        "name": "Erik Smit",
        "url": "/erik-smit",
        "image": "https://avatars2.githubusercontent.com/u/1376121?v=3&s=192"
    },
    {
        "name": "Robin Prak",
        "url": "/SLKTH",
        "image": "https://avatars0.githubusercontent.com/u/11011399?v=3&s=192"
    }
]
```

### searchRepositories
Search for GitHub repositories. Set the second parameter (language) to false if you want to search all languages but you have to provide something.
```javascript
GitHubby.searchRepositories('electron', 'javascript', (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "name": "electron",
        "href": "https://github.com//electron-userland/electron-packager",
        "owner": "electron-userland",
        "description": "Package and distribute your Electron app with OS-specific bundles (.app, .exe etc) via JS or CLI"
    },
    {
        "name": "electron",
        "href": "https://github.com//szwacz/electron-boilerplate",
        "owner": "szwacz",
        "description": "Boilerplate application for Electron runtime"
    },
    {
        "name": "electronic",
        "href": "https://github.com//geeeeeeeeek/electronic-wechat",
        "owner": "geeeeeeeeek",
        "description": "A better WeChat client on Mac OS X and Linux."
    },
    {
        "name": "electron",
        "href": "https://github.com//electron-userland/electron-prebuilt",
        "owner": "electron-userland",
        "description": "Install Electron (formerly atom-shell) prebuilts using npm"
    },

    ... etc etc
]
```

### searchCode
Search code inside repositories. The second argument false means any language. Set to  'javascript' or 'c' or 'ruby' ...and so on.
```javascript
GitHubby.searchCode('system.io.file', false, (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "repository": "mp3infp",
        "owner": "k-takata",
        "file": "src/lib/mp4v2/libplatform/src/FileSystem.cpp",
        "href": "https://github.com/k-takata/mp3infp/blob/19e4a6643d5646d7eb20300914279fc16235f69a/src/lib/mp4v2/libplatform/src/FileSystem.cpp"
    },
    {
        "repository": "MissingFeatures.NET",
        "owner": "NikolayIT",
        "file": "MissingFeatures.Tests.Fakes/FakesAssemblies/mscorlib.Fakes.fakesconfig",
        "href": "https://github.com/NikolayIT/MissingFeatures.NET/blob/c06c4d60699b37da433845a9767ff2eedfd8f1c7/MissingFeatures.Tests.Fakes/FakesAssemblies/mscorlib.Fakes.fakesconfig"
    },
    {
        "repository": "strategoxt",
        "owner": "metaborg",
        "file": "strategoxt/stratego-libraries/lib/ssl-compat/io.str",
        "href": "https://github.com/metaborg/strategoxt/blob/bb586fe04a9e1f277ead402d08dad248392253ae/strategoxt/stratego-libraries/lib/ssl-compat/io.str"
    },
    
    ... etc etc
]
```

### searchUsers
Use this method to search for users. 
```javascript
GitHubby.searchUsers('jochem', (data) => 
{
	console.log(data);
});
```
Response
```json
[
    {
        "name": "Jochem Stoel",
        "image": "https://avatars0.githubusercontent.com/u/4212360?v=3&s=400",
        "worksFor": "Jochem Stoel",
        "homeLocation": "Netherlands",
        "website": "http://jochemstoel.github.io/",
        "joined": "Apr 20, 2013"
    }, 
    {
        "name": "Jochem Kossen",
        "image": "https://avatars1.githubusercontent.com/u/365837?v=3&s=400",
        "worksFor": "",
        "homeLocation": "Zwolle, NL",
        "website": "http://jkossen.nl",
        "joined": "Aug 16, 2010"
    },
    {
        "name": "Jochem",
        "image": "https://avatars1.githubusercontent.com/u/2325654?v=3&s=400",
        "worksFor": "",
        "homeLocation": "Utrecht, NL",
        "website": "",
        "joined": "Sep 11, 2012"
    },
    {
        "name": "Jochem Nabuurs",
        "image": "https://avatars0.githubusercontent.com/u/1541475?v=3&s=400",
        "worksFor": "Jaffiro (freelance webdevelopment)",
        "homeLocation": "Nijmegen, The Netherlands",
        "website": "http://www.jaffiro.nl",
        "joined": "Mar 15, 2012"
    },
    
    ... etc etc
]
```

<img src="http://33.media.tumblr.com/avatar_048a728a1488_128.png"><hr/>
# Jochem Stoel

Involuntary public figure.
<ul>
<li> https://www.npmjs.com/~jochemstoel</li>
<li> http://jochemstoel.github.io/</li>
<li> https://jochemstoel.tumblr.com/</li>
<li> https://jochemstoel.nl/</li>
<li> https://www.facebook.com/Jochem-Stoel-271292656217087/</li>
</ul>
