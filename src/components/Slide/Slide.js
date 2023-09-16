import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery
import './Slide.css';

function Slide() {
  useEffect(() => {
    // Your provided JavaScript code goes here
    $(document).ready(function()
{
  /*
    Globals
  */

  /* Auto Slider */
  let auto_slide = true;
  let auto_slide_interval = null;

  /*
    Slide Carousel Display
  */

  /* insert last div before first */
  function insert_before_first()
  {
    let first_slide = $(".slide-carousel .slides .slide:first-child");
    let last_slide = $(".slide-carousel .slides .slide:last-child");

    last_slide.insertBefore(first_slide);
  } insert_before_first();

  /* set Slide Carousel Height */
  function set_slide_carousel_height()
  {
    let browser_width = $(window).width();

    let square = browser_width / 4;

    $(".slide-carousel").css({
      "height":square,
      "min-height":square
    });
  } set_slide_carousel_height();

  /* Slide Carousel Dots */
  function slide_carousel_dots()
  {
    let slide_carousel = $(".slide-carousel");

    slide_carousel.each(function()
    {
      let id = $(this).attr("id");
      let slide = $(".slide-carousel#"+id+" .slides .slide");

      let slides_amount = slide.length;

      for (let i = 1; i <= slides_amount; i++)
      {
        $(".slide-carousel#"+id+" .dots").append("<div class='dot' id='dot"+i+"'></div>");
      }
    });
  } slide_carousel_dots();

  /* Slides out of View */
  function slides_out_of_view()
  {
    let cur_slide = 0;

    let browser_width = $(window).width();
    let slide = $(".slide-carousel .slides .slide");
    let slide_width = slide.width();

    let slide_offset = 0;
    let slide_offset_x = 0;

    // set Navigation Arrows height
    $(".slide-carousel .arrow-left, .slide-carousel .arrow-right").css({
      "height": slide.height()+"px",
      "line-height": slide.height()+"px"
    });

    slide.each(function()
    {
      slide_offset = $(this).offset();
      slide_offset_x = slide_offset.left;

      // Frames out Right
      if (((slide_offset_x + slide_width) > browser_width) || (slide_offset_x < 0))
      {
        $(this).css("opacity", "0.3");
        $(this).css("pointer-events", "none");

        let cur_element = $(this).attr("id").substr($(this).attr("id").length - 1);

        $(".slide-carousel .dots .dot#dot"+cur_element).css("background-color","#4a4b50");

        $(".slide-carousel .slides .slide span.title").css("left", "200px");
        $(".slide-carousel .slides .slide span.title").css("opacity", "0");
      } else {
        $(this).animate({opacity: 1}, 300);
        $(this).css("pointer-events", "auto");

        cur_slide = $(this).attr("id").substr($(this).attr("id").length - 1);
        let cur_element = $(this).attr("id").substr($(this).attr("id").length - 1);
        $(".slide-carousel .dots .dot#dot"+cur_element).css("background-color","#fff");

        $(".slide-carousel .slides .slide span.title").delay(500).animate({ opacity: 1, left: 0 }, 'linear');
      }
    });

    return cur_slide;
  } slides_out_of_view();

  /* Slide */
  function slide(side, steps)
  {
    let single_slide = $(".slide-carousel .slides .slide");
    let slide_width = single_slide.width() + 15;

    if (side === 0)
    {
      let animate_left = function() {
        $(".slide-carousel .slides").stop().animate({
          'padding-left': slide_width,
          scrollLeft: "-="+slide_width
        }, 200, 'linear', function() {
          $(this).css("padding-left", "0");
          $(this).scrollLeft(0).find("div:first").before($("div:last", this));
          slides_out_of_view();
        });
      }

      for (let i = 1; i <= steps; i++)
      {
        setTimeout(function() {
          animate_left();
        }, 300 * i);
      }
    }
    else if (side === 1)
    {
      let animate_right = function() {
        $(".slide-carousel .slides").stop().animate({
          scrollLeft: "+="+slide_width
        }, 200, 'linear', function() {
          $(this).scrollLeft(0).find("div:last").after($("div:first", this));
          slides_out_of_view();
        });
      }

      for (let i = 1; i <= steps; i++)
      {
        setTimeout(function() {
          animate_right();
        }, 300 * i);
      }
    }
  }

  /* Auto Slider */
  function auto_slider()
  {
    if (auto_slide_interval)
      clearInterval(auto_slide_interval);
    
    if (auto_slide === true)
    {
      $(".slide-carousel .auto-play i#play-slider").hide();
      $(".slide-carousel .auto-play i#pause-slider").show();
      auto_slide_interval = setInterval(function(){ slide(1, 1) }, 5000);
    } else {
      $(".slide-carousel .auto-play i#pause-slider").hide();
      $(".slide-carousel .auto-play i#play-slider").show();
    }
  } auto_slider();
  
  /* Autoplay/-pause Button */
  function auto_play()
  {
    $(".slide-carousel .auto-play i").click(function(e)
                           {
      e.preventDefault();
      auto_slide = !auto_slide;
      auto_slider();
    });
  } auto_play();

  /* Slide Carousel Navigation */
  function slide_carousel_navigation()
  {
    $(".slide-carousel .arrow-left").click(function(e)
    {
      e.preventDefault();
      slide(0, 1);
      auto_slider();
    });

    $(".slide-carousel .arrow-right").click(function(e)
    {
      e.preventDefault();
      slide(1, 1);
      auto_slider();
    });

    $(".slide-carousel .dots .dot").click(function()
    {
      let index = $(this).index() + 1;
      let cur_slide = slides_out_of_view();
      let slide_total = 0;

      if (index > cur_slide)
      {
        slide_total = index - cur_slide;
        slide(1, slide_total);
        auto_slider();
      }
      else if (index < cur_slide)
      {
        slide_total = cur_slide - index;
        slide(0, slide_total);
        auto_slider();
      }
    });
  } slide_carousel_navigation();

  /* Mouse Navigation */
  function slide_mouse_navigation()
  {
    // Strip-Carousel Frames Container
    let frame = $(".slide-carousel .slides");

    // Strip-Carousel Id
    

    // Mouse axis positions
    let mouse_x_pos = 0;
    

    // Mouse sensivity
    let mouse_sensivity = 30;

    // Mouse Left click position
    let mouse_x_pos_clicked = 0;

    // current Frames position
    //let cur_frames_pos_x = 0;

    // MouseOver Frames Container
    frame.mouseover(function()
    {
    let carousel_id = "";
      // Strip-Carousel Id
      carousel_id = $(this).parent().attr("id");
    })
    // MouseOut Frames Container
    .mouseout(function()
    {

    });

    // Mouse Move
    frame.mousemove(function(e)
    {
        let mouse_y_pos = 0;
      // Mouse X axis
      mouse_x_pos = e.pageX;

      // Mouse Y axis
      mouse_y_pos = e.pageY;
    });

    // Mouse Buttons pressed
    frame.mousedown(function(event)
    {
        let mouse_y_pos_clicked = 0;
      // Mouse Left click X position
      mouse_x_pos_clicked = event.pageX;

      // Mouse Left click Y position
      mouse_y_pos_clicked = event.pageY;

      event.preventDefault();
    })
    // Mouse Buttons released
    .mouseup(function(event)
    {
      // move Left, scroll Right
      if (mouse_x_pos_clicked > (mouse_x_pos + mouse_sensivity))
      {
        slide(1, 1);
        auto_slider();
      }
      // move Right, scroll Left
      else if (mouse_x_pos_clicked < (mouse_x_pos - mouse_sensivity))
      {
        slide(0, 1);
        auto_slider();
      }
    });
  } slide_mouse_navigation();

  /* Touch Navigation */
  function slide_touch_navigation()
  {
    // Strip-Carousel Frames Container
    let frames = $(".slide-carousel .slides");

    // Strip-Carousel Id
    //let carousel_id = "";

    // Touch Start positions
    let touchstart_pos_x = 0;
    let touchstart_pos_y = 0;

    // Touch Move positions
    let touchmove_pos_x = 0;
    let touchmove_pos_y = 0;

    // Touch End positions
    let touchend_pos_x = 0;
    let touchend_pos_y = 0;

    // on Touch Start
    frames.on("touchstart", function(e)
    {
        let carousel_id = "";
      // get Touch Start X position
      touchstart_pos_x = e.touches[0].clientX;

      // get Touch Start Y position
      touchstart_pos_y = e.touches[0].clientY;

      // get Strip-Carousel Id
      carousel_id = $(this).parent().attr("id");
    })
    // on Touch Move
    .on("touchmove", function(e)
    {

    })
    // on Touch End
    .on("touchend", function(e)
    {
      // get Touch End X position
      touchend_pos_x = e.changedTouches[0].clientX - touchstart_pos_x;

      // get Touch End Y position
      touchend_pos_y = e.changedTouches[0].clientY - touchstart_pos_y;

      if (touchend_pos_x > 30)
      {
        e.preventDefault();
        slide(0, 1);
        auto_slider();
      }
      else if (touchend_pos_x < -30)
      {
        e.preventDefault();
        slide(1, 1);
        auto_slider();
      }
    });
  } slide_touch_navigation();
  
  /* Window on Resize */
  $(window).resize(function()
  {
    set_slide_carousel_height();
    slides_out_of_view();
  });
});
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
    <div className="slide-container">
    
      <div className="wrapper noselect">
        <div className="slide-carousel" id="one">
          <div className="arrow-left">&lsaquo;</div>
          <div className="arrow-right">&rsaquo;</div>

          <div className="slides">
            <div className="slide" id="slide1"><span className="title"></span></div>
            <div className="slide" id="slide2"><span className="title"></span></div>
            <div className="slide" id="slide3"><span className="title"></span></div>
            <div className="slide" id="slide4"><span className="title"></span></div>
            <div className="slide" id="slide5"><span className="title"></span></div>
          </div>

          <div className="auto-play">
            <i className="fas fa-play" id="play-slider"></i>
            <i className="fas fa-pause" id="pause-slider"></i>
          </div>
          <div className="dots"></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Slide;
