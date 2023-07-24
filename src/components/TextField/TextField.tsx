import React from 'react';

import styles from './TextField.module.scss';

interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({ onChange, value, type }) => {
  return <input className={styles.field} type={type} value={value} onChange={onChange} />;
};

export default TextField;
