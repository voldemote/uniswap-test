import { TabPanel } from 'src/components/TabPanel';
import { useStore } from 'src/context/StoreContext';
import { Swap } from './swap';

export const Home = () => {
  const { page } = useStore();
  return (
    <>
      <TabPanel value={page} index={0}>
        <Swap />
      </TabPanel>
      <TabPanel value={page} index={1}>
        Portfolio
      </TabPanel>
    </>
  );
};
