# A)
n = int(input())
a = list(map(int, input().split()))
print(*[a[i] for i in range(0, n, 2)])

# B)
n = int(input())
a = list(map(int, input().split()))
print(*[x for x in a if x % 2 == 0])

# C)
n = int(input())
a = list(map(int, input().split()))
print(sum(1 for x in a if x > 0))

# D)
n = int(input())
a = list(map(int, input().split()))
count = 0
for i in range(1, n):
    if a[i] > a[i-1]:
        count += 1
print(count)

# E)
n = int(input())
a = list(map(int, input().split()))
found = False
for i in range(n-1):
    if (a[i] > 0 and a[i+1] > 0) or (a[i] < 0 and a[i+1] < 0):
        found = True
        break
print("YES" if found else "NO")

# F)
n = int(input())
a = list(map(int, input().split()))
count = 0
for i in range(1, n-1):
    if a[i] > a[i-1] and a[i] > a[i+1]:
        count += 1
print(count)

# G)
n = int(input())
a = list(map(int, input().split()))
for i in range(n // 2):
    a[i], a[n-1-i] = a[n-1-i], a[i]
print(*a)