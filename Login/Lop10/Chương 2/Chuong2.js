document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        const target = document.querySelector(this.getAttribute('href'));
        target.style.display = 'block';
    });
});

// Hiển thị phần đầu tiên khi tải trang
document.querySelector('#section1').style.display = 'block';
