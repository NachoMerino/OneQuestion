import React, { Component } from 'react';
import logo from './pictures/clock.png';
import Student from './components/Student';
import './App.css';



class App extends Component {

  state = {
    question:'',
    students:[],
  }

  changeText = event => {
    this.setState({
      question:event.target.value
    })
  }

  removeStudent = index => {
    const students = [...this.state.students];
    students.splice(index, 1);
    this.setState({ students });
  }


  sendQuestion = () => {
    this.setState( prevState => {return {
      students: [...prevState.students, prevState.question],
      question: '',
    }})
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Just One Question</h1>
        </header>
        <div className="question">
          <button onClick={this.sendQuestion}>Question Made By</button>
          <input onChange={this.changeText} value={this.state.question}/>
          {this.state.students.map((student, index) => <Student key={index} student={student} removeStudent={()=>{this.removeStudent(index)}}/>)}
        </div>

      </div>
    );
  }
}

export default App;
