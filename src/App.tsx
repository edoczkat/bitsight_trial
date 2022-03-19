import { useState } from 'react';
import './App.css';


function App() {

  const INTERVAL = 120000;
  let [repo,setRepo] = useState([]);
  let [users,setUsers] = useState([]);

const getLatestRepositoriesFromGithub = () => {
    const params = {q: "created:>" + getDate(),sort:"stars",order:"desc",per_page: "5",page:"1"};
    const url = "https://api.github.com/search/repositories?" + objectToQueryString(params);
    fetch(url)
    .then (res => res.json())
    .then (data => {
        console.log("repos",data);
        setRepo(data.items);
    })
}

const getLatestUsersFromGithub = () => {
    const params = {q: "created:>=" + getLastYearDate(),sort:"followers",order:"desc",per_page: "5",page:"1"};
    const url = "https://api.github.com/search/users?" + objectToQueryString(params);
    fetch(url)
    .then (res => res.json())
    .then (data => {
        console.log("Users",data);
        setUsers(data.items);
        
    })
}

const objectToQueryString = (obj: any) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2,'0');
    return year + "-" + month + "-" + "01";
}

const getLastYearDate = () => {
      let date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      const year = date.getFullYear();
      const month = date.getMonth().toString().padStart(2, '0');
      return year + "-" + month + "-" + date.getDate();
  }

const repoClickHandler = () => {
  getLatestRepositoriesFromGithub();
  setInterval(() => {
    getLatestRepositoriesFromGithub();
  },INTERVAL);
}

const userClickHandler = () => {
  getLatestUsersFromGithub();
  setInterval(() => {
    getLatestUsersFromGithub();
  },INTERVAL);
}



  return (
    <div className="app">
      <header className = "app-header">
        <h1 className="title is-1">BitSight Trial App</h1>
      </header>
      <main>
        <div>
          <button id="hot_repo" onClick={repoClickHandler}>Fetch Repo</button>
          <button id="prolific_users" onClick={userClickHandler}>Fetch Users</button>
        </div>

        <div className="product-table table-container">
          <table className="table">
            <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Stars</th>
              </tr>
            </thead>
            <tbody>
            {repo.map((row: any) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.full_name}</td>
                <td>{row.description}</td>
                <td>{row.stargazers_count}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="product-table table-container">
          <table className="table">
            <thead>
              <tr>
                  <th>ID</th>
                  <th>Login</th>
                  <th>Avatar</th>
                  <th>Followers</th>
              </tr>
            </thead>
            <tbody>
            {users.map((row: any) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.login}</td>
                <td><img src={row.avatar_url} alt={row.avatar_url}></img></td>
                <td>{row.followers_url}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;