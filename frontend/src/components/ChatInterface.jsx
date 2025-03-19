import { Box, VStack, Input, Button, Text, useToast, Spinner } from '@chakra-ui/react';
import { useState } from 'react';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { role: 'user', content: message };
      setChatHistory(prev => [...prev, userMessage]);

      const response = await fetch(import.meta.env.VITE_DEEPSEEK_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "你是一位充满爱心和耐心的成长导师，就像一位慈爱的母亲或老师。你的目标是以温暖、鼓励的方式帮助学生成长。在回答问题时：1. 用温和关怀的语气 2. 给予积极的鼓励 3. 循序渐进地引导 4. 分享生活智慧 5. 关注情感需求。即使遇到学生的困惑或错误，也要以包容和理解的态度去开导。"
            },
            ...chatHistory,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API 请求失败');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message;
      
      setChatHistory(prev => [...prev, aiResponse]);
      setMessage('');
    } catch (error) {
      toast({
        title: '发送消息失败',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="pink.50">
      <VStack spacing={4} align="stretch" h="70vh">
        <Text fontSize="xl" color="pink.600" textAlign="center" mb={2}>
          你的专属成长导师
        </Text>
        <Box flex="1" overflowY="auto" p={2}>
          {chatHistory.map((msg, index) => (
            <Box
              key={index}
              bg={msg.role === 'user' ? 'blue.50' : 'pink.100'}
              p={3}
              borderRadius="lg"
              mb={3}
              ml={msg.role === 'assistant' ? 0 : 'auto'}
              mr={msg.role === 'user' ? 0 : 'auto'}
              maxW="80%"
              boxShadow="sm"
            >
              <Text color={msg.role === 'assistant' ? 'pink.800' : 'blue.800'}>
                {msg.content}
              </Text>
            </Box>
          ))}
        </Box>
        <Box>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="告诉我你的想法..."
            bg="white"
            borderColor="pink.200"
            _hover={{ borderColor: 'pink.300' }}
            _focus={{ borderColor: 'pink.400', boxShadow: '0 0 0 1px pink.400' }}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            mt={2}
            colorScheme="pink"
            onClick={handleSendMessage}
            isDisabled={!message.trim() || isLoading}
            width="100%"
          >
            {isLoading ? <Spinner size="sm" /> : '发送'}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ChatInterface;