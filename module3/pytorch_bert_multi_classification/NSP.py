from torch.nn.functional import softmax
from transformers import BertForNextSentencePrediction, BertTokenizer


seq_A = '我喜欢你'
seq_B = '我今天吃饭了'

# load pretrained model and a pretrained tokenizer
model = BertForNextSentencePrediction.from_pretrained('./model_hub/bert-base-chinese/')
tokenizer = BertTokenizer.from_pretrained('./model_hub/bert-base-chinese/')

# encode the two sequences. Particularly, make clear that they must be
# encoded as "one" input to the model by using 'seq_B' as the 'text_pair'
encoded = tokenizer.encode_plus(seq_A, text_pair=seq_B, return_tensors='pt')
print(encoded)
# {'input_ids': tensor([[  101,   146,  1176, 18621,   106,   102,  2091,  1128,  1176,  1172, 136,   102]]),
#  'token_type_ids': tensor([[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]]),
#  'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])}
# NOTE how the token_type_ids are 0 for all tokens in seq_A and 1 for seq_B,
# this way the model knows which token belongs to which sequence

# a model's output is a tuple, we only need the output tensor containing
# the relationships which is the first item in the tuple
seq_relationship_logits = model(**encoded)[0]

# we still need softmax to convert the logits into probabilities
# index 0: sequence B is a continuation of sequence A
# index 1: sequence B is a random sequence
probs = softmax(seq_relationship_logits, dim=1)

print(seq_relationship_logits)
print(probs)
# tensor([[9.9993e-01, 6.7607e-05]], grad_fn=<SoftmaxBackward>)
# very high value for index 0: high probability of seq_B being a continuation of seq_A
