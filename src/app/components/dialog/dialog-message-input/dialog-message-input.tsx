import {useState} from "react";
// import TextArea from "antd/es/input/TextArea";
import styles from './dialog-message-input.module.scss';
import {Input, Button,Flex} from "antd";
import DialogMessagesActions from "@/app/components/dialog/dialog-message-action/dialog-message-action";
import {userChatStore} from "@/app/store/modules/chat-store";

interface Props {
    onEnter: (value: string) => void;

}

const DialogMessageInput = (props:Props) => {
    const {onEnter} = props;
    const [value, setValue] = useState<string>();
    const chatStore = userChatStore();
    const currentSession = chatStore.currentSession();

    const onSend= (value:any) => {
        // e.preventDefault();
        onEnter(value);
        // setValue(String);
        setValue(undefined)
    }
    const handleKeyDown = (e: any) => {
        if (e.ctrlKey && e.key === "Enter") {
            onSend(value);
        }
    }

    return (

        <div className={styles.wrapper}>
            <DialogMessagesActions config={currentSession.config}/>
                <Input.TextArea
                style={{width: '100%'}}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.textarea}
                placeholder={"请输入"}
                autoFocus
                onKeyDown={handleKeyDown}
                autoSize={{minRows: 2, maxRows: 6}}/>
            <Flex vertical gap="small" style={{ width: '10%' }}>
                <Button onClick={(e) => onSend(value)} type="primary" className={styles.btn} disabled={!value?.length}>发送</Button>
            </Flex>


        </div>
        // </Space>

    )

}
export default DialogMessageInput;