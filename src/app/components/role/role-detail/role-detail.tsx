import {useParams} from "react-router";
import {useContext, useMemo} from "react";
import {RoleContext} from "@/app/components/role/role-list/role-list";
import {createNewMessage, userChatStore} from "@/app/store/modules/chat-store";
import {useNavigate} from "react-router-dom";
import styles from "./role-detail.module.scss";
import {Avatar, Button, Tag} from "antd";
import {MessageRole} from "@/app/types/chat";


interface Props {
    id: number;
    title: string;
}

export default function RoleDetail() : JSX.Element{
    const {id} = useParams<{ id: any }>()
    const {roles} = useContext(RoleContext);
    const chatStore = userChatStore();
    const navigate = useNavigate();
    const [sessions, currentSessionIndex] = userChatStore(
        (state) => [state.sessions, state.currentSessionIndex, state.selectSession]
    );
    const role = useMemo(()=>{
        return roles.find((role) => role.id == id);
    },[id,roles])

    const start = () => {
        let session = chatStore.openSession({
            title: role?.role_name,
            avatar: role?.avatar
        });
        // chatStore.selectSession(session.id)
        setTimeout(() => {
            const newMessage = chatStore.onSendMessage(createNewMessage(role?.description||'',MessageRole.user))
            // 点击时跳转到对应的界面，并传递必要参数信息
            navigate(`/chat/${session.id}`, {state: {title: session.dialog.title,avatar:role?.avatar}});
        }, 0)

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>{role?.role_name}</div>
            <div className={styles.scroll}>
                <Avatar shape="square" size={64} src={role?.avatar}/>
                <p className={styles.desc}>
                    <Tag bordered={false} color="processing">
                        角色介绍
                    </Tag>
                    {role?.description}
                </p>
                <Button type="primary" className={styles['btn']} onClick={() => start()}>开始对话</Button>
            </div>
        </div>
    )

}