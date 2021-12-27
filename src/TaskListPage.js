import './scss/App.scss';
import { Column } from './Column';
import { SearchForm } from './SearchForm';
import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function TaskListPage(props) {
  const [searchItem, setItem] = useState('');
  const onSearch = (v) => setItem(v);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentColumn, setCurrentColumn] = useState(null);

  const setSearchResults = props.setSearchResults;
  const boardPage = props.board;

  useEffect(() => {
    const result1 = boardPage.map((board) => board.value.filter((card) => card.id.toLowerCase().includes(searchItem)));
    const result = JSON.parse(JSON.stringify(boardPage));
    for (let i = 0; i < result1.length; i++) {
      result[i].value = result1[i];
    }
    setSearchResults(result);
  }, [searchItem, setSearchResults, boardPage]);

  const setCrumbs = props.setCrumbs;
  useEffect(() => setCrumbs([{ to: '/', name: 'Issue boards' }]), [setCrumbs]);

  return (
    <div className="app">
      <div className="app__row">
        {' '}
        <h1>Issue Boards</h1>
        <button className="app__btn">
          <Link to="/new-issue">New Issue</Link>
        </button>
      </div>

      <SearchForm list={props.searchResults} onSearch={onSearch}></SearchForm>
      <div className="app__board">
        {props.searchResults.map((v) => (
          <Column
            setCard={setCurrentCard}
            currentColumn={currentColumn}
            cardLink={props.cardLink}
            setCardLink={props.setCardLink}
            setColumn={setCurrentColumn}
            board={props.board}
            setBoard={props.setBoard}
            currentCard={currentCard}
            column={v}
            name={v.column}
            list={v.value}
            key={v.id}
          ></Column>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
