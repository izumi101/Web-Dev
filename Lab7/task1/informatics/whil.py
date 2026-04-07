'''
n = int(input())

i = 1
while i * i <= n:
    print(i * i)
    i += 1
'''

'''
n = int(input())

i = 2
while i <= n:
    if n % i == 0:
        print(i)
        break
    i += 1
'''
'''
n = int(input())

i = 1
while i <= n:
    print(i)
    i *= 2
'''

'''
n = int(input())

i = 1
while i < n:
    i *= 2

if i == n:
    print("YES")
else:
    print("NO")
'''
'''
n = int(input())

k = 0
power = 1
while power < n:
    power *= 2
    k += 1

print(k)
'''