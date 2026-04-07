# 1. first_last6
# Return True if 6 is the first or last element in the array
def first_last6(nums):
    return nums[0] == 6 or nums[-1] == 6


# 2. same_first_last
# Return True if array length >= 1 and first element equals last element
def same_first_last(nums):
    return len(nums) >= 1 and nums[0] == nums[-1]


# 3. make_pi
# Return the array [3, 1, 4] (first 3 digits of pi)
def make_pi():
    return [3, 1, 4]


# 4. common_end
# Return True if two arrays share the same first or last element
def common_end(a, b):
    return a[0] == b[0] or a[-1] == b[-1]


# 5. sum3
# Return the sum of all 3 elements in the array
def sum3(nums):
    return sum(nums)


# 6. rotate_left3
# Rotate array left by 1: [1,2,3] -> [2,3,1]
def rotate_left3(nums):
    return [nums[1], nums[2], nums[0]]


# 7. reverse3
# Return array in reverse order: [1,2,3] -> [3,2,1]
def reverse3(nums):
    return [nums[2], nums[1], nums[0]]


# 8. max_end3
# Set all elements to whichever is larger: first or last element
def max_end3(nums):
    m = max(nums[0], nums[2])
    return [m, m, m]


# 9. sum2
# Return sum of first 2 elements (handle arrays shorter than 2)
def sum2(nums):
    if len(nums) == 0:
        return 0
    if len(nums) == 1:
        return nums[0]
    return nums[0] + nums[1]


# 10. middle_way
# Return array with middle element of each of the two arrays
def middle_way(a, b):
    return [a[len(a) // 2], b[len(b) // 2]]


# 11. make_ends
# Return array with first and last element of the given array
def make_ends(nums):
    return [nums[0], nums[-1]]


# 12. has23
# Return True if the array contains 2 or 3
def has23(nums):
    return 2 in nums or 3 in nums