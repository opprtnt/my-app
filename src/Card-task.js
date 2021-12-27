import './scss/card-task.scss';
import { Link } from 'react-router-dom';

export function CardTask(props) {
  const board = props.board;

  function dragStartHandler(e, col, card) {
    props.setCard(card);
    props.setColumn(col);
  }
  function dropHandler(e, col, card) {
    e.preventDefault();
    console.log(props.currentColumn);
    const currentIndex = props.currentColumn.value.indexOf(props.currentCard);
    props.currentColumn.value.splice(currentIndex, 1);
    const dropIndex = col.value.indexOf(card);
    col.value.splice(dropIndex + 1, 0, props.currentCard);

    props.setBoard(
      board.map((v) => {
        if (v.id === col.id) {
          return col;
        }
        if (v.id === props.currentColumn.id) {
          return props.currentColumn;
        } else return v;
      })
    );
    console.log(board);
  }

  function setLink(card, columnName, id) {
    const cardWithCol = Object.assign({}, card);
    cardWithCol.columnName = columnName;
    cardWithCol.idCol = id;
    props.setCardLink(cardWithCol);
  }
  return (
    <div
      draggable
      onDragStart={(e) => dragStartHandler(e, props.col, props.card)}
      onDrop={(e) => dropHandler(e, props.col, props.card)}
      className="card-task"
    >
      <Link to="/task" onClick={(e) => setLink(props.card, props.col.column, props.col.id)}>
        <p className="card-task__body">{props.title}</p>
      </Link>
      <div className="card-task__footer">
        <div className="card-task__statuses">
          <span className="card-task__chevron">{props.chevron}</span>
          <span className="card-task__tag">{props.tag}</span>
        </div>

        <span className="card-task__id">{props.id}</span>
      </div>
    </div>
  );
}
