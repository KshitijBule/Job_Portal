import { Indicator, Menu, rem, useMantineTheme, Notification } from "@mantine/core";
import { IconBell, IconCheck, IconUserCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotifications, readNotification } from "../Services/NotiService";


const NotiMenu=()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =useSelector((state:any)=>state.user);
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);

useEffect(() => {
  if (user?.data?.id) {
    getNotifications(user.data.id)
      .then((res) => {
        console.log(res);
        setNotifications(res);
      })
      .catch((err) => console.log(err));
  }
}, [user]);

const unread = (index:number) => {
  let notis = [...notifications];
  notis = notis.filter((noti:any, i:number) => i != index);
  setNotifications(notis);
  readNotification(notifications[index].id)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
}

  


  return <Menu shadow="md" width={260} opened={opened} onChange={setOpened}>
  <Menu.Target>
    <div className="bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer">
      <Indicator disabled ={notifications.length<=0} color="yellow" offset={5} processing size={9}>
        <IconBell stroke={1.5} />
      </Indicator>
    </div>
  </Menu.Target>

  <Menu.Dropdown>
  <div className="flex flex-col gap-2 p-2">
    {notifications.length > 0 ? (
      notifications.map((noti:any, index:number) => (
        <Notification
        onClick={()=>{
          navigate(noti.route);
          unread(index);
          setOpened(false);
        
        }}
          key={index}
          className="hover:bg-mine-shaft-900 cursor-pointer"
          onClose={()=>unread(index)} 
          icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
          color="teal"
          title={noti.title || "Notification"}
        >
          {noti.message || "No message"}
        </Notification>
      ))
    ) : (
      <div className="text-gray-400 text-sm">No notifications</div>
    )}
  </div>
</Menu.Dropdown>
</Menu>
  
}
export default NotiMenu;