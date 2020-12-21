# commit checker

This index.js script runs in regular intervals of 1 hour
Firslty we get the list of repos from db which is a server at leaderboard.herokuapp.com
then loop through each repo and get commits which have merge pull in there name
from that name we extract issuenumber and owner name
then based on issuenumber we get the points of that issue to that repo from db which is also at the same leaderboard heroku server
after getting that points we make a JSON for that user according to repos and send it to server to update in db

DB is firebase

Steps to setup
Clone
run npm install
run node index.js