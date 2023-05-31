import { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface KunjiInputProps {
  icon?: React.ReactNode;
  value: string;
  placeholder?: string;
  handleChange: (value: string) => void;
}

export const KunjiInput = (props: KunjiInputProps) => {
  const { icon, value, placeholder, handleChange } = props;
  const inputRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [isVisit, setVisit] = useState(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current != null && !inputRef.current.contains(event.target as any)) {
      setVisit(false);
    }
  };

  const handleClickInside = () => {
    setVisit(true);
    valueRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event as any));
  }, [inputRef]);

  return (
    <KunjiInputContainer ref={inputRef} visited={isVisit ? 1 : 0} onMouseUp={() => handleClickInside()}>
      {icon !== undefined && icon}
      <KunjiInputField
        visited={isVisit ? 1 : 0}
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e.currentTarget.value)}
        placeholder={placeholder}
      />
    </KunjiInputContainer>
  );
};

const KunjiInputContainer = styled(Box)<{ visited: number }>(({ theme, visited }) => ({
  width: '100%',
  height: '40px',
  backgroundColor: '#131418',
  borderRadius: '4px',
  padding: '9px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  border: visited === 1 ? '1px solid #00c9d0' : 'none'
}));

const KunjiInputField = styled('input')<{ visited: number }>(({ theme, visited }) => ({
  height: '100%',
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  color: visited === 1 ? '#FFFFFF' : '#B1B5C3',
  fontSize: '14px'
}));
