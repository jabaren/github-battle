var axios = require('axios');

var id = "328afd93c65f8a1e8957";
var sec = "cf42da8870e8d515a67263fa648be00bcdcbc17c";
var param = "?client_id="+id+'&client_secret='+sec;

function getUserInfo(username){
  return axios.get('https://api.github.com/users/'+username+param);
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
  }
};

module.exports = helpers;