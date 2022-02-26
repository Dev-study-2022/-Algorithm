def solution(s):
    dictionary = {'zero': 0,
                  'one': 1,
                  'two': 2,
                  'three': 3,
                  'four': 4,
                  'five': 5,
                  'six': 6,
                  'seven': 7,
                  'eight': 8,
                  'nine': 9,}
    number = ''
    answer = ''
    for i in s:
        if i.isdigit():
            answer += i
            continue
        else:
            number += i
            if number in dictionary.keys():
                answer += str(dictionary[number])
                number = ''
                continue

    return int(answer)

print(solution("one4seveneight"))

# Other Code

def solution2(s):
    num_dic = {"zero":"0", "one":"1", "two":"2", "three":"3", "four":"4", "five":"5", "six":"6", "seven":"7", "eight":"8", "nine":"9"}
    answer = s
    for key, value in num_dic.items():
        answer = answer.replace(key, value)
    return int(answer)

def solution3(s):
    words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    for i in range(len(words)):
        s = s.replace(words[i], str(i))
    return int(s)