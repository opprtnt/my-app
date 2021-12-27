import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';
import './scss/NewIssue.scss';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function NewIssue(props) {
  const title = null;
  const [priority, changePriority] = useState(props.chevron.gray);
  const [status, changeStatus] = useState('none');

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  let id = 0;

  const setCrumbs = props.setCrumbs;

  useEffect(() => {
    setCrumbs([
      { to: '/', name: 'Issue boards' },
      { to: '/new-task', name: 'New issue' },
    ]);
  }, [setCrumbs]);

  function setChange(e, change) {
    change(e.target.value);
    console.log(title);
  }

  const submitF = (data) => {
    console.log(data);
    saveIssue(data);
  };

  function saveIssue(e) {
    const issue = {};
    issue.title = e.title;
    issue.chevron = e.priority;
    issue.tag = e.points;
    id++;
    issue.id = id.toString();
    issue.text = e.description;
    props.taskList[+e.status].value.push(issue);
    props.setSearchResults(props.searchResults);
  }

  return (
    <form onSubmit={handleSubmit(submitF)} className="form">
      <Controller
        control={control}
        rules={{ required: 'Обязательное поле!', maxLength: 100 }}
        name="title"
        render={({ field }) => {
          return <input {...field} maxLength="100" className="form__title" type="text" placeholder="Title *" />;
        }}
      />
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ messages }) => {
          console.log('messages', messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p className="form__error-block" key={type}>
                  {message}
                </p>
              ))
            : null;
        }}
      />
      <div className="form__row">
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              className={'form__select'}
              disableUnderline
              value={priority}
              IconComponent={() => <ExpandMoreIcon />}
              onChange={(e) => {
                field.onChange(e);
                setChange(e, changePriority);
              }}
            >
              <MenuItem value={props.chevron.gray} disabled>
                Priority
              </MenuItem>
              <MenuItem value={props.chevron.red2}>Critical</MenuItem>
              <MenuItem value={props.chevron.red1}>Major</MenuItem>
              <MenuItem value={props.chevron.green2}>Normal</MenuItem>
              <MenuItem value={props.chevron.gray1}>Minor</MenuItem>
            </Select>
          )}
        />
        <Controller
          control={control}
          name="points"
          render={({ field }) => {
            return (
              <input {...field} type="number" className="form__points" placeholder="Story points" min="1" max="10" />
            );
          }}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                className={'form__status'}
                disableUnderline
                value={status}
                IconComponent={() => <ExpandMoreIcon />}
                onChange={(e) => {
                  field.onChange(e);
                  setChange(e, changeStatus);
                }}
              >
                <MenuItem value={'none'} disabled>
                  Status
                </MenuItem>
                <MenuItem value={0}>To do</MenuItem>
                <MenuItem value={1}>In progress</MenuItem>
                <MenuItem value={2}>Test</MenuItem>
                <MenuItem value={3}>Done</MenuItem>
              </Select>
            );
          }}
        />
      </div>
      <Controller
        control={control}
        rules={{ maxLength: 300 }}
        name="description"
        render={({ field }) => {
          return <textarea {...field} maxLength="300" placeholder="Description" className="form__description" />;
        }}
      />
      <button type="submit" className="form__btn">
        Save
      </button>
    </form>
  );
}
