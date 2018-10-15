import React from 'react';
import { EkoSyncState } from 'eko-sdk';


const Message = ({ userId, data, syncState }) => (
  <div
    id="message"
    className={syncState === EkoSyncState.Synced ? 'fresh' : ''}
  >
    <span className="title">{userId}:</span>
    <p>
      <span className="message-bubble">{data.text}
        {syncState === EkoSyncState.Synced && (
          <i className="lnr-check"></i>
        )}
      </span>
    </p>
  </div>
);

export default Message;
