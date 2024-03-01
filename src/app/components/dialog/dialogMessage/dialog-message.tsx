import styles from './dialog-message.module.scss'
import {Avatar, Input, Space} from "antd";
import {Message, MessageDirection, MessageRole, MessageType} from "@/app/types/chat";
import classNames from 'classnames'
import DialogMessageItem from "@/app/components/dialog/dialog-message-item/dialog-message-item";
import {useLocation, useParams} from "react-router";
import {useEffect, useRef, useState} from 'react';
import { Layout, Flex } from 'antd';
import DialogMessageInput from "@/app/components/dialog/dialog-message-input/dialog-message-input";
import {createNewMessage, userChatStore} from "@/app/store/modules/chat-store";


interface Props {
    // id: string,
    // title: string
    avatar?: string,
}

function ClearContextDivider() {
    const chatStore = userChatStore();

    return (
        <div
            className={styles["clear-context"]}
            onClick={() =>
                chatStore.updateCurrentSession(
                    (session) => (session.clearContextIndex = undefined),
                )
            }
        >
            <div className={styles["clear-context-tips"]}>上下文已清除</div>
        </div>
    );
}

function DialogMessage(){
    // const history = useHistory();

    const id = useParams();
    const location = useLocation();
    const title = location.state?.title||"新的对话" ;
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    // alert(title)
    // alert(location.state.dialog.dialogId)
    // const [messages, setMessages] = useState<Message[]>([])
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        console.log(messagesEndRef.current)

        // @ts-ignore
        messagesEndRef!.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [currentSession.messages]);
    // const fetchDetail = async () => {
    //     const session = await chatStore.currentSession();
    //     const messages = session?.messages;
    //     setMessages(messages);
    // }
    const onEnter = async (value:string)=>{
        const newMessage: Message = createNewMessage(value, MessageRole.user)
        await chatStore.onSendMessage(newMessage)
    }
    const clearContextIndex =
        (currentSession.clearContextIndex?? -1) >=0?currentSession.clearContextIndex!:-1;
    // useEffect(() => {
    //     fetchDetail().then(r => {
    //     });
    // }, []);
    return (
        // <Layout style={layoutStyle}>
        //     <Header style={headerStyle} >
        //         <Avatar shape="square" src={location.state.avatar} size={40}></Avatar>
        //         {title}</Header>
        //     <Content style={contentStyle} className={styles.scroll}>
        //
        //         {messages?.map(
        //             (message, index) => <DialogMessageItem message={message} key={index}/>)
        //         }
        //         <div ref={messagesEndRef}/>
        //     </Content>
        //     <Footer style={footerStyle}><DialogMessageInput onEnter={onEnter}/></Footer>
        // </Layout>

        <div className={styles.wrapper}>
            <div className={styles.header}>{title}</div>
            <div className={styles.scroll}>

                {currentSession.messages?.map(
                    (message, index) =>
                    {
                        const shouldShowClearContextDivider = index === clearContextIndex - 1;

                        return <><DialogMessageItem message={message} key={index}/>
                            {shouldShowClearContextDivider && <ClearContextDivider/>}
                        </>
                    })
                }
                <div ref={messagesEndRef}/>

            </div>
            <DialogMessageInput onEnter={onEnter}/>

        </div>


    )
}

export default DialogMessage;

