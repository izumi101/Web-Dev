# A)
def min4(a, b, c, d):
    result = a
    if b < result:
        result = b
    if c < result:
        result = c
    if d < result:
        result = d
    return result

a, b, c, d = int(input()), int(input()), int(input()), int(input())
print(min4(a, b, c, d))


# B)
def power(a, n):
    result = 1.0
    for i in range(n):
        result *= a
    return result

a = float(input())
n = int(input())
print(power(a, n))


# C)
def xor(x, y):
    return (x and not y) or (not x and y)

x = int(input())
y = int(input())
print(1 if xor(x, y) else 0)