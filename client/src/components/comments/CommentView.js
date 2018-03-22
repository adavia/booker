import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

const CommentView = ({ comment, data }) => {
  const userId = comment.relationships.user.data.id;

  return (
    <div className="comment-item">
      <h2>{data.get(`users_${userId}`).attributes.username} said:</h2>
      <p>{comment.attributes.content}</p>
      <small>Created {moment(comment.attributes.created_at).calendar()}</small>
    </div>
  );
}

export default observer(CommentView);