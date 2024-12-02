// Smooth Scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// NGL Anonymous Message
document.getElementById('send-ngl-message').addEventListener('click', function () {
    const message = document.getElementById('ngl-message').value;
    const responseMessage = document.getElementById('ngl-response-message');

    if (message) {
        // Here you can integrate API calls to send the message to your NGL account (if supported by NGL API)
        responseMessage.textContent = "Message sent! I'll respond to you soon.";
        responseMessage.style.color = "green";
        document.getElementById('ngl-message').value = ''; // Reset textarea
    } else {
        responseMessage.textContent = "Please type a message before sending.";
        responseMessage.style.color = "red";
    }
});

// Project Image Hover Effect
document.addEventListener('DOMContentLoaded', function () {
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
        img.addEventListener('mouseover', function () {
            img.style.transform = "scale(1.05)";
        });
        img.addEventListener('mouseout', function () {
            img.style.transform = "scale(1)";
        });
    });
});
