import { Menu, Text, Avatar, Switch, rem, useMantineTheme } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconFileText,
  IconMessageCircle,
  IconMoonStars,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUserCircle,
  IconSun,
  IconLogout2
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const user =useSelector((state:any)=>state.user);
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleLogout=()=>{
    dispatch(removeUser());
  }
  const profile=useSelector((state:any)=>state.profile);

  return (
    <Menu shadow="md" width={220} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <div>{user?.data?.name}</div>
          <Avatar src={
    profile?.picture
      ? `data:image/png;base64,${profile.picture}`
      : "/Avatar.png"
  } alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to="/profile">

        <Menu.Item leftSection={<IconUserCircle size={14} />}>
          Profile
        </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMoonStars size={14} />}
          rightSection={
            <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}

              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
              }
              offLabel={
                <IconMoonStars
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                  color={theme.colors.blue[6]}
                />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        

        <Menu.Item onClick={handleLogout} c="red" leftSection={<IconLogout2 size={14} />}>
          Logout
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
