Generative AI - An AI, who can : Generate new text -> Eg - ChatGpt - Write a Story Generate new Image/Videos -> Eg - DALL-E - Create an image of a
dog.

LLM - Large Language Models (used to generate new text). For images and other we have different models like for e.g. image we have diffusion model

Types of Models - 1 - Chat model -> Dont think just give the output immediately 2 - Reasoning Models -> First they think and then reply, good for
crtiical/complex task.

Important Terms -

1 - Tokens -> Smallest Unit of text the model processes, like word or parts of words. Tokenizer -> Embedding -> LLM (Neural N/W) E.g. What is chat GPT
? -> Tokenizer will break string into tokens (Process is called as Tokenization), each tokenizer has there own algorthm of breaking string into
strings. It assigns a number(Integer) to each token. -> What -> 1, is -> 2, chat -> 3, Gpt -> 4, ? -> 5 LLM Dont Understand String - So we break it
into tokens, tokens are processed by LLM. Token can be a word or a piece of a word.

2- Context - Surroundings text or information that the model uses to understand and generate relevant responses. - Input - Instruction - Additional
Info - Message History

3 - Context Window - Maximum number of tokens an LLM can read and use at the same time to generate or predict text.

4 - Inference - Process where an LLM takes input text and generates an output based on what it has learned.

Prompt Enginnering - Used to improve the capacity of LLM on a wide range of common and complex tasks such as question answering and airthmetic
reasoning. We uses different techniques by the help of which, we get consistent output from LLM.

Prompt - Simply the text we send to a LLM. 
        Created by using several elements -    
            - Instructions - Instruct to LLM what it has to do, summarization, translation or etc
            - Input data - User Question
            - Context 
            - Output Indicator - From where to start output
    e.g - Classify the review as Positive, negative or negative // Instructions
          Review : These headphones arrived quickly and look great, but the left earcup stopped working after a week. // Input Data
          Sentiment :  // Output Indicator

    Here we haven't passed context, as we don't need to provide additional info to LLM, as LLm is capable of doing this task. But in some Prompt we may need to pass context.

Types / Techinques of Prompting - 
1 - Zero Shot Prompting -> We directly ask question to LLM, without giving any example for reference.(LLM - May halicunate, may give different-different response on asking multiple time)
2 - Few Shot Prompting -> We give examples to LLM, and then ask questions to it.
3 - Chain of thought prompting - We give examples to LLM, and also tell that to think to generate the output we provide by our example.

Tool Calling -> 
Used to interact with external resources, such as API's , Databases and the web.