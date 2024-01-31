import {PropsWithChildren, ReactNode} from "react";
import { Resizable } from "re-resizable";
// interface Props {
//     minWidth?: number;
//     children: React.ReactNode;
// }
interface Props {
    children: ReactNode;
}
export function DialogResizeableSidebar(props:Props) {
    const {children} = props;
    return (
        <Resizable
            minWidth={220}
            maxWidth={320}
            defaultSize={{
                width: 260,
                height: "100%",
            }}
            style={{
                borderRight: '1px solid #f5f5f5'
            }}
        >
            {children}
        </Resizable>
    );
}