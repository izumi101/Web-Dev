# 1. hello_name
# Given a string name, return a greeting "Hello Bob!"
def hello_name(name):
    return 'Hello ' + name + '!'


# 2. make_abba
# Given two strings a and b, return them in abba order: "HiByeByeHi"
def make_abba(a, b):
    return a + b + b + a


# 3. make_tags
# Wrap a word in HTML tags: make_tags('i', 'Yay') -> '<i>Yay</i>'
def make_tags(tag, word):
    return '<' + tag + '>' + word + '</' + tag + '>'


# 4. make_out_word
# Insert word in the middle of a 4-char "out" string: '<<Yay>>'
def make_out_word(out, word):
    return out[:2] + word + out[2:]


# 5. extra_end
# Return 3 copies of the last 2 chars: 'Hello' -> 'lololo'
def extra_end(str):
    return str[-2:] * 3


# 6. first_two
# Return first 2 chars of string (or less if shorter)
def first_two(str):
    return str[:2]


# 7. first_half
# Return first half of an even-length string: 'WooHoo' -> 'Woo'
def first_half(str):
    return str[:len(str) // 2]


# 8. without_end
# Return string without first and last char: 'Hello' -> 'ell'
def without_end(str):
    return str[1:-1]


# 9. combo_string
# Return short+long+short: combo_string('Hello', 'hi') -> 'hiHellohi'
def combo_string(a, b):
    if len(a) < len(b):
        return a + b + a
    return b + a + b


# 10. non_start
# Concatenate both strings but skip first char of each
def non_start(a, b):
    return a[1:] + b[1:]


# 11. left2
# Rotate string left by 2: 'Hello' -> 'lloHe'
def left2(str):
    return str[2:] + str[:2]