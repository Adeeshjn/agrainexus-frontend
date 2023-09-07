import React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldComponentProps {
    id: string;
    label: string;
    name: string;
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    required: boolean,
    placeholder: string,
    error?: boolean;
    helperText?: string;
}

const TextInputField: React.FC<TextFieldComponentProps> = (props) => {
    const {
        id,
        placeholder,
        label,
        name,
        defaultValue,
        onChange,
        type,
        required,
        error,
        helperText,
    } = props;

    return (
        <TextField
            id={id}
            placeholder={placeholder}
            label={label}
            variant='outlined'
            size='small'
            name={name}
            defaultValue={defaultValue}
            fullWidth
            type={type}
            onChange={onChange}
            required={required}
            error={error}
            helperText={helperText}
        />
    );
};


export default TextInputField;
