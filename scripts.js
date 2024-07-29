document.getElementById('updateCardBtn').addEventListener('click', function () {
    updateIDCard();
});

document.getElementById('logoFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('logoImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function updateIDCard() {
    // Retrieve form values
    const logoURL = document.getElementById('logoURL').value;
    const jobPost = document.getElementById('jobPost').value;
    const section = document.getElementById('section').value;
    const skills = document.getElementById('skills').value;
    const description = document.getElementById('description').value;
    const email = document.getElementById('email').value;

    // Retrieve social media URLs
    const socialLinks = [
        { checkbox: 'resumeImage1', inputId: 'socialLink1', imgSrc: './1.png' },
        { checkbox: 'resumeImage2', inputId: 'socialLink2', imgSrc: './2.png' },
        { checkbox: 'resumeImage3', inputId: 'socialLink3', imgSrc: './3.png' },
        { checkbox: 'resumeImage4', inputId: 'socialLink4', imgSrc: './4.png' },
        { checkbox: 'resumeImage5', inputId: 'socialLink5', imgSrc: './5.png' },
        { checkbox: 'resumeImage5', inputId: 'socialLink5', imgSrc: './6.png' },
    ];

    // Update the content of the ID card
    const contentDiv = document.getElementById('cardContent');
    contentDiv.innerHTML = `
        <p><strong>Job Post:</strong> ${jobPost}</p>
        <p><strong>Section:</strong> ${section}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;

    // Update social media section
    const socialDiv = document.getElementById('socialLinks');
    socialDiv.innerHTML = ''; // Clear previous content

    socialLinks.forEach(link => {
        const checkbox = document.getElementById(link.checkbox);
        const urlInput = document.getElementById(link.inputId);

        if (checkbox.checked && urlInput.value) {
            socialDiv.innerHTML += `<a href="${urlInput.value}" target="_blank"><img src="${link.imgSrc}" alt="Social Image"></a>`;
        }
    });

    // Update logo image if URL is provided
    const logoImage = document.getElementById('logoImage');
    if (logoURL) {
        logoImage.src = logoURL;
    }
}

document.getElementById('downloadBtn').addEventListener('click', function () {
    html2canvas(document.getElementById('idCard')).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'id_card.png';
        link.click();
    });
});
