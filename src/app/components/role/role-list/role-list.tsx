import styles from './role-list.module.scss'
import {Role} from "@/app/types/role";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialogResizableBar";
import {DialogHead} from "@/app/components/dialog/dialog-head/dialog-head";
import {Avatar} from "antd";

export interface RoleContextType {
    roles: Role[]
    selected: number;
    setSelected: (id: number) => void;
}

export const RoleContext = React.createContext<RoleContextType>({
    roles: [],
    selected: -1,
    setSelected: (id: number) => {
    }
})

export function RoleList() {
    const navigate = useNavigate();
    const {roles, selected, setSelected} = useContext(RoleContext);
    return (
        <DialogResizeableSidebar>
            <DialogHead/>
        <div className={styles["role-list"]}>
            {roles?.map((role) => (
                <div
                    className={`${styles["role-item"]} ${selected == role.id ? styles['selected'] : ''}`}
                    key={role.id}
                    onClick={() => {
                        setSelected(role.id)
                        navigate(`/role/${role.id}`);
                    }}>
                    <Avatar shape="square" size={38} src={role.avatar}/>

                    <div className={styles["name"]}>{role.role_name}</div>
                </div>
            ))}
        </div>

        </DialogResizeableSidebar>
    );
}