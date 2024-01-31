"use client";

import styles from "./home.module.scss";
import {SideBar} from "./sidebar";

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import dynamic from "next/dynamic";
import {Path} from "./constants";
// import {useSelector} from "react-redux";
import { FloatButton } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {useState} from "react";
const Chat = dynamic(async () => (await import("./chat/chat")).Chat);
const Role = dynamic(async () => (await import("./role/role")).Role);

function Screen() {
    const [tightBorder, setTightBorder] = useState(false);
    return (
        <div className={!tightBorder?styles.container:styles["tight-container"]}>
            {/* 工具菜单 */}
            <SideBar/>

            {/* 路由地址 */}
            <div className={styles["window-content"]}>
                <Routes>
                    <Route path={Path.Home} element={<Chat/>}/>
                    <Route path={Path.Chat} element={<Chat/>}/>
                    <Route path={Path.Role} element={<Role/>}/>
                </Routes>
            </div>
            {tightBorder===false?<FloatButton onClick={() => setTightBorder(!tightBorder)}
                         tooltip={<div>Zoom In</div>}
                         icon = <FullscreenOutlined/>/>:
            <FloatButton onClick={() => setTightBorder(!tightBorder)}
                         tooltip={<div>Zoom Out</div>}
                         icon = <FullscreenExitOutlined/>/>}
        </div>
    );
}

export function Home() {
    return (
        <Router>
            <Screen/>
        </Router>
    );
}