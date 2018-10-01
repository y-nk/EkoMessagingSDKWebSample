import EkoClient, {
    _changeSDKDefaultConfig,
    MessageRepository,
    ChannelRepository,
    EkoChannelType,
    MessageEditorRepository,
} from 'eko-sdk';
import SdkKeys from './../sdk-keys';

// ATTENTION: The configuration required ONLY for ekosdk sample app to avoid spamming to production endpoints
_changeSDKDefaultConfig({
  ws: { endpoint: 'https://api.staging.ekomedia.technology' },
  http: { endpoint: 'https://api.staging.ekomedia.technology' },
});
// ==========

const client = new EkoClient({ apiKey: SdkKeys.STAGE_SAMPLE_APP });
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