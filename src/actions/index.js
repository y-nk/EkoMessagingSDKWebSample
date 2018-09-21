let nextMessageId = 0;
let nextUserId = 0;
let nextChannelId = 0;

export const addMessage = (message, author) => ({
  type: 'ADD_MESSAGE',
  id: nextMessageId++,
  message,
  author,
});

export const loadMessage = (message, author) => ({
  type: 'LOAD_MESSAGE',
  id: nextMessageId++,
  message,
  author,
});

export const unloadMessage = () => ({
  type: 'UNLOAD_MESSAGE',
});

export const addUser = name => ({
  type: 'ADD_USER',
  id: nextUserId++,
  name,
});

export const setChannel = channel => ({
  type: 'SET_CHANNEL',
  id: nextChannelId++,
  channel,
});

export const setCurrentChannel = channel => ({
  type: 'SET_CURRENT_CHANNEL',
  channel,
});

export const messageReceived = (message, author) => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  message,
  author,
});
