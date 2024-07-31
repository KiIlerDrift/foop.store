$(document).ready(function () {
  let isAnimating = false;

  function scrollToSection(section) {
    isAnimating = true;
    $("html, body").animate(
      {
        scrollTop: $(section).offset().top,
      },
      1000,
      function () {
        isAnimating = false;
      }
    );
  }

  $('a[href*="#"]').click(function (event) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        scrollToSection(target);
      }
    }
  });

  let currentSection = 0;
  const sections = $(".section");
  const totalSections = sections.length;

  $(window).on("wheel", function (event) {
    if (!isAnimating) {
      if (event.originalEvent.deltaY > 0) {
        // Scroll down
        if (currentSection < totalSections - 1) {
          currentSection++;
          scrollToSection(sections[currentSection]);
        }
      } else {
        // Scroll up
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(sections[currentSection]);
        }
      }
    }
  });

  $(window).scroll(function () {
    const scrollTop = $(window).scrollTop();
    const square = $(".rotating-square");
    const comingSoon = $("#coming-soon");
    const about = $(".about");
    const scrollThreshold = about.offset().top - $(window).height() / 2;

    if (scrollTop > scrollThreshold) {
      comingSoon.addClass("fade-out");
      about.find(".fade-in").css("opacity", 1);
    } else {
      comingSoon.removeClass("fade-out");
      about.find(".fade-in").css("opacity", 0);
    }

    const rotation = scrollTop / 10;
    square.css("transform", `translate(-50%, -50%) rotate(${rotation}deg)`);
  });

  const arrow = $(".arrow");
  setInterval(() => {
    arrow.toggleClass("bounce");
  }, 1000);
});
