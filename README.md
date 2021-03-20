# commit checker

This index.js script runs in regular intervals of 1 hour <br>
Firslty we get the list of repos from db which is a server at leaderboard.herokuapp.com <br>
then loop through each repo and get commits which have merge pull in there name <br>
from that name we extract issuenumber and owner name <br>
then based on issuenumber we get the points of that issue to that repo from db which is also at the same leaderboard heroku server <br>
after getting that points we make a JSON for that user according to repos and send it to server to update in db <br>
<br>
DB is firebase <br>
<br>
Steps to setup <br>
Clone <br>
run npm install <br>
run node index.js <br>
