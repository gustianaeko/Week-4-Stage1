const testimonials = [
  {
    image:
      "https://api.duniagames.co.id/api/content/upload/file/8927430061676361107.jpg",
    testimony: "Keren Bang!",
    authorName: "Livy",
    rating: 5,
  },

  {
    image:
      "https://assets.skor.id/crop/0x0:820x776/x/photo/2021/05/15/2721465000.jpg",
    testimony: "Sukses terus bang, mantap!",
    authorName: "Angie",
    rating: 4,
  },

  {
    image:
      "https://i.pinimg.com/736x/ad/33/ed/ad33edc320f4c6183d71bc61cec64369.jpg",
    testimony: "Keren banget abang terbaik!",
    authorName: "Vior",
    rating: 5,
  },

  {
    image:
      "https://assets.ggwp.id/2024/01/BOOM-Swan-boom-esports-predator-league-featured-640x360.jpg",
    testimony: "Makasi bang keren banget!",
    authorName: "Swan",
    rating: 3,
  },

  {
    image:
      "https://api.duniagames.co.id/api/content/upload/file/601951691711190152.jpg",
    testimony: "Keren banget abang ini!",
    authorName: "Voni",
    rating: 5,
  },
];

const allTestimonial = () => {
  const testimonialHTML = testimonials.map((el) => {
    return `<div class="testimonialContent">
          <img src="${el.image}" class="profile-testimonial" />
          <p class="quote">${el.testimony}</p>
          <p class="author">- ${el.authorName}</p>
        </div>
        `;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
};

const filterTestimonial = (rating) => {
  const filteredTestimonialByRating = testimonials.filter((el) => {
    return el.rating == rating;
  });

  const testimonialHTML = filteredTestimonialByRating.map((el) => {
    return `<div class="testimonialContent">
          <img src="${el.image}" class="profile-testimonial" />
          <p class="quote">${el.testimony}</p>
          <p class="author">- ${el.authorName}</p>
        </div>
        `;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
};

allTestimonial();
