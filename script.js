document.addEventListener('DOMContentLoaded', () => {
    const logoURLInput = document.getElementById('logoURL');
    const logoFileInput = document.getElementById('logoFile');
    const logoImage = document.getElementById('logoImage');
    const updateCardBtn = document.getElementById('updateCardBtn');

    updateCardBtn.addEventListener('click', () => {
        const logoURL = logoURLInput.value;

        if (logoURL) {
            fetch(logoURL)
                .then(response => {
                    if (response.ok) {
                        logoImage.src = logoURL;
                    } else {
                        alert('Image URL is not valid or not accessible.');
                    }
                })
                .catch(error => {
                    alert('Error fetching the image from URL.');
                    console.error('Error:', error);
                });
        } else if (logoFileInput.files.length > 0) {
            const file = logoFileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                logoImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please provide a valid image URL or upload a file.');
        }
    });


});






// *************************************
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
        const logoURL = document.getElementById('logoURL').value;
        const jobPost = document.getElementById('jobPost').value;
        const section = document.getElementById('section').value;
        const skills = document.getElementById('skills').value;
        const description = document.getElementById('description').value;
        const email = document.getElementById('email').value;

        const socialLinks = [
            { checkbox: 'resumeImage1', inputId: 'socialLink1', imgSrc: './img/1.png' },
            { checkbox: 'resumeImage2', inputId: 'socialLink2', imgSrc: './img/2.png' },
            { checkbox: 'resumeImage3', inputId: 'socialLink3', imgSrc: './img/3.png' },
            { checkbox: 'resumeImage4', inputId: 'socialLink4', imgSrc: './img/4.png' },
            { checkbox: 'resumeImage5', inputId: 'socialLink5', imgSrc: './img/5.png' },
            { checkbox: 'resumeImage6', inputId: 'socialLink6', imgSrc: './img/6.png' }
        ];

        const contentDiv = document.getElementById('cardContent');
        contentDiv.innerHTML = `
            <p><strong>Job Post:</strong> ${jobPost}</p>
            <p><strong>Section:</strong> ${section}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Email:</strong> ${email}</p>`;

        const socialDiv = document.getElementById('socialLinks');
        socialDiv.innerHTML = '';

        socialLinks.forEach(link => {
            const checkbox = document.getElementById(link.checkbox);
            const urlInput = document.getElementById(link.inputId);

            if (checkbox.checked && urlInput.value) {
                socialDiv.innerHTML += `<a href="${urlInput.value}" target="_blank"><img src="${link.imgSrc}" alt="Social Image"></a>`;
            }
        });

        const logoImage = document.getElementById('logoImage');
        if (logoURL) {
            logoImage.src = logoURL;
        }
    }

    document.getElementById('downloadBtn').addEventListener('click', function () {
    html2canvas(document.getElementById('idCard')).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 25; // A4 width in mm minus margin
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image with margins
        pdf.addImage(imgData, 'PNG', 10, 13, imgWidth, imgHeight); // 10mm margin

        // Add clickable social media images with links
        const socialLinks = document.querySelectorAll('#socialLinks a');
        const margin = 1; // Margin from the bottom
        const linkMargin = 5; // Margin between links
        const linkWidth = 10; // Width for the link images
        const linkHeight = 10; // Height for the link images
        const textMargin = 2; // Margin between image and text
        let yOffset = pdfHeight - margin; // Start from the bottom

        socialLinks.forEach(link => {
            const imgSrc = link.querySelector('img').src;
            const pdfX = (pdfWidth - linkWidth) / 2; // Center horizontally
            const pdfY = yOffset - linkHeight; // Calculate vertical position
            
            // Add the image to the PDF
            pdf.addImage(imgSrc, 'PNG', pdfX, pdfY, linkWidth, linkHeight);

            // Calculate position for text
            const textX = pdfX + linkWidth + textMargin; // Text position to the right of the image
            const textY = pdfY + linkHeight / 2; // Vertical alignment with the center of the image
            
            // Add the clickable link with aligned and shortened text
            const linkText = link.href.length > 30 ? link.href.substring(0, 30) + '...' : link.href;
            pdf.textWithLink(linkText, textX, textY, { url: link.href });

            yOffset -= linkHeight + linkMargin; // Update yOffset for the next link
        });

        // Save the PDF
        pdf.save('id-card.pdf');
    });
});


    