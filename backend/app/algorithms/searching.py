def binary_search(values, target):
    left = 0
    right = len(values) - 1
    while left <= right:
        mid = (left + right) // 2
        if values[mid] == target:
            return mid
        if values[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


def linear_search(values, target):
    for i, value in enumerate(values):
        if value == target:
            return i
    return -1
