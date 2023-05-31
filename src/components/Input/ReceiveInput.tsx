import { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { KeyboardArrowDown } from '@mui/icons-material';
import { TokenChooseModal } from '../Modal/TokenChoose';
import { SwapInputProps } from 'src/config/constant';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

export const ReceiveInput = (props: SwapInputProps) => {
  const { primaryText, secondaryText, state, setState, type, token, setToken, disableToken } = props;

  const [isOpen, setOpen] = useState(false);

  const stakeRef = useRef<HTMLInputElement>(null);

  const handleChangeStakeAmount = (e: any) => {
    const value = e.target.value;
    setState(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SwapInputContainer>
      <SwapInputTitle>
        <SwapInputText>{primaryText}</SwapInputText>
        <SwapInputText>{secondaryText}</SwapInputText>
      </SwapInputTitle>
      <SwapInputArea>
        <SwapInputWrapper>
          <SwapInputField
            value={state}
            onChange={handleChangeStakeAmount}
            type={type !== undefined ? type : 'text'}
            ref={stakeRef}
          />
        </SwapInputWrapper>
        <SwapInputMark>
          <ChooseTokenButton
            onClick={handleClickOpen}
            startIcon={
              token !== undefined &&
              (token.logo === undefined ? (
                <Jazzicon diameter={30} seed={jsNumberForAddress(token.address)} />
              ) : (
                <Img src={token.logo} alt="token-logo" />
              ))
            }
            endIcon={<KeyboardArrowDown />}
          >
            <span className="tokenName">{token === undefined ? 'Select token' : token.unit}</span>
          </ChooseTokenButton>
        </SwapInputMark>
      </SwapInputArea>
      <TokenChooseModal
        isOpen={isOpen}
        onClose={handleClose}
        token={token}
        setToken={setToken}
        disableToken={disableToken}
      />
    </SwapInputContainer>
  );
};

const SwapInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  cursor: 'pointer',
  width: '100%'
}));

const SwapInputTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const SwapInputText = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '16px',
  color: '#A5A5A5'
}));

const SwapInputArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '50px'
}));

const SwapInputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  borderRadius: '6px 0 0 6px',
  border: '1px solid #1D1E1F',
  padding: '13px 16px',
  [theme.breakpoints.down(480)]: {
    padding: '3px 10px'
  }
}));

const SwapInputField = styled('input')(({ theme }) => ({
  width: '80%',
  height: '100%',
  outline: 'none',
  textDecoration: 'none',
  color: '#FFFFFF',
  fontSize: '18px',
  fontWieght: '500',
  backgroundColor: 'transparent',
  border: 'none'
}));

const MaxButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0D0D0D',
  borderRadius: '4px',
  color: 'rgba(255, 255, 255, 0.92)',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '500',
  '&:hover': {
    color: '#00EB88'
  },
  [theme.breakpoints.down(540)]: {
    minWidth: 'inherit'
  }
}));

const SwapInputMark = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  height: '100%',
  border: '1px solid #1D1E1F',
  borderRadius: '0px 6px 6px 0px',
  padding: '5px 7px'
}));

const ChooseTokenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#222630',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#222630'
  },
  '& .tokenName': {
    [theme.breakpoints.down(450)]: {
      display: 'none'
    }
  },
  '& .MuiButton-startIcon': {
    marginLeft: '0px',
    [theme.breakpoints.down(450)]: {
      marginRight: '0px'
    }
  }
}));

const Img = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px'
}));
