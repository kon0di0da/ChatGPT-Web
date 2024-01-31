import {Avatar, List, Badge, Space} from 'antd';
import styles from './dialog-item.module.scss';
import { DialogType } from '@/app/types/chat';
import dayjs from "dayjs";

export interface Props {
    dialog: DialogType;
    selected: boolean;
    onClick: (dialog: DialogType) => void;
}


/**
 * 对话框列表对象元素
 * @constructor
 */
export  const DialogItem = (props: Props) => {
    const { dialog, selected, onClick } = props;
    const date = new Date(dialog.timestamp);
    const timeString = dayjs(dialog.timestamp).format('HH:mm');
    return (
        <List.Item
            className={`${styles.wrapper} ${selected ? styles.selected : ''}`}
            onClick={() => onClick(dialog)}
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

            <div >{timeString}</div>
        </List.Item>
    );

}

