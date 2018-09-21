import EkoClient, { MessageRepository, ChannelRepository, EkoChannelType } from 'eko-sdk';

const client = new EkoClient({ apiKey: 'b3bee90c39d9a5644831d84e5a0d1688d100ddebef3c6e78' });
client.registerSession({ userId: 'user1234', displayName: 'Bob Newton' });

export const messageRepo = new MessageRepository();
export const channelRepo = new ChannelRepository();

export const newChannel = (Value) => {
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

export default client;