angular.module('fluro.util').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('fluro/ui/columns.html',
    "<div class=columns><div class=\"outer cf\"><div class=wrapper><div class=column-{{columnWidth}} ng-repeat=\"item in model\"><render ng-model=item></render></div></div></div></div>"
  );


  $templateCache.put('fluro/ui/countdown.html',
    ""
  );


  $templateCache.put('fluro/ui/gallery.html',
    "<div class=gallery><div class=outer><div class=wrapper><div class=slideshow ng-swipe-right=previous() ng-swipe-left=next()><div class=slideshow-contents><div class=\"gallery-slide slide animated\" ng-class={active:isActive(image)} ng-repeat=\"image in model\"><img fluro-image=image._id alt={{image.title}} image-height=\"1200\"></div></div><div class=slideshow-controls ng-if=\"playlist.length > 1\"><div class=slideshow-controls-wrapper><a class=\"slideshow-control slideshow-previous\" ng-click=previous()><i class=\"fa fa-chevron-left\"></i></a> <a class=\"slideshow-control slideshow-next\" ng-click=next()><i class=\"fa fa-chevron-right\"></i></a></div></div><div class=slideshow-nav ng-if=\"playlist.length > 1\"><a ng-click=select(item) ng-repeat=\"item in playlist.items\" ng-class={active:isActive(item)}><i class=fa ng-class=\"{'fa-circle-o':!isActive(item), 'fa-circle':isActive(item)}\"></i></a></div></div><div class=gallery-thumbs><slider><div class=gallery-thumb ng-class={active:isActive(image)} ng-click=playlist.select(image) ng-repeat=\"image in model\"><img fluro-image=image._id alt={{image.title}} image-width=320 image-height=\"320\"></div></slider></div></div></div></div>"
  );


  $templateCache.put('fluro/ui/slide.html',
    "<div class=\"slide animated\" ng-class=\"{'active':active}\" ng-transclude></div>"
  );


  $templateCache.put('fluro/ui/slideshow.html',
    "<div class=slideshow ng-swipe-right=previous() ng-swipe-left=next()><div class=slideshow-contents ng-transclude></div><div class=slideshow-controls ng-if=\"playlist.length > 1\"><div class=slideshow-controls-wrapper><a class=\"slideshow-control slideshow-previous\" ng-click=previous()><i class=\"fa fa-chevron-left\"></i></a> <a class=\"slideshow-control slideshow-next\" ng-click=next()><i class=\"fa fa-chevron-right\"></i></a></div></div><div class=slideshow-nav ng-if=\"playlist.length > 1\"><a ng-click=select(item) ng-repeat=\"item in playlist.items\" ng-class={active:item.active}><i class=fa ng-class=\"{'fa-circle-o':!item.active, 'fa-circle':item.active}\"></i></a></div></div>"
  );

}]);
