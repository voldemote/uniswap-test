import { ConnectButton } from '@rainbow-me/rainbowkit';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';
import { IoWarningOutline } from 'react-icons/io5';
import { AccountBalanceWallet } from '@mui/icons-material';

export const SwapButton = (props: { onClick?: () => void }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const isReady = mounted && authenticationStatus !== 'loading';
        const hasConnected =
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          isReady &&
          account != null &&
          chain != null &&
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!isReady && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
          >
            {(() => {
              if (!hasConnected) {
                return (
                  <KunjiWalletConnectButton onClick={openConnectModal} type="button" status="connect">
                    <ConnectButtonIcon>
                      <AccountBalanceWallet sx={{ width: '24px', height: '24px' }} />
                    </ConnectButtonIcon>
                    <span>Connect Wallet</span>
                  </KunjiWalletConnectButton>
                );
              }
              if (chain.unsupported ?? false) {
                return (
                  <KunjiWalletConnectButton onClick={openChainModal} type="button" status="wrong">
                    <ConnectButtonIcon>
                      <IoWarningOutline style={{ width: '24px', height: '24px' }} />
                    </ConnectButtonIcon>
                    <span>Wrong Network</span>
                  </KunjiWalletConnectButton>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <KunjiWalletConnectButton
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    status="connected"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4
                        }}
                      >
                        {chain.iconUrl != null && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 24, height: 24 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </KunjiWalletConnectButton> */}
                  <KunjiWalletConnectButton onClick={props.onClick} type="button" status="connected">
                    <span>Swap</span>
                  </KunjiWalletConnectButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const KunjiWalletConnectButton = styled(Button)<{ status: string }>(({ theme, status }) => ({
  borderRadius: '6px',
  padding: '6px 11px',
  color: '#000000',
  backgroundColor: status === 'wrong' ? '#F55050' : '#00EB88',
  lineHeight: '24px',
  textTransform: 'none',
  fontSize: '16px',
  width: '100%',
  height: '48px',
  '&:hover': {
    backgroundColor: status === 'wrong' ? '#F55050' : '#00EB88'
  }
}));

const ConnectButtonIcon = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down(450)]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
