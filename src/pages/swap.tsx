import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { SwapInput } from 'src/components/Input/SwapInput';
import { CurrencyExchange } from '@mui/icons-material';
import { SwapButton } from 'src/components/Button/SwapButton';
import { basicTokenProps } from 'src/config/constant';
import { ReceiveInput } from 'src/components/Input/ReceiveInput';
import { useAccount } from 'wagmi';
import { getEthBalance } from 'src/contracts';

export const Swap = () => {
  const [fromToken, setFromToken] = useState<basicTokenProps>();
  const [fromValue, setFromValue] = useState(0);
  const [toToken, setToToken] = useState<basicTokenProps>();
  const [toValue, setToValue] = useState(0);
  const [ether, setEther] = useState(0);

  const handleCurrecyChange = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromValue(0);
    setToValue(0);
  };

  const { address } = useAccount();

  const getEther = async () => {
    if (address !== undefined) {
      const eth_balance = await getEthBalance(address);
      setEther(eth_balance ?? 0);
    }
  };

  useEffect(() => {
    getEther();
  }, [fromToken]);

  return (
    <SwapContainer>
      <SwapDialogContainer>
        <SwapDialogHeader>
          <SwapDialogHeaderTitle>Swap</SwapDialogHeaderTitle>
        </SwapDialogHeader>
        <SwapDialogContent>
          <SwapInput
            primaryText={`${fromToken?.unit === undefined ? 'Token' : fromToken?.unit} amount`}
            secondaryText={`Balance: ${
              fromToken?.unit !== undefined
                ? `${fromToken.unit === 'ETH' ? ether : fromToken?.value} ${fromToken?.unit}`
                : ``
            }`}
            state={fromValue}
            setState={setFromValue}
            type="number"
            token={fromToken}
            setToken={setFromToken}
            disableToken={toToken}
          />
          <SwapCoinButtonContainer>
            <SwapCoinButton onClick={handleCurrecyChange}>
              <CurrencyExchange />
            </SwapCoinButton>
          </SwapCoinButtonContainer>
          <ReceiveInput
            primaryText={`You will receive`}
            secondaryText={`Balance:`}
            state={toValue}
            setState={setToValue}
            type="number"
            token={toToken}
            setToken={setToToken}
            disableToken={fromToken}
          />
        </SwapDialogContent>
        <SwapAction>
          <SwapButton />
        </SwapAction>
      </SwapDialogContainer>
    </SwapContainer>
  );
};

const SwapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'calc(100vh - 70px)'
}));

const SwapDialogContainer = styled(Box)(({ theme }) => ({
  width: '640px',
  backgroundColor: '#131418',
  borderRadius: '8px',
  [theme.breakpoints.down(840)]: {
    width: '100%'
  }
}));

const SwapDialogHeader = styled(Box)(({ theme }) => ({
  padding: '24px 36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #1D1E1F',
  [theme.breakpoints.down(540)]: {
    padding: '18px'
  }
}));

const SwapDialogHeaderTitle = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '28px',
  fontWeight: '600',
  [theme.breakpoints.down(540)]: {
    fontSize: '17px'
  }
}));

const SwapDialogContent = styled(Box)(({ theme }) => ({
  padding: '24px 36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}));

const SwapCoinButtonContainer = styled(Box)(({ theme }) => ({
  padding: '12px',
  display: 'flex',
  justifyContent: 'center'
}));

const SwapCoinButton = styled(IconButton)(({ theme }) => ({
  width: '50px',
  height: '50px',
  backgroundColor: '#00D085',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#00D085'
  }
}));

const SwapAction = styled(Box)(({ theme }) => ({
  padding: '24px 36px'
}));
