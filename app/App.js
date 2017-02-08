import React from 'react';
import Header from './static/Header';
import Page from './kanban/Page/Page';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Page/>
      </div>
    )
  }
};

export default App;