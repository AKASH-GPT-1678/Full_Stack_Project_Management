"use client";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import React from 'react';
import { io, Socket } from "socket.io-client";
import { useSelector } from 'react-redux';
import { Initials } from '@/AppComponent/redux';
import Sider2 from '@/AppComponent/Sider2';
import { loadMessages, saveMessage } from '@/lib/indexdbConfig';
export interface MessageData {
  sender?: string;
  text: string;
  date?: string;
  name?: string

};



const ChatPage = () => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<MessageData[]>([]);
  const [sandesh, setSandesh] = React.useState<MessageData[]>([]);
  const [name, setName] = React.useState("");
  const activeProjects = useSelector((state: { User: Initials }) => state.User.activeProject);
  const token = useSelector((state: { User: Initials }) => state.User.token);
  const userid = useSelector((state: { User: Initials }) => state.User.userid);
  const member = useSelector((state: { User: Initials }) => state.User.numofMembers);
  const socketRef = React.useRef<Socket | null>(null);
  const roomid = activeProjects;

  const userQuery = 
    `query: 
      query GetUser($token: String!) {
        getUser(token: $token) {
          id
          name
          email
        }
      }
    `
  
  
    const getUser = async (query: unknown) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Endpoint}graphql`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: { token: `Bearer ${token}` },
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.data.getUser.name);
      setName(data.data.getUser.name);
      return data.data.getUser.name
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };




  async function loadMessage(projectid: string) {
    const sandesh = await loadMessages(projectid);
    setSandesh(sandesh as MessageData[]);


  };
  const members = member! + 1

  React.useEffect(() => {
  

    const socket = io("http://localhost:3400", { autoConnect: true });
    socketRef.current = socket;

    socket.emit("join-room", { roomid, members });



    const handleReceiveMessage = (data: MessageData) => {
      setMessages(prev => [...prev, data]);
      saveMessage(activeProjects!, data);
    };

    socket.on("receive-message", handleReceiveMessage);


    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [roomid]);

  const handleSendMessage = () => {
    if (message.trim() && socketRef.current) {
      const date = new Date().toLocaleTimeString();
      socketRef.current.emit("send-message", {
        userid,
        roomid,
        message,
        date,
        name

      });
      setMessage("");
    }
  };

  React.useEffect(() => {
    getUser(userQuery.toString());
    if (activeProjects) {
      loadMessage(activeProjects);
    }
  }, [activeProjects ]);

  return (
    <div className='flex flex-row w-full h-full'>
      <div className='hidden md:block'>
         <Sider2 />

      </div>
     
      <div className='border-2 border-black w-full'>
     


        <div className='flex flex-col h-screen'>
          <div className='border-2 border-black h-[94%] w-full overflow-y-auto'>
            {sandesh.map((msg, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-3xl cursor-pointer m-2 h-[50px]flex flex-col flex items-center'
              >
                <div className={`flex flex-col h-[44px]  w-fit ${msg.sender === userid ? "ml-auto" : "mr-auto"} `}>
                  <p className='text-xs'>{msg.name}</p>
                  <div className='flex flex-row gap-10'><p>{msg.text}</p> <p className='text-xs flex justify-end-safe items-end-safe mr-5'>{msg.date}</p></div>


                </div>

              </div>
            ))}
            {messages.map((msg, index) => (
              <div
                key={index}
                className='bg-white p-4 rounded-3xl cursor-pointer m-2 h-[50px]flex flex-col flex items-center'
              >
                <div className={`flex flex-col h-[44px]  w-fit ${msg.sender === userid ? "ml-auto" : "mr-auto"} `}>
                  <p className='text-xs'>{msg.name}</p>
                  <div className='flex flex-row gap-10'><p>{msg.text}</p> <p className='text-xs flex justify-end-safe items-end-safe mr-5'>{msg.date}</p></div>


                </div>

              </div>
            ))}
          </div>
          <div className='h-[6%] w-full flex flex-row items-center p-2 justify-center mt-2'>
            <Input
              type='text'
              placeholder='Type your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className='h-[95%] text-2xl ml-3 mr-2 rounded-2xl flex-1 p-6'
            />
            <Button
              className='w-[130px] bg-black text-white h-[50px] p-1 cursor-pointer rounded-2xl '
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
