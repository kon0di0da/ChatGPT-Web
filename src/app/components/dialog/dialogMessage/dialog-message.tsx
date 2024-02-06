import styles from './dialog-message.module.scss'
import {Avatar, Input, Space} from "antd";
import {Message, MessageDirection, MessageRole, MessageType} from "@/app/types/chat";
import classNames from 'classnames'
import DialogMessageItem from "@/app/components/dialog/dialog-message-item/dialog-message-item";
import {useLocation, useParams} from "react-router";
import {useEffect, useRef, useState} from 'react';
import { Layout, Flex } from 'antd';
import DialogMessageInput from "@/app/components/dialog/dialog-message-input/dialog-message-input";
import {userChatStore} from "@/app/store/modules/chat-store";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'left',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#ACA5A5FF',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#071e2c',
    backgroundColor: '#f8eeee',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(95% - 8px)',
    maxWidth: 'calc(95% - 8px)',
};
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
    const title = location.state?.title ;
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();
    // alert(title)
    // alert(location.state.dialog.dialogId)
    const [messages, setMessages] = useState<Message[]>([])
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        console.log(messagesEndRef.current)

        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    const fetchDetail = async () => {
        const session = await chatStore.currentSession();
        const messages = session?.messages;

        // const message01: Message = {
        //     avatar: "/role/psychological.png",
        //     content: "吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己",
        //     message_type: MessageType.Text,
        //     time: Date.now(),
        //     direction: MessageDirection.Receive,
        //     role: MessageRole.system
        // }
        //
        // const message02: Message = {
        //     avatar: "/role/runny-nose.png",
        //     content: "大师我悟了！大师你是我亲爹，能不能v我50花一下。欧内该。。。",
        //     message_type: MessageType.Text,
        //     time: Date.now(),
        //     direction: MessageDirection.Send,
        //     role: MessageRole.user
        // }

        setMessages(messages);
    }
    const onEnter = (value:string)=>{
        setMessages([...messages,{
            avatar: "/role/runny-nose.png",
            content: value,
            message_type: MessageType.Text,
            time: Date.now(),
            direction: MessageDirection.Send,
            role: MessageRole.user
        }])
        chatStore.onSendMessage({
            avatar: "/role/runny-nose.png",
            content: value,
            message_type: MessageType.Text,
            time: Date.now(),
            direction: MessageDirection.Send,
            role: MessageRole.user
        })
    }
    const clearContextIndex =
        (currentSession.clearContextIndex?? -1) >=0?currentSession.clearContextIndex!:-1;
    useEffect(() => {
        fetchDetail().then(r => {
        });
    }, [id]);
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

                {messages?.map(
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

