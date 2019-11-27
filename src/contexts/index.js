import { userReducer } from './user';
import { channelReducer } from './channel';
import { repoReducer } from './repo';
import { channelsReducer } from './channels';

const reducer = ({ currentChannel, user, repo, channels }, action) => ({
  currentChannel: channelReducer(currentChannel, action),
  user: userReducer(user, action),
  repo: repoReducer(repo, action),
  channels: channelsReducer(channels, action),
});

export default reducer;
