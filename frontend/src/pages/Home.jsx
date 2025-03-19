import { Box, Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ChatInterface from '../components/ChatInterface';
import GrowthPlan from '../components/GrowthPlan';

const Home = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>AI 对话</Tab>
          <Tab>成长计划</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ChatInterface />
          </TabPanel>
          <TabPanel>
            <GrowthPlan />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Home;