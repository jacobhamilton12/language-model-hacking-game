import { fetchPrompts, changePrompt } from './prompts.js';
import { fetchSubmissions, submitEntry } from './submissions.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    fetchSubmissions();

    document.getElementById('submit').addEventListener('click', submitEntry);
    document.getElementById('prev-prompt').addEventListener('click', () => changePrompt(-1));
    document.getElementById('next-prompt').addEventListener('click', () => changePrompt(1));
});