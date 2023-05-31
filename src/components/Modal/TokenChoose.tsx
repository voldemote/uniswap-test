/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Modal } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { KunjiInput } from '../Input';
import { EthLogo, USDCLogoSvg, DAILogo, WETHLogo } from 'src/config/images';
import { basicTokenProps } from 'src/config/constant';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { isValidAddress } from 'src/utils/isValidAddress';
import { getEthBalance, getTokenBalance, getTokenDetail } from 'src/contracts';
import { useAccount } from 'wagmi';
import { useWeb3Store } from 'src/context/Web3Context';

const basicTokenArray: basicTokenProps[] = [
  {
    id: 1,
    name: 'Ether',
    unit: 'ETH',
    logo: EthLogo,
    address: '',
    value: '0'
  },
  {
    id: 2,
    name: 'Dai Stablecoin',
    unit: 'DAI',
    logo: DAILogo,
    address: '',
    value: '0'
  },
  {
    id: 3,
    name: 'Test USDC',
    unit: 'USDC',
    logo: USDCLogoSvg,
    address: '',
    value: '0'
  },
  {
    id: 4,
    name: 'Wrapped Ether',
    unit: 'WETH',
    logo: WETHLogo,
    address: '',
    value: '0'
  }
];

interface TokenChooseModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: basicTokenProps | undefined;
  setToken: (value: basicTokenProps) => void;
  disableToken: basicTokenProps | undefined;
}

export const TokenChooseModal = (props: TokenChooseModalProps) => {
  const { isOpen, onClose, token, setToken, disableToken } = props;

  const [tokenAddy, setTokenAddy] = useState('');
  const [tokens, setTokens] = useState<basicTokenProps[] | undefined>(basicTokenArray);
  const { address } = useAccount();
  const [isLoad, setLoad] = useState(false);

  const handleTokenItemClick = async (item: basicTokenProps) => {
    setToken(item);
    onClose();
    setTokenAddy('');
    setTokens(basicTokenArray);
  };

  const handleTokenChange = async (val: string) => {
    setTokenAddy(val);
    if (isValidAddress(val) && address !== undefined) {
      setLoad(true);
      try {
        const token = await getTokenDetail(val);
        const balance = await getTokenBalance(val, address);
        if (token?.tokenName !== undefined && balance !== undefined) {
          const newToken = [
            {
              id: 0,
              name: token.tokenName as string,
              unit: token.tokenSymbol as string,
              logo: undefined,
              address: val,
              value: balance.toString()
            }
          ];
          setTokens(newToken);
        }
        setLoad(false);
      } catch (err) {
        console.log(err);
        setLoad(false);
      }
    } else {
      setTokens(basicTokenArray);
    }
  };

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={onClose}
      disableEnforceFocus
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <ModalContainer>
        <ModalHeader>
          <ModalHeaderTitle>
            <div>Select a token</div>
            <div>
              <Close sx={{ cursor: 'pointer' }} onClick={onClose} />
            </div>
          </ModalHeaderTitle>
          <KunjiInput
            icon={<Search />}
            value={tokenAddy}
            placeholder="Search name or paste address"
            handleChange={async (val: string) => await handleTokenChange(val)}
          />
          <TokenDetails>
            {isLoad
              ? 'Loading...'
              : tokens === undefined
              ? ''
              : tokens?.map((item) => (
                  <TokenDetail
                    token={item}
                    key={item.id}
                    isSelected={token === item}
                    isDisabled={disableToken === item}
                    onClick={async () => await handleTokenItemClick(item)}
                  />
                ))}
          </TokenDetails>
        </ModalHeader>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '480px',
  backgroundColor: '#222630',
  boxShadow: '24px',
  borderRadius: '12px',
  overflow: 'auto',
  zIndex: 1,
  [theme.breakpoints.down(540)]: {
    width: '100%'
  }
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '20px'
}));

const ModalHeaderTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '16px',
  fontWeight: '500'
}));

const TokenDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}));

interface TokenDetailProps {
  token: basicTokenProps;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const TokenDetail = (props: TokenDetailProps) => {
  const { token, isSelected, isDisabled, onClick } = props;
  const { address } = useAccount();
  const [ether, setEther] = useState(0);
  const { isConnected, isInitialized } = useWeb3Store();

  const getEther = async (userAddy: string) => {
    const eth_balance = await getEthBalance(userAddy);
    setEther(eth_balance ?? 0);
  };

  useEffect(() => {
    if (address !== undefined) {
      getEther(address);
    }
  }, [isConnected, isInitialized]);

  return (
    <TokenDetailContainer
      onClick={isDisabled ? undefined : onClick}
      selected={isSelected ? 1 : 0}
      disabled={isDisabled ? 1 : 0}
    >
      <TokenNameContainer>
        {token.logo === undefined ? (
          <Jazzicon diameter={30} seed={jsNumberForAddress(token.address)} />
        ) : (
          <TokenLogo src={token.logo} alt="token-logo" />
        )}
        <TokenNameWrapper>
          <TokenUnit>{token.unit}</TokenUnit>
          <TokenName>{token.name}</TokenName>
        </TokenNameWrapper>
      </TokenNameContainer>
      <TokenValue>{token.unit === 'ETH' ? ether : token.value}</TokenValue>
    </TokenDetailContainer>
  );
};

const TokenDetailContainer = styled(Box)<{ selected: number; disabled: number }>(({ theme, selected, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: disabled === 1 ? 'not-allowed' : 'pointer',
  opacity: selected === 1 ? '0.6' : '1'
}));

const TokenNameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
}));

const TokenLogo = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px'
}));

const TokenNameWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px'
}));

const TokenName = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  color: '#98A1C0',
  lineHeight: 'normal'
}));

const TokenUnit = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '600',
  color: '#FFFFFF',
  lineHeight: 'normal'
}));

const TokenValue = styled(Box)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '600',
  color: '#FFFFFF'
}));
