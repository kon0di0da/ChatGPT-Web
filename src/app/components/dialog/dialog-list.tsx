import styles from './dialog-list.module.scss';
import { DialogItem } from "@/app/components/dialog/dialog-item";
import { DialogType } from "@/app/types/chat";
import { DialogResizeableSidebar } from "@/app/components/dialog/dialogResizableBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useEffect, useState} from "react";
import {Input, List, Skeleton,Divider} from "antd";
const {Search} = Input;
import axios from "axios";
import {useDispatch} from "react-redux";
// 测试数据
const dialog01: DialogType = {
    avatar: '/role/bugstack.png',
    dialogId: 123,
    read: true,
    subTitle: '写个java冒泡排序?',
    timestamp: Date.now(),
    title: '普通对话',
    count: 1
};
// 测试数据
const dialog02: DialogType = {
    avatar: '/role/interview.png',
    dialogId: 124,
    read: true,
    subTitle: 'Hello, how are you?',
    timestamp: Date.now(),
    title: '面试官',
    count: 5
};
const dialog03: DialogType = {
    avatar: '/role/psychological.png',
    dialogId: 125,
    read: true,
    subTitle: '吹灭别人的灯，不能照亮自己',
    timestamp: Date.now(),
    title: '心里咨询',
    count: 100
};
export function DialogList() {

    const [dialogs, setDialogs] = useState<DialogType[]>([dialog03,dialog01,dialog02]);
    const [selected, setSelected] = useState<DialogType>();
    const [loading, setLoading] = useState(false);
    const [showdialog, setShowDialog] = useState<DialogType[]>([dialog03]);


    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        const res = await axios.get("http://localhost:3006/chatList");
        setShowDialog([...showdialog, ...res.data]);
        setLoading(false);
    };
    useEffect(() => {
        loadMoreData();
    }, []);
    //定义搜索按钮
    const enterButton =()=>{
        return (
            <button className={styles["dialog-search-add"]} onClick={()=>{alert("创建对话")
                setSelected(dialog03)
            }}></button>
        )
    }


    // dialogs.unshift(dialog03);
    // // 设置选中，这样也会刷新数据
    // dialogs.push(dialog01);
    // dialogs.push(dialog02);
    return(

        <DialogResizeableSidebar>
            <div className={styles["dialog-head"]}>
                <div className={styles["dialog-search-box"]}><input type="text" placeholder="搜索"/>
                </div>
                <div>{enterButton()}</div>
            </div>
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
                    <List
                        // className={styles["dialog-list"]}
                        itemLayout="horizontal"
                        dataSource={showdialog}
                        renderItem={item => (
                            <DialogItem dialog={item} selected={item === selected} onClick={setSelected} key={item.dialogId}/>
                        )}
                    />
                </InfiniteScroll>
            </div>


        </DialogResizeableSidebar>
)
}