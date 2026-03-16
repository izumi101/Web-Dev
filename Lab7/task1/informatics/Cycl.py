'''
a = int(input())
b = int(input())

result = [str(i) for i in range(a, b + 1) if i % 2 == 0]
print(*result)
'''

'''
a = int(input())
b = int(input())
c = int(input())
d = int(input())
result = [str(i) for i in range(a, b + 1 ) if i % d == c]
print(*result)
'''


'''
import math

a = int(input())
b = int(input())

result = [str(i) for i in range(a, b + 1) if math.isqrt(i) ** 2 == i]
print(*result)
'''


'''
x = int(input())

i = 2
while i <= x:
    if x % i == 0:
        print(i)
        break
    i += 1
'''

'''
x = int(input())

result = [str(i) for i in range(1, x + 1) if x % i == 0]
print(*result)
'''

'''
import math

x = int(input())

count = 0
i = 1
while i <= math.isqrt(x):
    if x % i == 0:
        if i == x // i:
            count += 1
        else:
            count += 2
    i += 1

print(count)
'''

'''
total = 0
for i in range(100):
    total += int(input())

print(total)
'''


'''
n = int(input())

total = 0
for i in range(n):
    total += int(input())

print(total)
'''


'''
n = input()
print(int(n, 2))
'''


'''
n = int(input())

count = 0
for i in range(n):
    if int(input()) == 0:
        count += 1

print(count)
'''




