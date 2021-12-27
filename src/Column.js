import React from 'react';
import { CardTask } from './Card-task';
import './scss/column.scss';
export function Column(props) {
  const list = props.list;
  const listItem = list.map((v) => (
    <CardTask
      cardLink={props.cardLink}
      setCardLink={props.setCardLink}
      setCard={props.setCard}
      board={props.board}
      setBoard={props.setBoard}
      setColumn={props.setColumn}
      currentColumn={props.currentColumn}
      card={v}
      col={props.column}
      title={v.title}
      chevron={v.chevron}
      tag={v.tag}
      id={v.id}
      text={v.text}
      key={v.id}
      currentCard={props.currentCard}
    ></CardTask>
  ));
  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dropCardHandler(e, col) {
    if (col.value.length !== 0) return;
    col.value.push(props.currentCard);
    const currentIndex = props.currentColumn.value.indexOf(props.currentCard);
    props.currentColumn.value.splice(currentIndex, 1);
    props.setBoard(
      props.board.map((v) => {
        if (v.id === col.id) {
          return col;
        }
        if (v.id === props.currentColumn.id) {
          return props.currentColumn;
        } else return v;
      })
    );
  }

  return (
    <div
      draggable
      className="column"
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropCardHandler(e, props.column)}
    >
      <h2>{props.name}</h2>
      <ul className="column__list">{listItem}</ul>
    </div>
  );
}
