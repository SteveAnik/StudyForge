def factorial_recursive(n):
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)


def nested_sum(values):
    total = 0
    for value in values:
        if isinstance(value, list):
            total += nested_sum(value)
        else:
            total += value
    return total
