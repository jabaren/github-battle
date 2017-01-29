var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');

function puke (obj){
  return <pre>{JSON.stringify(obj,2,' ')}</pre>;
}

function Results (props){

  return(
    <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
      <h1>Results</h1>
    </div>
  );
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  scores: PropTypes.array.isRequired,
  playersInfo: PropTypes.array.isRequired
};

module.exports = Results;
