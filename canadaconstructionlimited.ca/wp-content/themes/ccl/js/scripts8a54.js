jQuery( document ).ready( function( $ )
{
	'use strict';

	/**
	 * Variables
	 */
	var $window = $( window ),
		$body = $( 'body' ),
		$header = $( '#masthead' );

	/**
	 * Bootstrap Twitter Dropdown: Make the parent follow the link
	 */
	$( '.nav' ).on( 'click', 'a.dropdown-toggle', function () {
		if ( $window.width() > 768 )
			window.location = $( this ).attr( 'href' );
	});

	/**
	 * Footer sidebar bg
	 */
	$window.resize( function()
	{
		var wWidth = $( '#page' ).outerWidth();

		if ( $( '.footer-sidebars' ).length )
		{
			$( '.footer-sidebars-bg' ).width( function()
			{
				var offset = ( wWidth - $( '.footer-sidebars > .container' ).outerWidth() ) / 2;
				return offset + $( '.footer-sidebars .footer-widgets:first-child' ).outerWidth();
			} );
		}
	} ).trigger( 'resize' );

	/**
	 * Fitvids *
	 */
	$( '#main' ).fitVids();

	/**
	 * Toggle search form
	 */
	var $searchFormHeader = $( '#search-form-header' );
	$( '.search-wrapper' ).on( 'click', '.search-icon', function( e )
	{
		e.preventDefault();
		$searchFormHeader.toggleClass( 'active' );
	} );

	$searchFormHeader.find( '.icon-close' ).on( 'click', function( e )
	{
		e.preventDefault();
		$searchFormHeader.removeClass( 'active' );
	} );

	/**
	 * Sticky header
	 */
	if ( $body.hasClass( 'header-sticky' ) )
	{
		var $topbar = $( '#topbar' ),
			offset = $topbar.length ? $topbar.height() : 0;

		$window.scroll( function()
		{
			if ( $window.scrollTop() >= offset )
				$header.addClass( 'sticky' );
			else
				$header.removeClass( 'sticky' );
		} );
	}

	/**
	 * Show/hide meta data
	 */
	$( '.media-info-toggle' ).on( 'click', function()
	{
		$( this ).prev().slideToggle( 'slow' );
		$( this ).toggleClass( 'active' );
	} );

	/**
	 * Portfolio detail gallery slider
	 */
	$( '.project-images' ).owlCarousel( {
		navigation: false,
		pagination: true,
		autoPlay: 5000,
		singleItem: true,
		autoHeight: true
	} );

	/**
	 * Gallery lightbox
	 */
	$( '.gallery .gallery-item a' ).colorbox( {
		rel: true,
		slideshow: false,
		current: false,
		previous: '<i class="fa fa-long-arrow-left"></i>',
		next: '<i class="fa fa-long-arrow-right"></i>',
		close: '<i class="fa fa-remove"></i>'
	} );
} );
