import json
import os

import pandas as pd
import re
import jieba


# 停用词
# 创建停用词列表
def get_stopwords_list():
    stopwords = [line.strip() for line in open('./data/mydata/raw/cn_stopwords.txt', encoding='UTF-8').readlines()]
    return stopwords


# 创建停用词列表
def get_oralwords_list():
    oralwords = [line.strip() for line in open('./data/mydata/raw/cn_oralwords.txt', encoding='UTF-8').readlines()]
    return oralwords


# 去除停用词
def move_stopwords(sentence_list, stopwords_list):
    # 去停用词
    out_list = []
    for word in sentence_list:
        if word not in stopwords_list:
            if not remove_digits(word):
                continue
            if word != '\t':
                out_list.append(word)
    return out_list


# 去除数字与字母
def remove_digits(input_str):
    # punc = u'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.'
    punc = u'. '
    output_str = re.sub(r'[{}]+'.format(punc), '', input_str)
    return output_str


def cut_text(text):
    stopwords = get_stopwords_list()
    cut = jieba
    train_content_cut = []
    sentence_list = cut.cut(text)
    sentence_list = move_stopwords(sentence_list, stopwords)
    return ''.join(sentence_list)


def csv2json(path):
    csv_data = pd.read_csv(path)
    with open('./data/mydata/raw/train_test.json', 'a') as f:
        for index, row in csv_data.iterrows():
            print(row['words'])
            print(row['type'])
            print(cut_text(row['words']))
            dict_data = {'text': cut_text(row['words']), 'labels': [row['type']]}
            f.write(str(dict_data) + '\n')


# 合并较短的vad片段
def vad_check(res):
    new_res = []
    i = 0
    j = 1
    while j < len(res):
        if (res[j][1] - res[j][0] < 2 and res[j][0] - res[j - 1][1] < 1) or (
                res[i][1] - res[i][0] < 2 and res[j][0] - res[i][1] < 1):
            j += 1
        else:
            new_res.append([res[i][0], res[j - 1][1]])
            i = j
            j += 1
    new_res.append([res[i][0], res[j - 1][1]])

    return new_res


def cut_sent(para):
    para = re.sub('([。！？\?])([^”’])', r"\1\n\2", para)  # 单字符断句符
    para = re.sub('(\.{6})([^”’])', r"\1\n\2", para)  # 英文省略号
    para = re.sub('(\…{2})([^”’])', r"\1\n\2", para)  # 中文省略号
    para = re.sub('([。！？\?][”’])([^，。！？\?])', r'\1\n\2', para)
    # 如果双引号前有终止符，那么双引号才是句子的终点，把分句符\n放到双引号后，注意前面的几句都小心保留了双引号
    para = para.rstrip()  # 段尾如果有多余的\n就去掉它
    # 很多规则中会考虑分号;，但是这里我把它忽略不计，破折号、英文双引号等同样忽略，需要的再做些简单调整即可。
    return para.split("\n")


def int2time(second):
    m, s = divmod(second, 60)
    # h, m = divmod(m, 60)
    # s = str(round(s, 3)).zfill(6)
    s = ("%.3f" % s).zfill(6)
    return "%02d:" % m + s


def get_xf_sentence(file_path, file_name, output):
    with open(file_path, 'r', encoding="GBK") as f:
        xf_dicts = json.load(f)

    # 读取讯飞api文件分词
    words = []
    for i in xf_dicts["xf_result"]["data"]:
        bg = int(i['bg'])
        for j in i['wordsResultList']:
            words.append({'bg': bg + 10 * int(j['wordBg']), 'ed': bg + 10 * int(j['wordEd']), 'word': j['wordsName']})

    # 按照句号、叹号、问号重新组装句子
    res = []
    for k in words:
        if k['word'] == '':
            continue

        if len(res) == 0:
            res.append({'start': k['bg']/1000, 'end': k['ed']/1000, 'text': k['word']})
            continue

        if res[-1]['text'][-1] in ['。', '？', '！']:
            res.append({'start': k['bg']/1000, 'end': k['ed']/1000, 'text': k['word']})
        else:
            res[-1]['end'] = k['ed']/1000
            res[-1]['text'] += k['word']

    # for i in res:
    #     print(i)

    # 合并较短片段
    new_res_time = []
    i = 0
    j = 1
    while j < len(res):
        if (res[j]['end'] - res[j]['start'] < 2 and res[j]['start'] - res[j-1]['end'] < 1) or (
                res[i]['end'] - res[i]['start'] < 2 and res[j]['start'] - res[i]['end'] < 1):
            j += 1
        else:
            new_res_time.append([res[i]['start'], res[j-1]['end']])
            i = j
            j += 1
    new_res_time.append([res[i]['start'], res[j-1]['end']])
    # print(new_res_time)
    k = 0
    new_res = []
    for i in new_res_time:
        start = i[0]
        end = i[1]
        text = ''

        while k < len(res) and res[k]['end'] <= end:
            text += res[k]['text']
            k += 1

        new_res.append({'start': int2time(start), 'end': int2time(end), 'text': text})

    # for i in new_res:
    #     print(i)

    with open(f'{output}/{file_name.split(".")[0]}.txt', 'a') as f:
        for j in new_res:
            f.write(str(j) + '\n')


