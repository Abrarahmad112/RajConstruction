// Paralax plugin
(function( $ )
{
	var $window = $( window );

	$.fn.parallax = function( xpos, speedFactor )
	{
		xpos = xpos || '50%';
		speedFactor = speedFactor || 0.6;

		return this.each( function()
		{
			var $this = $( this ),
				height = $this.height(),
				top = $this.offset().top;

			// Called whenever the window is scrolled or resized
			function update()
			{
				var pos = $window.scrollTop();

				// Check if totally above or totally below viewport
				if ( top + height < pos || top > pos + $window.height() )
					return;

				$this.css( 'backgroundPosition', xpos + ' ' + Math.round( (top - pos) * speedFactor ) + 'px' );
			}

			$window.on( 'scroll', update );
			update();
		} );
	};
})( jQuery );

jQuery( document ).ready( function( $ )
{
	'use strict';

	/**
	 * Variables
	 */
	var $window = $( window ),
		fluidRows = document.getElementsByClassName( 'row-fluid' );

	/**
	 * Row full width
	 */
	$window.resize( function()
	{
		var wWidth = $( '#page' ).outerWidth(),
			$el = null;

		for ( var i = 0; i < fluidRows.length; i++ )
		{
			$el = $( fluidRows[i] );

			if ( $el.hasClass( 'row-fluid-content' ) )
			{
				var margin = 0;

				if ( $el.hasClass( 'resized' ) )
					margin = ( wWidth - $el.parent().width() ) / 2;
				else
					margin = ( wWidth - $el.width() ) / 2;

				$el.width( wWidth ).addClass( 'resized' );
				$el.css( 'marginLeft', -margin );
			}
			else
			{
				var padding = ( wWidth - $el.parent().width() ) / 2;

				$el.css( {
					paddingLeft: padding,
					paddingRight: padding,
					marginLeft: -padding,
					marginRight: -padding
				} );
			}
		}
	} ).trigger( 'resize' );

	/**
	 * Parallax
	 */
	if ( $window.width() >= 768 )
	{
		$( '.row-background.row-parallax' ).parallax();
	}

	/**
	 * Team members carousel
	 */
	$( '.fitsc-team .team-members' ).owlCarousel( {
		navigation: true,
		navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
		pagination: false
	} );

	/**
	 * Testimonials
	 */
	$( '.fitsc-testimonials' ).owlCarousel( {
		navigation: false,
		pagination: true,
		singleItem: true,
		autoPlay: 5000
	} );

	/**
	 * Shortcode portfolio
	 */
	$( '.fitsc-portfolio' ).each( function()
	{
		var $this = $( this ),
			$projects = $this.children( '.projects' );

		$projects.imagesLoaded( function()
		{
			$projects.shuffle( {
				speed: 500,
				itemSelector: '.project'
			} );
		} );

		$this.on( 'click', '.portfolio-filter a', function( e )
		{
			e.preventDefault();
			var $el = $( this ),
				group = $el.data( 'group' );

			if ( $el.hasClass( 'active' ) )
			{
				return;
			}

			$( this ).addClass( 'active' ).siblings().removeClass( 'active' );

			$projects.shuffle( 'shuffle', group );
		} );
	} );

	/**
	 * Shortcode counter
	 */
	$( '.fitsc-counter .counter' ).counterUp( {
		delay: 20,
		time: 2000
	} );

	/**
	 * Shortcode images carousel
	 */
	$( '.images-carousel' ).owlCarousel( {
		navigation: true,
		navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
		pagination: false,
		autoPlay: 5000,
		afterInit: function()
		{
			window.console.log( this );
		},
		afterAction: function()
		{
			var currentItemClass = 'current-item';
			this.$owlItems.removeClass( 'current-item last-visible' );

			for ( var i = 0; i < this.owl.visibleItems.length; i++ )
			{
				if ( this.owl.visibleItems.length === (i + 1) )
				{
					currentItemClass += ' last-visible';
				}

				this.$owlItems.eq(this.owl.visibleItems[i]).addClass( currentItemClass );
			}
		}
	} );

	/**
	 * Pie chart
	 */
	$( '.piechart' ).circliful();
} );
