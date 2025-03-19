import { Box, VStack, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

const GrowthPlan = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleCreatePlan = () => {
    if (!newPlan.title || !newPlan.description) return;
    
    setPlans([...plans, { ...newPlan, id: Date.now(), status: 'ongoing' }]);
    setNewPlan({ title: '', description: '', deadline: '' });
    onClose();
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">成长计划</Heading>
          <Button colorScheme="blue" onClick={onOpen}>创建新计划</Button>
        </Box>

        {plans.map(plan => (
          <Box key={plan.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="md">{plan.title}</Heading>
            <Text mt={2}>{plan.description}</Text>
            <Text mt={2} color="gray.500">截止日期: {plan.deadline}</Text>
            <Text color={plan.status === 'completed' ? 'green.500' : 'orange.500'}>
              状态: {plan.status === 'completed' ? '已完成' : '进行中'}
            </Text>
          </Box>
        ))}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>创建新计划</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>标题</FormLabel>
                <Input
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>描述</FormLabel>
                <Textarea
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>截止日期</FormLabel>
                <Input
                  type="date"
                  value={newPlan.deadline}
                  onChange={(e) => setNewPlan({ ...newPlan, deadline: e.target.value })}
                />
              </FormControl>

              <Button colorScheme="blue" mr={3} mt={4} onClick={handleCreatePlan}>
                创建
              </Button>
              <Button mt={4} onClick={onClose}>取消</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default GrowthPlan;