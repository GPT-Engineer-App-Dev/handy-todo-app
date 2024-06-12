import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Text, Box, Checkbox, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (!task) {
      toast({
        title: "Task cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Todo App</Text>
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="purple">Add Task</Button>
        </HStack>
        <VStack width="100%" spacing={2}>
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" p={2} boxShadow="md" borderRadius="md" bg={task.completed ? "green.100" : "white"}>
              <Checkbox isChecked={task.completed} onChange={() => toggleTaskCompletion(index)} />
              <Text flex="1" textDecoration={task.completed ? "line-through" : "none"}>{task.text}</Text>
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;