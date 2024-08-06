class Testimonial {
  constructor(image, testimony, authorName) {
    this.image = image;
    this.testimony = testimony;
    this.authorName = authorName;
  }

  html() {
    return `<div class="testimonialContent">
      <img src="${this.image}" class="profile-testimonial" />
      <p class="quote">${this.testimony}</p>
      <p class="author">- ${this.authorName}</p>
    </div>`;
  }
}

const testimonial1 = new Testimonial(
  "https://api.duniagames.co.id/api/content/upload/file/8927430061676361107.jpg",
  "Keren Bang!",
  "Livy"
);

const testimonial2 = new Testimonial(
  "https://assets.skor.id/crop/0x0:820x776/x/photo/2021/05/15/2721465000.jpg",
  "Sukses terus bang, mantap!",
  "Angie"
);

const testimonial3 = new Testimonial(
  "https://i.pinimg.com/736x/ad/33/ed/ad33edc320f4c6183d71bc61cec64369.jpg",
  "Keren banget abang terbaik!",
  "Vior"
);

const testimonial4 = new Testimonial(
  "https://assets.ggwp.id/2024/01/BOOM-Swan-boom-esports-predator-league-featured-640x360.jpg",
  "Makasi bang keren banget!",
  "Swan"
);

const testimonial5 = new Testimonial(
  "https://api.duniagames.co.id/api/content/upload/file/601951691711190152.jpg",
  "Keren banget abang ini!",
  "Voni"
);

const testimonials = [
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
];

let tesmonialHTML = ``;

for (let i = 0; i < testimonials.length; i++) {
  tesmonialHTML += testimonials[i].html();
}

document.getElementById("testimonials").innerHTML = tesmonialHTML;
