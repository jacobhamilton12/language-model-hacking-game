export async function fetchSubmissions() {
    try {
        const response = await fetch('/submissions');
        const submissions = await response.json();
        const submissionsDiv = document.getElementById('submissions');
        submissions.forEach((submission) => {
            const submissionDiv = document.createElement('div');
            submissionDiv.className = 'submission';
            submissionDiv.innerText = submission.submission;
            submissionsDiv.appendChild(submissionDiv);
        });
    } catch (error) {
        console.error('Failed to fetch submissions:', error);
    }
}

export async function submitEntry() {
    const userEntry = document.getElementById('entry').value.trim();
    const systemPrompt = document.getElementById('prompt').value;

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
        handleSubmissionResponse(data, userEntry);

    } catch (error) {
        console.error('Failed to submit entry:', error);
    }
}

function handleSubmissionResponse(data, userEntry) {
    if (data.error) {
        console.error('Error:', data.error);
    } else {
        const responseElement = document.getElementById('response');
        responseElement.value = data.response;

        const box = document.querySelector('.box');
        box.style.backgroundColor = data.keyInResponse ? 'green' : ''; 

        appendSubmission(userEntry);
    }
}

function appendSubmission(userEntry) {
    const submissionsDiv = document.getElementById('submissions');

    const submissionDiv = document.createElement('div');
    submissionDiv.className = 'submission';
    submissionDiv.innerText = userEntry;

    if (submissionsDiv.firstChild) {
        submissionsDiv.insertBefore(submissionDiv, submissionsDiv.firstChild);
    } else {
        submissionsDiv.appendChild(submissionDiv);
    }
}
