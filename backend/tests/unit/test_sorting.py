from app.algorithms.sorting import merge_sort, quick_sort


def test_merge_sort():
    assert merge_sort([5, 3, 8, 1]) == [1, 3, 5, 8]


def test_quick_sort():
    assert quick_sort([4, 2, 7, 1]) == [1, 2, 4, 7]
