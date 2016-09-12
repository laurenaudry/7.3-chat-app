import React from 'react'

export default React.createClass({
  getInitialState(){
    return {
      message: []
    }
  },
  componentDidMount(){
  setInterval(() => {
    this.getMessages()
  }, 2000)
},
getMessages(){
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", (e) => {
      var responseJSON = JSON.parse(e.target.response);
      this.setState({
        messages: responseJSON
      });
    });

    xhr.open("GET", "http://tiny-tiny.herokuapp.com/collections/laurenaudry-chat-app");
    xhr.send();
  },
  onSubmitMessageHandler(e){
    e.preventDefault();
    var messageValue = this.refs.message.value;

    var newMessageStringified = JSON.stringify({
      author: "Guest",
      message: messageValue
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", (e)=>{
      var responseJSON = JSON.parse(e.target.response);
      this.getMessages();
    });
    this.refs.message.value = '';
    xhr.open("POST", "http://tiny-tiny.herokuapp.com/collections/laurenaudry-chat-app");
    // telling the server what type of content to expect
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(newMessageStringified);
  },
  render() {
    return (
      <section className="chat__app">
        <header className="header">
          <h1 className="title">
            Converse freely here
          </h1>
        </header>
        <ul className="messages">
          { this.state.message.map((message, i) => {
            return <li key={i}
                       className="chat__app--message">
                      <h3 className="chat__app--author">{message.author}</h3>
                      <p className="chat__app--messageInput">-&emsp;{message.message}</p>
                   </li>
          }).reverse()}
        </ul>
        <form method="POST"
              action="#"
              onSubmit={this.onSubmitMessageHandler}>
          <input type="submit"
                 name="submit"
                 value="+"
                 className="chat__app--submit" />
          <input type="text"
                 placeholder="Write message here"
                 ref="todoName"
                 className="chat__app--inputArea" />
        </form>
      </section>
    )
  }
})
