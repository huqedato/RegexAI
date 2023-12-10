import OpenAI from "openai";
const types = ["Generate a Regular Expression for this pattern: ", ["Create a code in ", " to match a variable str against this regular expression: "], "Explain the following Regular expression: "]
const DEFAULT_PARAMS = {
    "temperature": 0.2,
    "max_tokens": 512,
}




export async function RegexAiApiCall(type, key, query, lang = null, model = 'gpt-3.5-turbo') {
    try {
        const trimQuery = query.trim()
        const AIquery = type === 1 ? types[1][0] + lang + types[1][1] + trimQuery : types[type] + trimQuery
        const response = await OpenAIApiCall(key, { "prompt": AIquery, "model": model })
        return response
    } catch (error) {
        console.error('Error in RegexAiApiCall:', error);
        return `Error: ${error.message}`;
    }
}

async function OpenAIApiCall(key, params) {
    try {
        const configuration = {
            apiKey: key,
            dangerouslyAllowBrowser: true
        };
        const { prompt, model } = params;
        const openai = new OpenAI(configuration);
        const messages = [
            { "role": "system", "content": "You are a helpful expert in Regular expressions. You you deliver straight, direct, no-nonsense replies, without introduction." },
            { "role": "user", "content": prompt }
        ]
        const newParams = { messages: messages, model: model, ...DEFAULT_PARAMS }
        const completion = await openai.chat.completions.create(newParams);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error making API call to OpenAI:', error);
        throw error;
    }
}

export async function AvailableModels(key) {
    const configuration = {
        apiKey: key,
        dangerouslyAllowBrowser: true
    };
    const openai = new OpenAI(configuration);

    const response = await openai.models.list();
    return response.data.filter(model => model.id.includes('gpt'));
}