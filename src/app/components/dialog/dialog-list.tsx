import styles from './dialog-list.module.scss';
import { DialogItem } from "@/app/components/dialog/dialog-item";
import { Dialog } from "@/app/types/chat";
import { DialogHead } from "@/app/components/dialog/dialog-head/dialog-head";
import { DialogResizeableSidebar } from "@/app/components/dialog/dialogResizableBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect, useState} from "react";
import {Input, List, Skeleton,Divider} from "antd";
// const {Search} = Input;
import axios from "axios";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {userChatStore} from "@/app/store/modules/chat-store";
// 测试数据
const dialog01: Dialog = {
    avatar: '/role/bugstack.png',
    // dialogId: 123,
    // read: true,
    subTitle: '写个java冒泡排序?',
    timestamp: Date.now(),
    title: '普通对话',
    count: 1
};
// 测试数据
const dialog02: Dialog = {
    avatar: '/role/interview.png',
    // dialogId: 124,
    // read: true,
    subTitle: 'Hello, how are you?',
    timestamp: Date.now(),
    title: '面试官',
    count: 5
};
const dialog03: Dialog = {
    avatar: '/role/psychological.png',
    // dialogId: 125,
    // read: true,
    subTitle: '吹灭别人的灯，不能照亮自己',
    timestamp: Date.now(),
    title: '心里咨询',
    count: 100
};



export function DialogList() {

    // const [dialogs, setDialogs] = useState<Dialog[]>([dialog03,dialog01,dialog02]);
    // const [selected, setSelected] = useState<Dialog>();
    const [loading, setLoading] = useState(false);
    const [showdialog, setShowDialog] = useState<Dialog[]>([dialog03]);
    const navigate = useNavigate();


    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        // const res = await axios.get("http://localhost:3006/chatList");
        const res = await fetch(`/chatList.json`).then((res) => res.json());

        setShowDialog([...showdialog, ...res?.chatList]);
        setLoading(false);
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    const chatStore = userChatStore();
    const [sessions, currentSessionIndex, selectSession] = userChatStore(
        (state) => [
            state.sessions,
            state.currentSessionIndex,
            state.selectSession]);
    


    // dialogs.unshift(dialog03);
    // // 设置选中，这样也会刷新数据
    // dialogs.push(dialog01);
    // dialogs.push(dialog02);
    return(

        <DialogResizeableSidebar>
            <DialogHead />
            {/*对话列表*/}
            <div
                id="scrollableDiv"
                style={{
                    height: 'calc(100vh - 64px - 48px - 48px - 16px - 16px - 16px - 16px)',
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                {/*滚动卷轴*/}
                <InfiniteScroll
                    dataLength={showdialog.length}
                    // dataLength={5}
                    next={loadMoreData}
                    hasMore={showdialog.length < 5}
                    loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className={styles["dialog-list"]}>
                        <List
                            dataSource={sessions}
                            renderItem ={(session,index) => (
                                <DialogItem
                                    key={session.id}
                                    session={session}
                                    selected={currentSessionIndex === index}
                                    onClick={() => {
                                        // 点击时跳转到对应的界面，并传递必要参数信息
                                        selectSession(index);
                                        navigate(`/chat/${session.id}`, {state: {title: session.dialog.title}})
                                    }}
                                    onClickDelete={() => {
                                        chatStore.deleteSession(index);
                                    }}
                                />
                            )}
                        ></List>

                    </div>
                </InfiniteScroll>
            </div>


        </DialogResizeableSidebar>
)
}