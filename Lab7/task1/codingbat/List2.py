# 1. count_evens
# Return the count of even numbers in the array
def count_evens(nums):
    count = 0
    for n in nums:
        if n % 2 == 0:
            count += 1
    return count


# 2. big_diff
# Return the difference between the largest and smallest values
def big_diff(nums):
    return max(nums) - min(nums)


# 3. centered_average
# Return the mean average ignoring the largest and smallest values
def centered_average(nums):
    total = sum(nums) - max(nums) - min(nums)
    return total // (len(nums) - 2)


# 4. sum13
# Sum array but 13 and the number after it don't count
def sum13(nums):
    if len(nums) == 0:
        return 0
    total = 0
    skip = False
    for n in nums:
        if n == 13:
            skip = True
            continue
        if skip:
            skip = False
            continue
        total += n
    return total


# 5. sum67
# Sum array but ignore sections starting with 6 and ending with 7
def sum67(nums):
    total = 0
    ignore = False
    for n in nums:
        if n == 6:
            ignore = True
        if not ignore:
            total += n
        if n == 7 and ignore:
            ignore = False
    return total


# 6. has22
# Return True if the array contains two 2s next to each other
def has22(nums):
    for i in range(len(nums) - 1):
        if nums[i] == 2 and nums[i + 1] == 2:
            return True
    return False