import { Component } from '@angular/core';
import $ from "jquery";

$(document).ready(function(){

  $('.navtoggle').on('click',function(e){
  e.preventDefault();
  $(this).toggleClass('active');
  $('.nav-overlay').toggleClass('active');
  $('.nav-overlay .scalepoint span').toggleClass('animate');  
  $('.searchtoggle').toggle();  
  $('.menulayer').toggleClass('active');  
  });
  
  $('.searchtoggle').on('click',function(e){
  e.preventDefault();
  $('.navtoggle').toggle();
  $(this).toggleClass('active');
  $('.search-overlay').toggleClass('active');
  $('.search-overlay .scalepoint span').toggleClass('animate');  
  });
  
  
      var $pageHeader = $('.page-header');
  
      if( $pageHeader.hasClass('parallax') ) {
        $( window ).scroll(function() {
          var documentScrollTop = $(document).scrollTop(),
              headerHeight = $pageHeader.height(),
              $parallaxBg = $('.parallax-bg');
  
          /*$parallaxBg.css('top', (documentScrollTop*0.5));*/
          $parallaxBg.css('opacity', (1 - documentScrollTop/headerHeight*1));
  
        });
      }
  
  });
    

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodapp';
}
