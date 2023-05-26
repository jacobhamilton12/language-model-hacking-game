let prompts = [];
let currentPromptIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    fetchSubmissions();

    document.getElementById('submit').addEventListener('click', submitEntry);
    document.getElementById('prev-prompt').addEventListener('click', () => changePrompt(-1));
    document.getElementById('next-prompt').addEventListener('click', () => changePrompt(1));
});

async function fetchSubmissions() {
    try {
        const response = await fetch('/submissions');
        const submissions = await response.json();
        const submissionsDiv = document.getElementById('submissions');
        submissions.forEach((submission) => {
            const submissionDiv = document.createElement('div');
            submissionDiv.className = 'submission';
            submissionDiv.innerText = submission.submission; // access the submission property
            submissionsDiv.appendChild(submissionDiv);
        });
    } catch (error) {
        console.error('Failed to fetch submissions:', error);
    }
}

async function fetchPrompts() {
    try {
        const response = await fetch('/prompts');
        prompts = await response.json();
        setPrompt();
    } catch (error) {
        console.error('Failed to fetch prompts:', error);
    }
}

function setPrompt() {
    document.getElementById('prompt').value = prompts[currentPromptIndex];
}

function changePrompt(delta) {
    currentPromptIndex += delta;
    currentPromptIndex = Math.max(0, Math.min(prompts.length - 1, currentPromptIndex));
    setPrompt();

    // Reset the box color and clear the response when the prompt is changed
    document.querySelector('.box').style.backgroundColor = '';
    document.getElementById('response').value = '';
}

async function submitEntry() {
    const userEntry = document.getElementById('entry').value.trim();
    const systemPrompt = document.getElementById('prompt').value;
    const submissionsDiv = document.getElementById('submissions');

    if (userEntry.length === 0) return;

    try {
        const formData = new FormData();
        formData.append('entry', userEntry);
        formData.append('prompt', systemPrompt);

        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        const data = await response.json();

        if (data.error) {
            console.error('Error:', data.error);
        } else {
            const responseElement = document.getElementById('response');
            responseElement.value = data.response;
        
            const box = document.querySelector('.box');
            if (data.keyInResponse) {
                box.style.backgroundColor = 'green';
            } else {
                box.style.backgroundColor = ''; // Reset to default color
            }
        }

        if (userEntry.length > 0) {
            const submissionDiv = document.createElement('div');
            submissionDiv.className = 'submission';
            submissionDiv.innerText = userEntry;
            
            // Insert new submission at the top
            if (submissionsDiv.firstChild) {
                submissionsDiv.insertBefore(submissionDiv, submissionsDiv.firstChild);
            } else {
                submissionsDiv.appendChild(submissionDiv);
            }
        }
    } catch (error) {
        console.error('Failed to submit entry:', error);
    }
}
