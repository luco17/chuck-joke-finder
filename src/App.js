import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import Highlighter from 'react-highlight-words';


const SITE_TITLE = "The Code Dojo";
const url = "https://api.chucknorris.io/jokes/search";


const Joke = (props) => {
  const {value, filterStr} = props;
  return(
    <div className="joke">
      <p>
        <Highlighter
          highlightClassName="highlight"
          searchWords={[filterStr]}
          autoEscape={true}
          textToHighlight={value}
        />
      </p>
      
      <p>-</p>       
    </div>
  )
}


function App() {

  const [jokeList, setJokeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStr, setFilter] = useState("");

  
  function handleFilterChange(e) {
    e.preventDefault();
    setFilter(e.target.value)
  };

  const fetchData = () => {
    console.log(searchQuery);
    axios.get(url, { params: { query: searchQuery}})
    .then((response) => setJokeList(response.data.result)
    )
    .catch((error) => console.error(error))
  }
  

  return (
    <div className="App">

      <div class="titles">
        <h2>{ SITE_TITLE }</h2>
        <span>Chuck Norris Joke Finder</span>
      </div>

      <div action="" id="searchJokes">
        <strong>Enter a word to see related jokes</strong>
        <div class="searchers">
          <input type="text" placeholder="search jokes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button onClick={fetchData}>Search Jokes</button>
        </div>
      </div>

      <form action="" id="jokeHighlighter">
        <input type="text" placeholder="text to highlight" value={filterStr} onChange={handleFilterChange} />
      </form>

        { searchQuery !== "" &&
          <h4>Displaying results for "{searchQuery}"</h4>
        }

      <div id="jokes">
        { jokeList.map((joke) => 
        <Joke value={joke.value} filterStr={filterStr}></Joke>
        )}
      </div>
    </div>
  );
}

export default App;
