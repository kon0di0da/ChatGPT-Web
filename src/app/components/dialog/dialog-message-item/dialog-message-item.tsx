import {Message, MessageDirection, MessageRole} from "@/app/types/chat";
import {RefObject} from "react";
import styles from './dialog-message-item.module.scss'
import {Markdown} from "@/app/components/markdown/markdown";
import {Avatar} from "antd";


interface Props {
    message: Message;
    parentRef?: RefObject<HTMLDivElement>;
}

/**
 * 对话面板消息元素
 * @constructor
 */
export function DialogMessageItem(props: Props) {
    const {message,parentRef} = props;
    const isReceive = message.direction === MessageDirection.Receive;
    const isUser = message.role === MessageRole.user;

    return (
        <>
            <div
                className={isUser?styles["chat-message-user"] : styles["chat-message"]}
            >
            <div className={styles["chat-message-container"]}>
                <div className={styles["chat-message-avatar"]}>
                    <Avatar shape="square" src={message.avatar} size={40} style={{
                        borderRadius: '4px',
                        backgroundColor: '#f6f6f6'
                    }}/>
                </div>
                <div className={styles["chat-message-item"]}>
                    <Markdown content={message.content} fontSize={14} defaultShow={false} parentRef={parentRef}/>
                </div>
            </div>

            </div>

        </>


        // <Space className={classNames(styles.messageWrapper, isReceive ? styles.receive : styles.send)}>
        //     <div
        //         style={{
        //             display: 'flex',
        //             flexDirection: 'row',
        //             backgroundColor: isReceive ? '#acced9' : '#24f862',
        //             borderRadius: '10px',
        //         }}
        //     >
        //         {isReceive ?
        //             <>
        //                 <Avatar shape="square" src={message.avatar} size={40} style={{
        //                     borderRadius: '4px',
        //                     backgroundColor: '#f6f6f6'
        //                 }}/>
        //                 <p className={styles.message}>{message.message}</p>
        //             </> :
        //             <>
        //                 <p className={styles.message}>{message.message}</p>
        //                 <Avatar shape="square" src={message.avatar} size={40} style={{
        //                     borderRadius: '4px',
        //                     backgroundColor: '#f6f6f6'
        //                 }}/>
        //             </>
        //         }
        //     </div>
        // </Space>





    );
}
export default DialogMessageItem;