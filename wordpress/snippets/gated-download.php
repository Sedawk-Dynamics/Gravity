<?php
/**
 * Gravity — gated downloads (lead-capture popup before file access).
 * Gates: links with class="gv-gated", and every .pdf link on blog posts.
 * Email: browser posts straight to Web3Forms (same access key + FormData
 * pattern as the gogravity.in contact page) → info@gogravity.in.
 * Backup: every lead is also stored in WP Admin → "Download Leads".
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ── 1. Leads post type (visible only in wp-admin) ─────────────────────────── */
add_action( 'init', function () {
	register_post_type( 'gv_lead', array(
		'label'        => 'Download Leads',
		'public'       => false,
		'show_ui'      => true,
		'menu_icon'    => 'dashicons-download',
		'supports'     => array( 'title' ),
		'map_meta_cap' => true,
	) );
} );

add_filter( 'manage_gv_lead_posts_columns', function ( $cols ) {
	return array(
		'cb'       => $cols['cb'],
		'title'    => 'Name',
		'gv_email' => 'Email',
		'gv_phone' => 'Phone',
		'gv_file'  => 'File',
		'date'     => 'Date',
	);
} );
add_action( 'manage_gv_lead_posts_custom_column', function ( $col, $post_id ) {
	if ( 'gv_email' === $col ) {
		echo esc_html( get_post_meta( $post_id, 'gv_email', true ) );
	} elseif ( 'gv_phone' === $col ) {
		echo esc_html( get_post_meta( $post_id, 'gv_phone', true ) );
	} elseif ( 'gv_file' === $col ) {
		$file = get_post_meta( $post_id, 'gv_file', true );
		echo $file ? '<a href="' . esc_url( $file ) . '" target="_blank" rel="noopener">' . esc_html( basename( parse_url( $file, PHP_URL_PATH ) ) ) . '</a>' : '—';
	}
}, 10, 2 );

/* ── 2. AJAX endpoint — stores the lead locally (email goes via Web3Forms) ── */
add_action( 'wp_ajax_gv_gate_lead', 'gv_gate_lead_handler' );
add_action( 'wp_ajax_nopriv_gv_gate_lead', 'gv_gate_lead_handler' );
function gv_gate_lead_handler() {
	check_ajax_referer( 'gv_gate', 'nonce' );

	if ( ! empty( $_POST['website'] ) ) { // honeypot
		wp_send_json_success();
	}

	$name  = sanitize_text_field( wp_unslash( $_POST['name'] ?? '' ) );
	$email = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
	$phone = preg_replace( '/[^0-9+\s-]/', '', wp_unslash( $_POST['phone'] ?? '' ) );
	$file  = esc_url_raw( wp_unslash( $_POST['file'] ?? '' ) );
	$page  = sanitize_text_field( wp_unslash( $_POST['page'] ?? '' ) );

	if ( '' === $name || ! is_email( $email ) || strlen( preg_replace( '/\D/', '', $phone ) ) < 10 ) {
		wp_send_json_error( array( 'message' => 'Please fill all fields correctly.' ) );
	}

	wp_insert_post( array(
		'post_type'   => 'gv_lead',
		'post_status' => 'private',
		'post_title'  => $name . ' — ' . $email,
		'meta_input'  => array(
			'gv_email' => $email,
			'gv_phone' => $phone,
			'gv_file'  => $file,
			'gv_page'  => $page,
		),
	) );

	wp_send_json_success();
}

