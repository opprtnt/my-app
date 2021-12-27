import { useEffect } from 'react';
import './scss/TaskPage.scss';
import { Link } from 'react-router-dom';

export default function TaskPage(props) {
  const setCrumbs = props.setCrumbs;
  const cardLink = props.cardLink;
  useEffect(() => {
    setCrumbs([
      { to: '/', name: 'Issue boards' },
      { to: '/task', name: cardLink.id + ' ' + cardLink.title },
    ]);
  }, [setCrumbs, cardLink]);

  return (
    <div class="task">
      <h1>
        {props.cardLink.id} {props.cardLink.title}
      </h1>
      <div class="task__row">
        <div class="task__chevron">{props.cardLink.chevron}</div>
        <span className="task__tag">{props.cardLink.tag}</span>
        <span className="task__state">{props.cardLink.columnName}</span>
        <button className="task__edit-btn">
          <Link to="edit">Edit</Link>
        </button>
      </div>
      <p className="task__text">{props.cardLink.text}</p>
    </div>
  );
}
