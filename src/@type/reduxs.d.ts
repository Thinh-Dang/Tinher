interface IAction {
  code: number;
  message: string;
  data?: undefined;
}

// Slice User Redux
interface IInitialStateUser {
  isStatusApi: boolean;
  isLogin: boolean;
  isSocial: boolean;
  phone: string;
  isGetPhone: boolean;
  isVerifyOtp: boolean;
  inforUser: {
    name: string;
    email: string;
    birthday: string;
    gender: GenderEnum;
  };
}

// Slice Uer Profile Redux
interface IUserProfile {
  [key: string]: any;
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: Date;
  gender: string;
  description: string;
  children: number;
  alcohol: string;
  religion: string;
  purposeId: string;
  height: number;
  maritalStatus: string;
  education: string;
  isBlock: boolean;
  isVerify: boolean;
  album: IUserImages[];
  hobbies: IUserHobbies[];
}

// Slice Chat Redux
interface IMessage {
  id: string;
  sender_id: string;
  conversation_id: string;
  content: string;
  image: string;
}

interface IConversation {
  id: string;
  user_id: string;
  user_friend_id: string;
  socket_id: string;
  message: IMessage[];
  sending: boolean;
}

interface IInitialStateChat {
  loading: boolean;
  error: string;
  conversations: IConversation[] | undefined;
  messages: IMessage[] | undefined;
  loaded: boolean;
}

declare interface IUserNearby {
  id: string;
  name: string;
  age: number;
  location?: {
    longitude: number;
    latitude: number;
  };
  distance: number;
  imgUrl: string;
}
