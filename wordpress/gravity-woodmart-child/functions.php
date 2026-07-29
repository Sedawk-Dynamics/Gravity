<?php
/**
 * WoodMart Child — Gravity Academy.
 *
 * Loads the shared brand identity so this WordPress install and the Next.js
 * frontend (www.gogravity.in) read as one website:
 *   1. Google Fonts: Poppins (display) / Inter (body) / JetBrains Mono (eyebrows).
 *   2. brand-tokens.css — verbatim copy of the frontend's public/brand-tokens.css.
 *      Do not fork values here; update the frontend file and re-copy.
 *   3. gravity-skin.css — maps WoodMart's CSS variables + components to the tokens.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GRAVITY_CHILD_VERSION', '1.0.0' );

/** Fonts + tokens + skin, late in the queue so they win over parent/theme-options CSS. */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'gravity-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'gravity-brand-tokens',
		get_stylesheet_directory_uri() . '/assets/css/brand-tokens.css',
		array(),
		GRAVITY_CHILD_VERSION
	);
	wp_enqueue_style(
		'gravity-skin',
		get_stylesheet_directory_uri() . '/assets/css/gravity-skin.css',
		array( 'gravity-brand-tokens' ),
		GRAVITY_CHILD_VERSION
	);
}, 10000 );

/** Speed up the Google Fonts handshake. */
add_filter( 'wp_resource_hints', function ( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}, 10, 2 );

/**
 * Allow SVG uploads for administrators only (the brand logos are SVG).
 * SVGs are not sanitised by WordPress — keep this admin-gated, or install the
 * "Safe SVG" plugin and remove this filter.
 */
add_filter( 'upload_mimes', function ( $mimes ) {
	if ( current_user_can( 'administrator' ) ) {
		$mimes['svg'] = 'image/svg+xml';
	}
	return $mimes;
} );
