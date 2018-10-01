import EkoClient, { MessageRepository, ChannelRepository, EkoChannelType, MessageEditorRepository } from 'eko-sdk';

const client = new EkoClient({ apiKey: 'YOUR-API-KEY' });
client.registerSession({ userId: 'user1234', displayName: 'Bob Newton' });

export const messageRepo = new MessageRepository();
export const channelRepo = new ChannelRepository();

export const addChannel = (Value) => {
    const createChannel = channelRepo.createChannel({
        channelId: Value,
        type: EkoChannelType.Standard,
        userIds: ['user1234'],
    })
    createChannel.once('dataUpdated', model => {
        console.log(`Channel created: ${model.channelId}`);
    });
}

export const joinChannel = (Value) => {
    const liveChannel = channelRepo.joinChannel({
        channelId: Value,
        type: EkoChannelType.Standard,
    });
    liveChannel.once('dataUpdated', model => {
        console.log(`Channel joined: ${model.channelId}`);
    });
}

export const sendMessage = (Message, Channel) => {
    const messageLiveObject = messageRepo.createTextMessage({
        channelId: Channel,
        text: Message,
    });

    messageLiveObject.on('dataStatusChanged', data => {
        console.log(`Message sent`);
    });
}

export const editMessage = (Message) => {
    const editor = new MessageEditorRepository(Message);
    editor.editText({
        text: 'New edited text',
    }).catch(error => {
    });
}

export default client;