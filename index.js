const axios = require("axios").default;

var score = {}

async function getCommits() {
  var repos = await (await axios.get("https://leaderboardserver.herokuapp.com/repos")).data.repos;
  console.log(repos);
  for (let i = 0; i < repos.length; i++) {
    let prcount = 0;
    var commits = (
      await axios.get(`https://api.github.com/repos/${repos[i]}/commits`)
    ).data;
    console.log("passed github");
    for(let k=0;k<commits.length; k++){
      var commit = commits[k];
      var message = commit.commit.message;
      if (message.substring(0, 10) === "Merge pull") {
        var namepart = message.split("from ")[1];
        var name = "";
        var j = 0;
        while (namepart[j] !== "/") {
          name += namepart[j];
          j++;
        }
        var issueNumber = message.split("\n\n")[1];
        issueNumber = issueNumber.trim();
        issueNumber = issueNumber.substring(1, issueNumber.length);
        issueNumber = parseInt(issueNumber);
        var points = await axios.post("https://leaderboardserver.herokuapp.com/getissue", {"repoName":repos[i], "issueNumber" : issueNumber});
        points = points.data.points;
        points = parseInt(points);
        if (!isNaN(issueNumber) && name!="SomalRudra") {
          if(score[name]){
            if(score[name][repos[i]]){
              score[name][repos[i]] += points;
            } else {
              score[name][repos[i]] = points;
            }
          } else{
            score[name] = {};
            score[name][repos[i]] = points;
          }
          prcount++;
        }
      }
    };
    var resp = await axios.post("https://leaderboardserver.herokuapp.com/prcount", {"repoName" : repos[i], "count" : prcount});
  }
  console.log(JSON.stringify(score,null,2));
  var serverResponse = await axios.post("https://leaderboardserver.herokuapp.com/setdb", {"data":JSON.stringify(score)});
  console.log(serverResponse.data);
}

getCommits();
