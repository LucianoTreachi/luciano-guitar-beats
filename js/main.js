////////// DOM ELEMENTS ////////// 
const openMenu = document.querySelector(".fa-bars");
const closeMenu = document.querySelector(".fa-times");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll('.nav-link')

const sections = document.querySelectorAll('section')

const modalBg = document.querySelectorAll(".modal-bg");
const iconModal = document.querySelectorAll(".icon");
const imgModal = document.querySelectorAll(".img-video");
const closeModal = document.querySelectorAll(".close-modal");
const iframe = document.querySelectorAll("iframe");

const scrollUp = document.getElementById('scroll-up')

////////// RESPONSIVE MENU ////////// 
openMenu.addEventListener('click', () => {
  navbar.classList.add("active");
});

closeMenu.addEventListener('click', () => {
  navbar.classList.remove("active");
});

navLinks.forEach((e) => {
  e.addEventListener('click', () => {
    navbar.classList.remove("active");
  })
});

////////// SCROLL HEADER ////////// 
window.onscroll = () => {
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
};

window.onload = () => {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
};

////////// ACTIVE LINK WITH SCROLL //////////
function activeLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  navLinks.forEach(link => link.classList.remove("active"));
  navLinks[len].classList.add("active");
}

activeLinks();
window.addEventListener("scroll", activeLinks);

////////// SCROLL TO SECTION //////////
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

////////// MODAL ////////// 
let modals = function (modalClick) {
  modalBg[modalClick].classList.add("active");
};

iconModal.forEach((iconPlay, e) => {
  iconPlay.addEventListener("click", () => {
    modals(e);
  });
});

imgModal.forEach((video, e) => {
  video.addEventListener("click", () => {
    modals(e);
  });
});

closeModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalBg.forEach((modal) => {
      modal.classList.remove("active");
      iframe.forEach((video) => {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      })
    });
  });
});

modalBg.forEach((modal) => {
  modal.addEventListener("click", () => {
    modalBg.forEach((modal) => {
      modal.classList.remove("active");
      iframe.forEach((video) => {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      })
    });
  });
});

////////// BLOGS SWIPER ////////// 
const blogs = new Swiper(".blogs-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

////////// REVIEWS SWIPER ////////// 
const reviews = new Swiper(".review-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

window.addEventListener("scroll", function () {
  scrollUp.classList.toggle("active", window.scrollY > 500);
});

scrollUp.addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

////////// CONTACT //////////
const contactSection = document.getElementById('contact')
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const textarea = document.getElementById('textarea');

const alertName = document.getElementById('alert-name');
const alertEmail = document.getElementById("alert-email");
const alertMessage = document.getElementById("alert-message");

const modalContact = document.getElementById("modal-contact");
const modalContactLoader = document.getElementById("modal-contact-loader");
const modalContactSuccess = document.getElementById("modal-contact-success");
const modalContactError = document.getElementById("modal-contact-error");
const closeModalContact = document.querySelectorAll(".close-modal-contact");

/* Regular Expressions */
const expName = /^[\S][\DÀ-ÿ\s]{1,30}$/;
const expEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expMessage = /^[\S][0-9a-zA-ZÀ-ÿ\s\,.¡!¿?]{3,1000}$/;

const campos = {
  nombre: false,
  correo: false,
  mensaje: false
}

/* Validate Regular Expressions */
function validateRegularExpressions(e) {
  switch (e.target.id) { // with e.target.name we get the name value of each input

    case "input-name":
      // test if the regular expression nombre is true in the input value (e.target.value)
      if (expName.test(e.target.value)) {
        alertName.classList.remove('active');
        campos.nombre = true;
      }
      else {
        alertName.classList.add('active');
        campos.nombre = false;
      }
      break;

    case "input-email":
      // test if the regular expression correo is true in the input value (e.target.value)
      if (expEmail.test(e.target.value)) {
        alertEmail.classList.remove('active');
        campos.correo = true;
      }
      else {
        alertEmail.classList.add('active');
        campos.correo = false;
      }
      break;

    case "textarea":
      // test if the regular expression mensaje is true in the input value (e.target.value)
      if (expMessage.test(e.target.value)) {
        alertMessage.classList.remove('active');
        campos.mensaje = true;
      }
      else {
        alertMessage.classList.add('active');
        campos.mensaje = false;
      }
      break;
  }
}

/* Replace white spaces on the input email */
inputEmail.addEventListener("input", () => {
  inputEmail.value = inputEmail.value.replace(/ /g, "");
})

/* Inputs events */
inputs.forEach((input) => {
  input.addEventListener('blur', validateRegularExpressions);
  input.addEventListener('input', validateRegularExpressions);
});

/* Textarea events */
textarea.addEventListener('blur', validateRegularExpressions);
textarea.addEventListener('input', validateRegularExpressions);

/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!campos.nombre) {
    alertName.classList.add('active');
    location.href = "#contact";
  }

  if (!campos.correo) {
    alertEmail.classList.add('active');
    location.href = "#contact";
  }

  if (!campos.mensaje) {
    alertMessage.classList.add('active');
    location.href = "#contact";
  }

  if (campos.nombre && campos.correo && campos.mensaje) {

    modalContact.classList.add("active");

    emailjs.sendForm('service_jr41wt8', 'template_m5qbqbi', '#form', '24LpnDak6PKXwQT2O').then(() => {
      setTimeout(() => {
        modalContactLoader.style.display = "none";
        modalContactSuccess.style.display = "block";
        form.reset();
      }, 3000);
    },

      (error) => {
        setTimeout(() => {
          modalContactLoader.style.display = "none";
          modalContactError.style.display = "block";
          form.reset();
        }, 3000);
        console.log(error);
      });
  }
});

////////// CLOSE MODAL CONTACT //////////
closeModalContact.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.remove("active");
    location.href = "index.html"
  });
});