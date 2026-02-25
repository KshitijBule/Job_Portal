import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const successNotification = (title:string, message:string)=>{
  notifications.show({
          title: title,
          message: message,
          color: "green",
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          withCloseButton: true,
        });
}

const errorNotification=(title:string, message:string)=>{
  notifications.show({
          title: title,
          message: message,
          color: "red",
          icon:<IconX style={{width:"90%",height:"90%"}}/>,
          withCloseButton: true,
        });
}
export {successNotification,errorNotification};