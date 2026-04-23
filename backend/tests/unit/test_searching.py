from app.algorithms.searching import binary_search, linear_search


def test_binary_search_found():
    assert binary_search([1, 2, 3, 4], 3) == 2


def test_linear_search_not_found():
    assert linear_search([1, 2, 3], 9) == -1
