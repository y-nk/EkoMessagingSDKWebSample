import React from 'react';
import { EkoSyncState } from 'eko-sdk';


const Message = ({ user, data, syncState }) => {
  const userTitle = user && user.model ?
    `${user.model.userId}${user.model.displayName ? ` (${user.model.displayName})` : ''}` :
    'Loading...';

  return (
    <div
      id="message"
      className={syncState === EkoSyncState.Synced ? 'fresh' : ''}
    >
      <span className="title">{userTitle}:</span>
      <p>
        <span className="message-bubble">{data.text}
          {syncState === EkoSyncState.Synced && (
            <i className="lnr-check"></i>
          )}
        </span>
      </p>
    </div>
  );
};

export default Message;
