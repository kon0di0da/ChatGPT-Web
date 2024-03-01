import {Avatar, List, Badge, Space} from 'antd';
import styles from './dialog-item.module.scss';
import { Dialog } from '@/app/types/chat';
import dayjs from "dayjs";
import {ChatSession} from "@/app/store/modules/chat-store";
import DeleteIcon from "@/app/icons/delete.svg";
import classNames    from "classnames";

export interface Props {
    session: ChatSession;
    onClickDelete: () => void;
    selected: boolean;
    onClick: () => void;
}


/**
 * 对话框列表对象元素
 * @constructor
 */
export  const DialogItem = (props: Props) => {
    const {session, selected} = props;
    const dialog = session.dialog;
    const date = new Date(dialog.timestamp);
    const timeString = dayjs(dialog.timestamp).format('HH:mm');
    return (
        <List.Item
            className={classNames(styles.wrapper, selected ? styles.selected : '')}
            onClick={() => props.onClick()}
        >

            <List.Item.Meta
                avatar={
                    <Badge count={props.selected ? dialog.count : 0} size={"small"} color={"#fca7a7"}>
                        <Avatar shape={"square"} src={dialog.avatar} size={40}/>
                    </Badge>
                }
                title={dialog.title}
                description={dialog.subTitle}
            />

            <div>{timeString}</div>
            <div className={styles["chat-item-delete"]} onClickCapture={props.onClickDelete}>
                <DeleteIcon/>
            </div>
        </List.Item>
    );

}

