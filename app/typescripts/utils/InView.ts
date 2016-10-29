/// <reference path="../definitions/jquery/jquery.d.ts"/>

//TODO: Refactor !!!
$.fn.isOnScreen = function(){
    
    var win = $(window);
    
    var viewport: any = {
        top : win.scrollTop() + 300,
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + (win.height() - 300);
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return ( !(
      viewport.right < bounds.left || 
      viewport.left > bounds.right || 
      viewport.bottom < bounds.top || 
      viewport.top > bounds.bottom ));
    
};