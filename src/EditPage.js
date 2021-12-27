import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';
import './scss/NewIssue.scss';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function EditPage(props) {
  const [priority, changePriority] = useState(props.cardLink.chevron);
  const [status, changeStatus] = useState(props.cardLink.idCol);
  const [description, changeDescription] = useState(props.cardLink.text);
  const [points, changePoints] = useState(props.cardLink.tag);
  const [title, changeTitle] = useState(props.cardLink.title);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });
  const setCrumbs = props.setCrumbs;
  const cardLink = props.cardLink;

  useEffect(() => {
    setCrumbs([
      { to: '/', name: 'Issue boards' },
      { to: '/task', name: cardLink.id + ' ' + cardLink.title },
      { to: '/task/edit', name: 'Edit' },
    ]);
  }, [setCrumbs, cardLink]);

  const submitF = (data) => {
    console.log(data);
    saveIssue(data);
  };

  function setChange(e, change) {
    change(e.target.value);
  }

  function saveIssue(e) {
    const issue = {};
    issue.title = e.title;
    issue.chevron = e.priority;
    issue.tag = e.points;
    issue.text = e.description;
    issue.id = props.cardLink.id;

    if (e.status === props.cardLink.idCol) {
      const currentId = props.taskList[+e.status - 1].value.findIndex((v) => v.id === props.cardLink.id);
      props.taskList[+e.status - 1].value[currentId] = issue;
    } else {
      const currentIndex = props.taskList[props.cardLink.idCol - 1].value.findIndex((v) => v.id === issue.id);
      props.taskList[+e.status - 1].value.push(issue);
      props.taskList[props.cardLink.idCol - 1].value.splice(currentIndex, 1);
    }

    props.setSearchResults(props.taskList);
    console.log(props.taskList);
  }

  return (
    <form onSubmit={handleSubmit(submitF)} className="form">
      <Controller
        control={control}
        rules={{ required: 'Обязательное поле!', maxLength: 100 }}
        name="title"
        defaultValue={title}
        render={({ field }) => {
          return (
            <input
              {...field}
              maxLength="100"
              className="form__title"
              type="text"
              placeholder="Title *"
              onChange={(e) => {
                field.onChange(e);
                setChange(e, changeTitle);
              }}
            />
          );
        }}
      />
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ messages }) => {
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
          defaultValue={priority}
          render={({ field }) => {
            return (
              <Select
                {...field}
                className={'form__select'}
                disableUnderline
                IconComponent={() => <ExpandMoreIcon />}
                value={priority}
                onChange={(e) => {
                  field.onChange(e);
                  setChange(e, changePriority);
                }}
              >
                <MenuItem value="0" disabled>
                  Priority
                </MenuItem>
                <MenuItem value={props.chevron.red2}>Critical</MenuItem>
                <MenuItem value={props.chevron.red1}>Major</MenuItem>
                <MenuItem value={props.chevron.green2}>Normal</MenuItem>
                <MenuItem value={props.chevron.gray1}>Minor</MenuItem>
              </Select>
            );
          }}
        />
        <Controller
          control={control}
          name="points"
          defaultValue={points}
          render={({ field }) => {
            return (
              <input
                {...field}
                type="number"
                className="form__points"
                placeholder="Story points"
                min="1"
                max="10"
                onChange={(e) => {
                  field.onChange(e);
                  setChange(e, changePoints);
                }}
              />
            );
          }}
        />
        <Controller
          name="status"
          control={control}
          defaultValue={status}
          render={({ field }) => {
            return (
              <Select
                {...field}
                className={'form__status'}
                disableUnderline
                IconComponent={() => <ExpandMoreIcon />}
                onChange={(e) => {
                  field.onChange(e);
                  setChange(e, changeStatus);
                }}
              >
                <MenuItem value={'none'} disabled>
                  Status
                </MenuItem>
                <MenuItem value={1}>To do</MenuItem>
                <MenuItem value={2}>In progress</MenuItem>
                <MenuItem value={3}>Test</MenuItem>
                <MenuItem value={4}>Done</MenuItem>
              </Select>
            );
          }}
        />
      </div>
      <Controller
        control={control}
        rules={{ maxLength: 300 }}
        name="description"
        defaultValue={description}
        render={({ field }) => {
          return (
            <textarea
              {...field}
              maxLength="300"
              placeholder="Description"
              className="form__description"
              onChange={(e) => {
                field.onChange(e);
                setChange(e, changeDescription);
              }}
            />
          );
        }}
      />
      <button type="submit" className="form__btn">
        Save
      </button>
    </form>
  );
}
