import { Configuration, OpenAIApi } from "openai";
const types = ["Generate a Regular Expression to ", ["Create a code in ", " to match a variable str against this regular expression: "], "Explain the following Regular expression: "]
const DEFAULT_PARAMS = {
    "model": "text-davinci-002",
    "temperature": 0,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "prompt": "How are you today?",
}

//const openai_api_key = "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"


async function OpenAIApiCall(key, params = {}) {
    const params_ = { ...DEFAULT_PARAMS, ...params };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(key)
        },
        body: JSON.stringify(params_)
    };
    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();
    return data.choices[0].text.replaceAll('\n', '<br/ > ');;
}


export async function ApiCall(type, key, query, lang = null, model = 'code-davinci-002') {
    const trimQuery = query.trim()
    const AIquery = type === 1 ? types[1][0] + lang + types[1][1] + trimQuery : types[type] + trimQuery
    const response = await OpenAIApiCall(key, { "prompt": AIquery, "model": model })
    return response
}


export async function AvailableModels(key) {
    const configuration = new Configuration({
        apiKey: key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listModels();
    return response.data;
}