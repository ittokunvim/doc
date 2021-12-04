# package.json

reference

- https://docs.npmjs.com/cli/v8/configuring-npm/package-json

```json
"//": "This is Comment", 
"homepage": "project homepage (https://github.com/owner/project#readme)", 

{
  "//": "問題が起きたときにメッセージを送る先", 
  "url" : "https://github.com/owner/project/issues",
  "email" : "project@hostname.com"
}, 

{
  "//": "https://opensource.org/licenses/alphabetical"
  "license" : "BSD-3-Clause"
}, 

{
  "//": "authorは一人、contributorは複数",
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
},

{
  "//": "ホームページを公開しない", 
  "private": true, 
}

{
  "//": "entry point, defaultはindex.html",
	"main": "index.html"  
}
```