/* ── 3. Popup markup + styles + logic (blog posts only) ────────────────────── */
add_action( 'wp_footer', function () {
	if ( ! is_singular( 'post' ) ) {
		return;
	}
	$nonce = wp_create_nonce( 'gv_gate' );
	$ajax  = admin_url( 'admin-ajax.php' );
	?>
	<div id="gv-gate" hidden>
		<div class="gv-gate-backdrop" data-gv-close></div>
		<div class="gv-gate-card" role="dialog" aria-modal="true" aria-labelledby="gv-gate-title">
			<button type="button" class="gv-gate-x" data-gv-close aria-label="Close">&times;</button>
			<h3 id="gv-gate-title">Get your free download</h3>
			<p>Fill in your details and the file will open right away.</p>
			<form id="gv-gate-form" novalidate>
				<input type="text" name="name" placeholder="Full name" required autocomplete="name" />
				<input type="email" name="email" placeholder="Email address" required autocomplete="email" />
				<input type="tel" name="phone" placeholder="Phone number" required autocomplete="tel" />
				<input type="checkbox" name="botcheck" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px" />
				<button type="submit">View &amp; download</button>
				<span class="gv-gate-err" role="alert"></span>
			</form>
		</div>
	</div>
	<style>
		#gv-gate { position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
		#gv-gate[hidden] { display: none; }
		.gv-gate-backdrop { position: absolute; inset: 0; background: rgba(10, 15, 31, 0.55); }
		.gv-gate-card { position: relative; width: 100%; max-width: 400px; background: #fff; border-radius: 16px; padding: 1.75rem; box-shadow: 0 18px 48px rgba(1, 40, 119, 0.25); font-family: 'Inter', system-ui, sans-serif; }
		.gv-gate-card h3 { font-family: 'Poppins', system-ui, sans-serif; color: #012877; font-size: 1.35rem; font-weight: 700; margin: 0 0 0.4rem; }
		.gv-gate-card p { color: #7086b2; font-size: 0.9rem; margin: 0 0 1.1rem; }
		.gv-gate-x { position: absolute; top: 0.75rem; right: 0.75rem; width: 36px; height: 36px; border: 0; background: #f6f8fc; border-radius: 10px; font-size: 1.3rem; line-height: 1; color: #012877; cursor: pointer; }
		.gv-gate-x:hover { background: #d4dae8; }
		#gv-gate-form { display: grid; gap: 0.7rem; }
		#gv-gate-form input { width: 100%; border: 1px solid #d4dae8; border-radius: 12px; padding: 0.7rem 0.9rem; font: inherit; color: #0a0f1f; }
		#gv-gate-form input:focus { outline: none; border-color: #fd5e03; box-shadow: 0 0 0 3px rgba(253, 94, 3, 0.18); }
		#gv-gate-form button[type="submit"] { border: 0; border-radius: 12px; padding: 0.8rem 1rem; background: #fd5e03 !important; color: #ffffff !important; font-family: 'Poppins', system-ui, sans-serif; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background-color 0.2s ease; }
		#gv-gate-form button[type="submit"]:hover { background: #012877 !important; color: #ffffff !important; }
		#gv-gate-form button[disabled] { opacity: 0.6; pointer-events: none; }
		.gv-gate-err { color: #c0392b; font-size: 0.85rem; min-height: 1em; }
	</style>
	<script>
	(function () {
		var modal = document.getElementById('gv-gate');
		var form = document.getElementById('gv-gate-form');
		var err = modal.querySelector('.gv-gate-err');
		var targetUrl = '';
		var DONE_KEY = 'gv_gate_done';

		function openFile(url) { window.open(url, '_blank', 'noopener'); }
		function show() { modal.hidden = false; form.querySelector('[name=name]').focus(); }
		function hide() { modal.hidden = true; err.textContent = ''; }

		document.addEventListener('click', function (e) {
			var a = e.target.closest && e.target.closest('a');
			if (!a || !a.href) return;
			var gated = a.classList.contains('gv-gated') || /\.pdf($|\?)/i.test(a.href);
			if (!gated) return;
			e.preventDefault();
			if (localStorage.getItem(DONE_KEY)) { openFile(a.href); return; }
			targetUrl = a.href;
			show();
		});

		modal.addEventListener('click', function (e) {
			if (e.target.hasAttribute && e.target.hasAttribute('data-gv-close')) hide();
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !modal.hidden) hide();
		});

		form.addEventListener('submit', async function (e) {
			e.preventDefault();
			var btn = form.querySelector('[type=submit]');
			var originalText = btn.textContent;
			btn.disabled = true; btn.textContent = 'Sending...'; err.textContent = '';

			// 1) Email via Web3Forms — straight from the browser, FormData,
			//    same access key + pattern as the gogravity.in contact page.
			var w3 = new FormData(form);
			w3.append('access_key', 'd12803be-3286-4862-84d6-68784d9e49cd');
			w3.append('subject', 'New download lead: ' + (form.name.value || ''));
			w3.append('from_name', 'Gravity Blog — Download Gate');
			w3.append('file', targetUrl);
			w3.append('page', document.title);

			try {
				var response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: w3 });
				var data = await response.json();

				if (data.success) {
					// 2) Backup: store the lead in WP (fire-and-forget).
					var wp = new FormData(form);
					wp.append('action', 'gv_gate_lead');
					wp.append('nonce', '<?php echo esc_js( $nonce ); ?>');
					wp.append('file', targetUrl);
					wp.append('page', document.title);
					fetch('<?php echo esc_url( $ajax ); ?>', { method: 'POST', body: wp }).catch(function () {});

					localStorage.setItem(DONE_KEY, '1');
					hide();
					openFile(targetUrl);
				} else {
					err.textContent = (data && data.message) || 'Something went wrong. Please try again.';
				}
			} catch (error) {
				err.textContent = 'Network error. Please try again.';
			} finally {
				btn.disabled = false;
				btn.textContent = originalText;
			}
		});
	})();
	</script>
	<?php
} );
