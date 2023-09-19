import { Typography } from 'antd';
import React, { useState } from 'react';
import { fetchPatch } from '../../api/fetch';
type EditableFieldProps = {
    text: string | number | null | undefined;
    url: string;
    id: number;
    dataIndex: string;
    onError?: () => void;
    strong?: boolean;
};

const EditableField = ({ text, url, id, dataIndex, strong }: EditableFieldProps) => {
    const [textField, setText] = useState(text);
    React.useEffect(() => {
        if (text == null) {
            return;
        }
        setText(text.toString());
    }, [text]);

    return (
        <Typography.Text
            strong={strong}
            editable={{
                text: textField?.toString(),
                onChange: async (value) => {
                    console.log('value', dataIndex);

                    setText(value);
                    fetchPatch(
                        url, id, { [dataIndex]: value }
                    ).then((res: any) => {
                        console.log('res', res);
                        if (res.isError) {
                            console.log(res);
                        }
                    });
                },
            }}
        >{textField?.toString()}
        </Typography.Text>
    );
};

export default EditableField;
