var axios = require('axios');

var id = "328afd93c65f8a1e8957";
var sec = "cf42da8870e8d515a67263fa648be00bcdcbc17c";
var param = "?client_id="+id+'&client_secret='+sec;

function getUserInfo(username){
  return axios.get('https://api.github.com/users/'+username+param);
}

function getRepos(username){
  return axios.get('https://api.github.com/users/'+username+'/repos'+param+'&per_page=100');
}

function getTotalStarts (repos){
  return repos.data.reduce((prev,current) =>{
    return prev + current.stargazers_count;
  },0);
}

function getPlayersData(player){
  return getRepos(player.login)
    .then(getTotalStarts)
    .then(function(totalStars){
      return{
        followers:player.followers,
        totalStars: totalStars
      }
    })
}

function calculateScores (players){

  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ];
}

var helpers = {

  getPlayersInfo: function(players){
    return axios.all(players.map(player => {
      return getUserInfo(player);
    }))
      .then(info => {
        return info.map(response => response.data);
      })
      .catch(err =>{
        console.warn('Error in getPlayersInfo',err);
      });
  },

  battle: function(players){
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch( err => {console.warn('Error in getPlayersInfo : ',err)})
  }
};

module.exports = helpers;