# with open("./data/mydata/raw/api_result/dbor_xf/dbor_7.json", 'r', encoding="GBK") as f:
#     xf_dicts = json.load(f)
#
# for i in xf_dicts["xf_result"]["data"]:
#     # if i['speaker'] != '1':
#     #     print(i)
#
#     print(i)


# 生成以句号为单位的数据集
# api_path = "./data/mydata/raw/api_result/"
# for v in os.listdir(api_path):
#     course = v
#     output_dir = f"./data/mydata/result/api_sentence/{v}/"
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)
#     else:
#         continue
#
#     for file in os.listdir(f"./data/mydata/raw/api_result/{v}/"):
#         print(file)
#         file_path = f"./data/mydata/raw/api_result/{v}/{file}"
#         get_xf_sentence(file_path, file, output_dir)


# # 生成用来标注的csv文件
# sentence_path = "./data/mydata/result/api_sentence/"
# for v in os.listdir(sentence_path):
#     v = "network_api"
#     course = v
#
#     with open(f"./data/mydata/result/api_sentence/{course}.csv", 'a') as f:
#         for file in os.listdir(f"./data/mydata/result/api_sentence/{v}/"):
#             print(file)
#             with open(f"./data/mydata/result/api_sentence/{v}/{file}", 'r') as fii:
#                 d = fii.read().splitlines()
#
#             for i in d:
#                 i = eval(i)
#                 data_line = f"{file.split('.')[0]},{i['start']},{i['end']},{i['text']},0,0,0"
#                 f.write(data_line + '\n')
#
#     break


# with open(f"./data/mydata/result/api_sentence/dbor_xf/dbor_23.txt", 'r') as f:
#     d = f.read().splitlines()
#
# for i in d:
#     i = eval(i)
#     start = round(int(i['start'].split(":")[0])*60 + float(i['start'].split(":")[1]), 3)
#     end = round(int(i['end'].split(":")[0])*60 + float(i['end'].split(":")[1]), 3)
#     print(start, end, i['text'])
    # print("{name: 'C', startTime: " + str(start) + ", endTime: " + str(end) + "},")

# with open(f"./data/mydata/result/api_sentence/dbor_23.csv", 'a') as f:
#     for i in d:
#         i = eval(i)
#         data_line = f"{i['start']},{i['end']},{i['text']},0,0,0"
#         f.write(data_line + '\n')


with open(f"./data/mydata/result/behavior_xf.csv", 'r') as f:
    d = f.read().splitlines()

for i in d:
    # print(i)
    l = i.split(",")
    if l[0] == 'behavior_27':
        # print(i)
        start = round(int(l[1].split(":")[0])*60 + float(l[1].split(":")[1]), 3)
        end = round(int(l[2].split(":")[0])*60 + float(l[2].split(":")[1]), 3)
        print("{name: 'D', startTime: " + str(start) + ", endTime: " + str(end) + "},")


# csv_data = pd.read_csv('./data/mydata/raw/real_dataset/Chinese.csv', encoding="GBK")
# print(csv_data)
# with open('./data/mydata/result/train_dataset_0411.json', 'a') as f:
#     for index, row in csv_data.iterrows():
#         labels = []
#         text_cut = cut_text(row[3])
#
#         if row[4] > 0:
#             labels.append('过渡')
#         if row[5] > 0:
#             labels.append('交互')
#         if row[6] > 0:
#             labels.append('其他')
#
#         if len(labels) == 0:
#             continue
#
#         # print(text_cut + ' ' + str(labels))
#         dict_data = {'text': text_cut, 'labels': labels}
#         print(dict_data)
#         f.write(str(dict_data) + '\n')


# res = {'过渡': 0, '其他': 0, '交互': 0}
# with open('./data/mydata/result/train_dataset_0411.json', 'r') as f:
#     d = f.read().splitlines()
# print(len(d))
# for i in d:
#     label = eval(i)['labels']
#     for j in label:
#         res[j] += 1
#     if "过渡" in label:
#         print(i)
# print(res)


# with open('./data/mydata/raw/train_keyword_match_version.json', 'a') as f:
#     for index, row in csv_data.iterrows():
#         labels = []
#         text_cut = cut_text(row['句子'])
#
#         if row['过渡句'] > 0:
#             labels.append('过渡')
#         if row['交互句'] > 0:
#             labels.append('交互')
#         if row['其他'] > 0:
#             labels.append('其他')
#
#         print(text_cut + ' ' + str(labels))
#         dict_data = {'text': text_cut, 'labels': labels}
#         f.write(str(dict_data) + '\n')
