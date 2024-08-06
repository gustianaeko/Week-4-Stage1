const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onerror = () => {
      reject("Network error!");
    };

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.send();
  });
};

const allTestimonial = async () => {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/8df4708034507850e03a"
    );

    const testimonialHTML = testimonials.map((el) => {
      return `<div class="testimonialContent">
                      <img
                        src="${el.image}"
                        class="profile-testimonial"
                      />
                      <p class="quote">${el.testimony}</p>
                      <p class="author">- ${el.authorName}</p>
                    </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join(" ");
  } catch (error) {
    alert(error);
  }
};

const filterTestimonial = async (rating) => {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/8df4708034507850e03a"
    );

    const filteredTestimonialByRating = testimonials.filter((el) => {
      return el.rating == rating;
    });

    const testimonialHTML = filteredTestimonialByRating.map((el) => {
      return `<div class="testimonialContent">
                          <img
                            src="${el.image}"
                            class="profile-testimonial"
                          />
                          <p class="quote">${el.testimony}</p>
                          <p class="author">- ${el.authorName}</p>
                        </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join(" ");
  } catch (error) {
    alert(error);
  }
};

allTestimonial();
