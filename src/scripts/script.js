/** Behaviour logic: */

$( () => {

  const accordConfig =
    {
      collapsible: true,
      animate: 150
    }

  $( "#accordion" ).accordion(accordConfig);

  $('.panel-top').on('click', () => {
    $('.icon-open').toggleClass('rotate');
    $('.panel-top').toggleClass('round-corners');
  })

  $('button').on('click', () => $('.input-name').focus() );
} );
