// Container Chat Home
interface IChatHome {
  chatSlider: IItemChatSlider[];
  conversationSlider: IItemMessageChat[];
}

// Container Chat Content
interface IUserFriend {
  userId: string;
  name: string;
  avatar: string;
  createAt: Date;
}

interface IMessage {
  messageId: string;
  senderId: string;
  content: string;
  image?: string;
  createAt: Date;
}

interface IImageMessage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string | undefined;
  buffer: RcFile;
  size: number | undefined;
}

interface IMessageSend {
  socketId: string;
  senderId: string;
  friendId: string;
  conversationId: string;
  content?: string;
  image?: IImageMessage;
}

interface ISocketDevice {
  socketId: string;
  userId: string;
}

interface IChatContent {
  infoFriend: IUserFriend;
  messages: IMessage[];
  contentChat: string;
  setContentChat: Dispatch<SetStateAction<string>>;
  handleClick: (e: any) => void;
  userId: string;
  fileImage: UploadFile[];
  handleChange:
    | ((info: UploadChangeParam<UploadFile<any>>) => void)
    | undefined;
  handleUploadImage: () => void;
}

// Map Container
interface IMapLocationContainer {
  friendsNearUser: IGetFriendNearUser[];
}
