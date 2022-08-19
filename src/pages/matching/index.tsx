import { Layout } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HeartContainer from './components/heart-container';
export interface IMatchedFriends {
  id: string;
  imgUrl: string;
}
const MatchPage = () => {
  const [greetMessage, setGreetMessage] = useState('');
  const router = useRouter();
  const [matchedFriends, setMatchedFriends] = useState([
    {
      id: '1',
      imgUrl:
        'https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/298063211_1973168512884226_6538560832333257903_n.jpg?stp=cp1_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=0debeb&_nc_ohc=UnlEswaxwr4AX-W0E4b&_nc_ht=scontent.fsgn5-2.fna&oh=00_AT_ip0e5MyMpvgJET6FpJA2-p3kAsrkoEt3NJMSIKANszw&oe=6304A332',
    },
    {
      id: '2',
      imgUrl:
        'https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.18169-9/13007112_940696449378224_6234918812435202765_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=xCqHm4J7vGUAX9iZlIP&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT_qcCqe7B-iaQiWC8vLrKFJ56HwUl-bvUGXjPgmMOXnkQ&oe=6323BE9C',
    },
    {
      id: '3',
      imgUrl:
        'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/297818087_1924661254394873_2296472629626558402_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=TbIhzTiSKX4AX-6frd2&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_6TaCJ_Xf3QI5c41bL6rM5OemtEYrKK7oqbysITG-GTA&oe=6303A954',
    },
    {
      id: '4',
      imgUrl:
        'https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/40051735_296516041158699_1982041065376448512_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=gSPNAu_fjVYAX89nMGP&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT_jj7q_howeucDbGHLGhTZ2y5Z9RegCZY1IKmmNUUdcmA&oe=63262275',
    },
    {
      id: '5',
      imgUrl:
        'https://scontent.fsgn5-3.fna.fbcdn.net/v/t31.18172-8/13717197_1795114694056285_4893431714633905232_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=174925&_nc_ohc=fIfQefHObqQAX_ZGHX4&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT_m4-MaEq_8uYjjH4q4b2ie3jNgZRD3Hzn_Q-wZtArJrA&oe=63231E48',
    },
    {
      id: '6',
      imgUrl:
        'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/52769478_10210352960339630_4658544927670534144_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=oPXAx-v_NhMAX94EzcQ&_nc_ht=scontent.fsgn5-5.fna&oh=00_AT8BdmcVSFImHO8eL8B676QO8Xn_mKp5erXB3mEc0R0hXw&oe=6325684E',
    },
    {
      id: '7',
      imgUrl:
        'https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.18169-9/20953205_125305531434498_6345429571670680078_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0Cq38BzYUe8AX9asK-I&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT9jspSGb9rvVlBqnspCN_wNew1AEC9W4B5pkt2Nw2PM5g&oe=63263027',
    },
    {
      id: '8',
      imgUrl:
        'https://scontent.fsgn5-6.fna.fbcdn.net/v/t31.18172-8/16402727_1897667673798900_4061341936104203033_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=_2Vou98740MAX8ykw4K&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT_DBFJ39VNDtRM7VsPca-dkTGVg8sYK0yyGJILPdqwQGA&oe=632486A4',
    },
    { id: '9', imgUrl: './assets/images/avatar/avatar9.jpg' },
    {
      id: '10',
      imgUrl:
        'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/297524648_3323605234540549_915661952793870144_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0debeb&_nc_ohc=jmWmx3HktIIAX_at8Hn&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT8h1mAFGky--o0GSsDicvzYMFPoRZJ-PJnvtVwdwT94lQ&oe=6303F519',
    },
  ]);
  const handleOnChange = (e: any) => {
    setGreetMessage(e.target.value);
  };
  const handleSkip = () => {
    const arr = [...matchedFriends];

    if (arr.length < 2) {
      router.push('/chat');
      return;
    }

    arr.shift();
    setMatchedFriends(arr);
  };
  return (
    <Layout title="Matching" isFooter={false} isHeader={false}>
      <div className="matchingFrame">
        <Link href="/chat">
          <a>
            <img
              className="matchingFrame-btnClose"
              src="./assets/images/CloseBtn.svg"
              alt=""
            />
          </a>
        </Link>
        <HeartContainer matchedFriend={matchedFriends && matchedFriends[0]} />
        <div className="matchingFrame-content">
          <h2 className="matchingFrame-content-title">IT'S A MATCH</h2>
          <p className="matchingFrame-content-message">
            Đừng để cô ấy phải đợi, <br />
            gửi lời chào ngay!
          </p>
        </div>
        <div className="matchingFrame-handle">
          <form action="" className="matchingFrame-handle-form">
            <input
              className="matchingFrame-input"
              type="text"
              onChange={handleOnChange}
              value={greetMessage}
              placeholder="Gửi lời chào"
            />
            <button
              style={{ backgroundImage: `url('./assets/images/send.svg')` }}
              type="submit"
              className="matchingFrame-input-send"
            ></button>
          </form>
          <button onClick={handleSkip} className="matchingFrame-skip">
            Skip
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MatchPage;
