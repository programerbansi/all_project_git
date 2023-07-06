import Pusher from 'pusher-js'
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { PUSHER_KEY } from '../../../services/UserRoutePath';
import { UserValAuthContext } from '../Context/UserValContext';
const usePusher=()=>{
    const val=useContext(UserValAuthContext);
    const loggedInUser=getLoggedInUser();
    const [msgpusherData,setMsgPusherData]=useState();
    const [deleteMessagePusherData,setDeleteMessagePusherData]=useState();
    const [seenMsgPusherData,setSeenMsgPusherData]=useState();
    const [buyerPusherData,setBuyerPusherData]=useState();
    let loadedpusher = false;
    useEffect(() => {
        let channel
        if (!loadedpusher) {
            // Pusher.logToConsole = true;
            const pusher = new Pusher(PUSHER_KEY, {
                cluster: 'ap2',
                forceTLS: true,
                encrypted: true,
            });
             channel = pusher.subscribe('DENTALVIG');
            channel.bind('App\\Events\\MessageSent', (data) => {
                    setMsgPusherData(data);
            });
            channel.bind('App\\Events\\SeenMsg', (data) => {
                setSeenMsgPusherData(data)
               
            });
            channel.bind('App\\Events\\BuyerNotification', (data) => {
                setBuyerPusherData(data);
            });
            channel.bind('App\\Events\\ShowDeleteMessage', ({ message }) => {
                if (message?.data?.s_id !== loggedInUser?.id) {
                    setDeleteMessagePusherData(message);
                }
            });
    
        }
        return () => {
            loadedpusher = true;
                channel.unbind('App\\Events\\MessageSent');
                channel.unbind('App\\Events\\SeenMsg');
                channel.unbind('App\\Events\\BuyerNotification');
                channel.unbind('App\\Events\\ShowDeleteMessage');
               
        }
    }, [])
    return {msgpusherData,deleteMessagePusherData,seenMsgPusherData,buyerPusherData};
}
export default usePusher