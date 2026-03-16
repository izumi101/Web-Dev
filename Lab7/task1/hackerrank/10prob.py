#1

#!/bin/python3
import math
import os
import random
import re
import sys

if __name__ == '__main__':
    n = int(input().strip())

    if n % 2 != 0:
        print("Weird")
    elif 2 <= n <= 5:
        print("Not Weird")
    elif 6 <= n <= 20:
        print("Weird")
    else:
        print("Not Weird")


#2 Validating Postal Codes

regex_integer_in_range = r"^[1-9]\d{5}$"    # Do not delete 'r'.
regex_alternating_repetitive_digit_pair = r"(?=(\d)\d\1)"    # Do not delete 'r'.


import re
P = input()

print (bool(re.match(regex_integer_in_range, P))
and len(re.findall(regex_alternating_repetitive_digit_pair, P)) < 2)


#3Write a func

def is_leap(year):
    leap = False

    if year % 400 == 0:
        leap = True
    elif year % 100 == 0:
        leap = False
    elif year % 4 == 0:
        leap = True

    return leap


year = int(input())
print(is_leap(year))


#4 List Comprehensions

x = int(input())
y = int(input())
z = int(input())
n = int(input())

result = [
    [i, j, k]
    for i in range(x + 1)
    for j in range(y + 1)
    for k in range(z + 1)
    if i + j + k != n
]

print(result)


#5 Tuples
n = int(input())
t = tuple(map(int, input().split()))
print(hash(t))

#6 Capitalize

print(input().title())


#7 Nested Lists

n = int(input())

students = []
for _ in range(n):
    name = input()
    grade = float(input())
    students.append([name, grade])

grades = sorted(set(s[1] for s in students))
second_lowest = grades[1]

result = sorted(s[0] for s in students if s[1] == second_lowest)

for name in result:
    print(name)


 #8 Calendar Module

import calendar

month, day, year = map(int, input().split())
print(calendar.day_name[calendar.weekday(year, month, day)].upper())

#9 Symmetric Difference
m = int(input())
a = set(map(int, input().split()))
n = int(input())
b = set(map(int, input().split()))

for x in sorted(a.symmetric_difference(b)):
    print(x)

#10 Piling Up!

t = int(input())

for _ in range(t):
    n = int(input())
    blocks = list(map(int, input().split()))

    top = float('inf')
    possible = True

    left, right = 0, n - 1

    while left <= right:
        if blocks[left] <= top and blocks[right] <= top:
            if blocks[left] > blocks[right]:
                top = blocks[left]
                left += 1
            else:
                top = blocks[right]
                right -= 1
        elif blocks[left] <= top:
            top = blocks[left]
            left += 1
        elif blocks[right] <= top:
            top = blocks[right]
            right -= 1
        else:
            possible = False
            break

    print("Yes" if possible else "No")



