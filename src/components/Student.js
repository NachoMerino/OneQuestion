import React from 'react';


export default class Student extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 3600, disabled: true };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentDidUpdate(){
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
      this.setState({ disabled: false })
    }
  }

  render() {
    return (
      <div className="student">
        <p className="student-name">{this.props.student}</p> Next Question in: {(this.state.time.m < 10) ? ('0' + this.state.time.m) : (this.state.time.m)}:{(this.state.time.s < 10) ? ('0' + this.state.time.s) : (this.state.time.s)}<button onClick={this.props.removeStudent} disabled={this.state.disabled}>Delete</button>
      </div>
    );
  }
}
