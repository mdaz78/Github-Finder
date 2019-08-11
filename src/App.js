import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    users: [],
    alert: null,
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${
  //       process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
  //   );
  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   });
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );

    this.setState({
      users: res.data.items,
      loading: false,
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message,
        type,
      },
    });

    setTimeout(() => {
      this.setState({
        alert: null,
      });
    }, 5000);
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
