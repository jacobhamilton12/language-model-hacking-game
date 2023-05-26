let prompts = [];
let currentPromptIndex = 0;

export async function fetchPrompts() {
    try {
        const response = await fetch('/prompts');
        prompts = await response.json();
        setPrompt();
    } catch (error) {
        console.error('Failed to fetch prompts:', error);
    }
}

export function setPrompt() {
    document.getElementById('prompt').value = prompts[currentPromptIndex];
}

export function changePrompt(delta) {
    currentPromptIndex += delta;
    currentPromptIndex = Math.max(0, Math.min(prompts.length - 1, currentPromptIndex));
    setPrompt();
    document.querySelector('.box').style.backgroundColor = '';
    document.getElementById('response').value = '';
}
