# 1. double_char
# Return a string where every char is doubled: 'The' -> 'TThhee'
def double_char(str):
    result = ''
    for char in str:
        result += char * 2
    return result


# 2. count_hi
# Count how many times 'hi' appears in the string
def count_hi(str):
    count = 0
    for i in range(len(str) - 1):
        if str[i:i+2] == 'hi':
            count += 1
    return count


# 3. cat_dog
# Return True if 'cat' and 'dog' appear the same number of times
def cat_dog(str):
    cat_count = 0
    dog_count = 0
    for i in range(len(str) - 2):
        if str[i:i+3] == 'cat':
            cat_count += 1
        if str[i:i+3] == 'dog':
            dog_count += 1
    return cat_count == dog_count


# 4. count_code
# Count 'co_e' patterns where _ is any char: 'cope', 'cooe' count
def count_code(str):
    count = 0
    for i in range(len(str) - 3):
        if str[i:i+2] == 'co' and str[i+3] == 'e':
            count += 1
    return count


# 5. end_other
# Return True if either string appears at the end of the other (case-insensitive)
def end_other(a, b):
    a = a.lower()
    b = b.lower()
    return a.endswith(b) or b.endswith(a)


# 6. xyz_there
# Return True if 'xyz' appears in string NOT preceded by a period
def xyz_there(str):
    for i in range(len(str) - 2):
        if str[i:i+3] == 'xyz':
            if i == 0 or str[i-1] != '.':
                return True
    return False