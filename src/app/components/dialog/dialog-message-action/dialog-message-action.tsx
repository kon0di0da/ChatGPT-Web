import Icon from '@ant-design/icons';
import styles from './dialog-message-action.module.scss';
import {Select} from 'antd'
import BreakIcon from "@/app/icons/break.svg";
import {userChatStore} from '@/app/store/modules/chat-store';
import {GptVersion} from '@/app/components/constants'
import {SessionConfig} from "@/app/types/chat";
import {useRef, useState} from "react";

const Action = (props: {
    icon: JSX.Element;
    onClick?: () => void;
}) => {
    return <div className={styles['chat-input-action']} onClick={props.onClick}>
        <div className={styles["icon"]}>
            {props.icon}
        </div>
    </div>
}
export default function DialogMessagesActions(props: {
    config: SessionConfig
}){
    const chatStore = userChatStore();
    const {config} = props
    return <div className={styles['chat-input-actions']}>
        <Action icon={<Icon component={BreakIcon} />}
                onClick={() => {
                    chatStore.updateCurrentSession((session) => {
                        if (session.clearContextIndex === session.messages.length) {
                            session.clearContextIndex = undefined;
                        } else {
                            session.clearContextIndex = session.messages.length;
                        }
                    });
        }}></Action>
        <Select
            value={config?.gptVersion??GptVersion.GPT_3_5_TURBO}
            style={{ width: 160 }}
            options={[
                { value: GptVersion.TEXT_DAVINCI_003, label: 'text-davinci-003' },
                { value: GptVersion.TEXT_DAVINCI_002, label: 'text-davinci-002' },
                { value: GptVersion.DAVINCI, label: 'davinci' },
                { value: GptVersion.GPT_3_5_TURBO, label: 'gpt-3.5-turbo' },
                { value: GptVersion.GPT_3_5_TURBO_16K, label: 'gpt-3.5-turbo-16k' },
                { value: GptVersion.GPT_4, label: 'gpt-4' },
                { value: GptVersion.GPT_4_32K, label: 'gpt-4-32k' },
            ]}
            onChange={(value) => {
                chatStore.updateCurrentSession((session) => {
                    session.config = {
                        ...session.config,
                        gptVersion: value
                    }
                });
            }}
        />
    </div>
}

export const ChatAction = (props:{
    text?: string;
    icon: JSX.Element;
    onClick: () => void;
})=>{
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState({
        full: 16,
        icon: 16,
    });
    const updateWidth = () => {
        if(!iconRef.current || !textRef.current) return;
        const getWidth = (dom: HTMLDivElement) => dom.getBoundingClientRect().width;
        const iconWidth = getWidth(iconRef.current);
        const textWidth = getWidth(textRef.current);
        setWidth({
            full: textWidth + iconWidth,
            icon: iconWidth,
        });

    }

    return (
        <div className={`${styles["chat-input-action"]} clickable`}
             onClick={() => {
                 props.onClick();
                 setTimeout(updateWidth, 1);
             }}
             onMouseEnter={updateWidth}
             onTouchStart={updateWidth}
             style={
                 {
                     "--icon-width": `${width.icon}px`,
                     "--full-width": `${width.full}px`,
                 } as React.CSSProperties
             }>
            <div ref={iconRef} className={styles["icon"]}>
                {props.icon}
            </div>
            <div className={styles["text"]} ref={textRef}>
                {props.text}
            </div>
        </div>
    )
}