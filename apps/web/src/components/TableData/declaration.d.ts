import { BaseButtonProps } from "antd/es/button/button";

declare namespace TableData {
    type Button = {
        title: string;
        type: BaseButtonProps['type'];
        danger: boolean;
        onClick: (id: Array<number> | number) => Promise<void>
    }
    type 
}