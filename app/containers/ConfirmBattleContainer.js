var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({

  contextTypes:{
    router:React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      isLoading:true,
      playersInfo:[]
    }
  },

  handleIniateBattle: function(e){
    this.context.router.push({
      pathname:'/results',
      state:{
        playersInfo:this.state.playersInfo
      }
    })
  },

  componentDidMount:function(){

    var query = this.props.location.query;

    githubHelpers.getPlayersInfo([query.playerOne,query.playerTow])
      .then(function(players){// or use arrow function

        this.setState({
          isLoading:false,
          playersInfo: players.map(player => player),
        });

      }.bind(this));
  },

  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}
        onInitiateBattle={this.handleIniateBattle}/>
    );
  }
});

module.exports = ConfirmBattleContainer;