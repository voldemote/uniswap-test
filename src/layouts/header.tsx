import { useState } from 'react';
import { Box, IconButton, ListItem, ListItemButton, ListItemText, Modal, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import { a11yProps } from 'src/components/TabPanel';
import { useStore } from '../context/StoreContext';
import { Close, Menu } from '@mui/icons-material';
import { ConnectWalletButton } from 'src/components/Button/ConnectWalletButton';
import { LOGO } from 'src/config/images';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { page, setPage } = useStore();
  const [isOpen, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
  };

  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <KunjiContainer>
          <KunjiLogoContainer>
            <MobileNavButton onClick={handleClickOpen} />
            <KunjiLogo alt="Kunji-name-logo" onClick={() => navigate('/')} />
            <MobileNavBar isOpen={isOpen} onClose={handleClose} />
          </KunjiLogoContainer>
          <TabContainer>
            <Tabs
              TabIndicatorProps={{ style: { height: '0px' } }}
              value={page}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <CustomTab
                label="Swap"
                onClick={() => navigate('/')}
                {...a11yProps(2)}
                style={{ color: page === 2 ? '#FFFFFF' : '#B1B5C3', fontWeight: page === 0 ? 500 : 400 }}
              />
              <CustomTab
                label="Portfolio"
                {...a11yProps(3)}
                onClick={() => navigate('/portfolio')}
                style={{ color: page === 3 ? '#FFFFFF' : '#B1B5C3', fontWeight: page === 0 ? 500 : 400 }}
              />
            </Tabs>
          </TabContainer>
        </KunjiContainer>
        <HeaderActionContainer>
          <ConnectWalletButton />
        </HeaderActionContainer>
      </HeaderWrapper>
      <HeaderLine />
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
}));

const TabContainer = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider',
  [theme.breakpoints.down(1120)]: {
    display: 'none'
  }
}));

const CustomTab = styled(Tab)({
  color: '#ffffff',
  textTransform: 'none',
  disableRipple: 'true',
  disableFocusRipple: 'true'
});

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1280px',
  padding: '0 40px',
  width: '100%',
  height: '70px',
  [theme.breakpoints.down(480)]: {
    padding: '0 20px'
  }
}));

const HeaderLine = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 0,
  border: '1px solid #1D1E1F'
}));

const HeaderActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
}));

const KunjiContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '60px'
}));

const KunjiLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.down(768)]: {
    gap: '5px'
  }
}));

const MobileNavButton = (props: { onClick: () => void }) => {
  return (
    <MobileNavButtonContainer onClick={props.onClick}>
      <Menu />
    </MobileNavButtonContainer>
  );
};

const MobileNavButtonContainer = styled(IconButton)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: '#ffffff',
  display: 'none',
  [theme.breakpoints.down(1120)]: {
    display: 'block'
  }
}));

interface MobileNavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavBar = (props: MobileNavBarProps) => {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: 340,
    maxHeight: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'auto'
  };

  const handleNavigate = (nav: string) => {
    navigate(nav);
    handleClose();
  };

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <ModalHeader>
          <MobileNavBarLogo src={LOGO} alt="Kunji-logo" onClick={() => handleNavigate('/')} />
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </ModalHeader>
        <ModalContent>
          <ListItem disablePadding>
            <CustomListItemButton onClick={() => handleNavigate('/')}>
              <ListItemText primary="Swap" />
            </CustomListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <CustomListItemButton onClick={() => handleNavigate('/portfolio')}>
              <ListItemText primary="Portfolio" />
            </CustomListItemButton>
          </ListItem>
        </ModalContent>
      </Box>
    </Modal>
  );
};

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: '21px 31px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #1D1E1F'
}));

const KunjiLogo = styled('img')(({ theme }) => ({
  height: '25px',
  width: 'auto',
  cursor: 'pointer',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  content: `url(${LOGO})`
}));

const MobileNavBarLogo = styled('img')(({ theme }) => ({
  height: '25px',
  width: 'auto',
  cursor: 'pointer'
}));

const ModalContent = styled(Box)(({ theme }) => ({
  padding: '25px 31px'
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#08090A'
  }
}));
