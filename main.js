const app = new Vue({
    el: '#app',
    data: {
        lang: localStorage.getItem('lang') || 'fr', 
        translations: {}, 
        dropdownOpen: false, 
    },
    computed: {
        currentLanguageName() {
            return this.lang === 'fr' ? this.translations.french : this.translations.english;
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        switchLanguage(lang) {
            this.lang = lang;
            this.dropdownOpen = false; 
            localStorage.setItem('lang', lang); 
            fetch(`./translations/${this.lang}.json`)
                .then(response => response.json())
                .then(data => {
                    this.translations = data;
                })
                .catch(error => {
                    console.error(`Error loading translations: ${error}`);
                });
        },
        convertToHtml(text) {
            return text;
        }
    },
    mounted() {
        this.switchLanguage(this.lang); 
    }
});



document.addEventListener('DOMContentLoaded', () => {
    function initializeModal() {
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("openModal");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
            modal.querySelector('.modal-content').classList.remove('bounceOut');
            modal.querySelector('.modal-content').classList.add('bounceIn');
        }

        span.onclick = function() {
            modal.querySelector('.modal-content').classList.remove('bounceIn');
            modal.querySelector('.modal-content').classList.add('bounceOut');
            setTimeout(() => {
                modal.style.display = "none";
            }, 600);
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.querySelector('.modal-content').classList.remove('bounceIn');
                modal.querySelector('.modal-content').classList.add('bounceOut');
                setTimeout(() => {
                    modal.style.display = "none";
                }, 600);
            }
        }
    }

    initializeModal();
});




document.addEventListener('DOMContentLoaded', function() {
    var selectElement = document.querySelector('.dropdown');

    selectElement.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    var selectElement2 = document.querySelector('.clique'); 
    selectElement2.addEventListener('click', function() {
        this.classList.toggle('in');
    });

    document.documentElement.style.overflow = 'hidden';
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('out');

        setTimeout(function() {
            loader.style.display = 'none';
            document.documentElement.style.overflow = '';
        }, 2000);
    }, 5000);

    setTimeout(function() {
        document.documentElement.style.overflow = ''; 
    }, 4800);


            function typeEffect(element, text, speed) {
                let i = 0;
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                type();
            }

            const text = "intuition";
            
            const typingElement = document.getElementById('typing');
            const speed = 250;
            typeEffect(typingElement, text, speed);
        });