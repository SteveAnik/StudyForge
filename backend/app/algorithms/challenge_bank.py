CHALLENGES = [
    {
        "id": "arrays-two-sum",
        "topic": "arrays",
        "title": "Pair Sum Indices",
        "prompt": "Given an array and target, return indices of two numbers that add to target.",
        "submission_type": "array",
        "input_payload": {"values": [2, 7, 11, 15], "target": 9},
        "expected_output": [0, 1],
        "test_cases": [
            {"input": {"values": [2, 7, 11, 15], "target": 9}, "expected": [0, 1]},
            {"input": {"values": [3, 2, 4], "target": 6}, "expected": [1, 2]},
        ],
    },
    {
        "id": "linked-lists-reverse",
        "topic": "linked_lists",
        "title": "Reverse Linked List Values",
        "prompt": "Return the values of the linked list in reverse order.",
        "submission_type": "array",
        "input_payload": {"values": [1, 2, 3, 4]},
        "expected_output": [4, 3, 2, 1],
        "test_cases": [
            {"input": {"values": [1, 2, 3, 4]}, "expected": [4, 3, 2, 1]},
            {"input": {"values": [9, 8, 7]}, "expected": [7, 8, 9]},
        ],
    },
    {
        "id": "stacks-valid-parentheses",
        "topic": "stacks",
        "title": "Valid Parentheses",
        "prompt": "Return true if all brackets are balanced in the expression.",
        "submission_type": "boolean",
        "input_payload": {"expression": "{[()]}"},
        "expected_output": True,
        "test_cases": [
            {"input": {"expression": "{[()]}"}, "expected": True},
            {"input": {"expression": "{[(])}"}, "expected": False},
        ],
    },
    {
        "id": "queues-first-non-repeating",
        "topic": "queues",
        "title": "First Non-Repeating Character",
        "prompt": "Return the first non-repeating character in the stream.",
        "submission_type": "string",
        "input_payload": {"stream": "aabcddbe"},
        "expected_output": "c",
        "test_cases": [
            {"input": {"stream": "aabcddbe"}, "expected": "c"},
            {"input": {"stream": "aabbcc"}, "expected": ""},
        ],
    },
    {
        "id": "recursion-factorial",
        "topic": "recursion",
        "title": "Factorial",
        "prompt": "Compute n! recursively for the provided n.",
        "submission_type": "number",
        "input_payload": {"n": 6},
        "expected_output": 720,
        "test_cases": [
            {"input": {"n": 6}, "expected": 720},
            {"input": {"n": 4}, "expected": 24},
        ],
    },
    {
        "id": "sorting-ascending",
        "topic": "sorting",
        "title": "Sort Ascending",
        "prompt": "Sort the array in ascending order.",
        "submission_type": "array",
        "input_payload": {"values": [5, 2, 9, 1, 5]},
        "expected_output": [1, 2, 5, 5, 9],
        "test_cases": [
            {"input": {"values": [5, 2, 9, 1, 5]}, "expected": [1, 2, 5, 5, 9]},
            {"input": {"values": [3, 0, -1]}, "expected": [-1, 0, 3]},
        ],
    },
    {
        "id": "searching-binary-index",
        "topic": "searching",
        "title": "Binary Search Index",
        "prompt": "Return index of target in sorted array, else -1.",
        "submission_type": "number",
        "input_payload": {"values": [1, 3, 4, 8, 12, 20], "target": 8},
        "expected_output": 3,
        "test_cases": [
            {"input": {"values": [1, 3, 4, 8, 12, 20], "target": 8}, "expected": 3},
            {"input": {"values": [2, 4, 6, 8], "target": 5}, "expected": -1},
        ],
    },
    {
        "id": "arrays-max-profit",
        "topic": "arrays",
        "title": "Best Time to Buy and Sell",
        "prompt": "Return max profit from one buy and one sell.",
        "submission_type": "number",
        "input_payload": {"prices": [7, 1, 5, 3, 6, 4]},
        "expected_output": 5,
        "test_cases": [
            {"input": {"prices": [7, 1, 5, 3, 6, 4]}, "expected": 5},
            {"input": {"prices": [7, 6, 4, 3, 1]}, "expected": 0},
        ],
    },
    {
        "id": "linked-lists-middle",
        "topic": "linked_lists",
        "title": "Middle Node Value",
        "prompt": "Return middle value of list, use right-middle for even length.",
        "submission_type": "number",
        "input_payload": {"values": [1, 2, 3, 4, 5, 6]},
        "expected_output": 4,
        "test_cases": [
            {"input": {"values": [1, 2, 3, 4, 5, 6]}, "expected": 4},
            {"input": {"values": [9, 8, 7]}, "expected": 8},
        ],
    },
    {
        "id": "stacks-postfix-eval",
        "topic": "stacks",
        "title": "Evaluate Postfix",
        "prompt": "Evaluate the postfix expression and return the result.",
        "submission_type": "number",
        "input_payload": {"tokens": ["2", "1", "+", "3", "*"]},
        "expected_output": 9,
        "test_cases": [
            {"input": {"tokens": ["2", "1", "+", "3", "*"]}, "expected": 9},
            {"input": {"tokens": ["4", "13", "5", "/", "+"]}, "expected": 6},
        ],
    },
    {
        "id": "queues-time-to-buy",
        "topic": "queues",
        "title": "Ticket Queue Time",
        "prompt": "Return seconds needed for person k to finish buying tickets.",
        "submission_type": "number",
        "input_payload": {"tickets": [2, 3, 2], "k": 2},
        "expected_output": 6,
        "test_cases": [
            {"input": {"tickets": [2, 3, 2], "k": 2}, "expected": 6},
            {"input": {"tickets": [5, 1, 1, 1], "k": 0}, "expected": 8},
        ],
    },
    {
        "id": "recursion-fibonacci",
        "topic": "recursion",
        "title": "Fibonacci Number",
        "prompt": "Return n-th Fibonacci number where F(0)=0 and F(1)=1.",
        "submission_type": "number",
        "input_payload": {"n": 7},
        "expected_output": 13,
        "test_cases": [
            {"input": {"n": 7}, "expected": 13},
            {"input": {"n": 10}, "expected": 55},
        ],
    },
    {
        "id": "sorting-kth-smallest",
        "topic": "sorting",
        "title": "K-th Smallest Element",
        "prompt": "Return the k-th smallest element (1-indexed).",
        "submission_type": "number",
        "input_payload": {"values": [7, 10, 4, 3, 20, 15], "k": 3},
        "expected_output": 7,
        "test_cases": [
            {"input": {"values": [7, 10, 4, 3, 20, 15], "k": 3}, "expected": 7},
            {"input": {"values": [1, 2, 3, 4], "k": 1}, "expected": 1},
        ],
    },
    {
        "id": "searching-first-position",
        "topic": "searching",
        "title": "First Occurrence",
        "prompt": "Return first index of target in sorted array with duplicates, else -1.",
        "submission_type": "number",
        "input_payload": {"values": [1, 2, 2, 2, 3, 4], "target": 2},
        "expected_output": 1,
        "test_cases": [
            {"input": {"values": [1, 2, 2, 2, 3, 4], "target": 2}, "expected": 1},
            {"input": {"values": [1, 3, 5], "target": 4}, "expected": -1},
        ],
    },
]


def list_challenges(topic=None):
    challenges = CHALLENGES if not topic else [c for c in CHALLENGES if c["topic"] == topic]
    return [
        {
            "id": challenge["id"],
            "topic": challenge["topic"],
            "title": challenge["title"],
            "prompt": challenge["prompt"],
            "submission_type": challenge["submission_type"],
            "input_payload": challenge["input_payload"],
            "test_cases": challenge["test_cases"],
        }
        for challenge in challenges
    ]


def get_challenge(challenge_id):
    for challenge in CHALLENGES:
        if challenge["id"] == challenge_id:
            return challenge
    return None
