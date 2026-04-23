class Stack:
    def __init__(self):
        self._data = []

    def push(self, value):
        self._data.append(value)

    def pop(self):
        return self._data.pop()

    def is_empty(self):
        return len(self._data) == 0


class Queue:
    def __init__(self):
        self._data = []

    def enqueue(self, value):
        self._data.append(value)

    def dequeue(self):
        return self._data.pop(0)

    def is_empty(self):
        return len(self._data) == 0
