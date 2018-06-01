/* global redux_change, wp */

(function ($) {
	"use strict";
	$.redux = $.redux || {};
	$(document).ready(function () {
		$.redux.wbc_importer();
	});
	$.redux.wbc_importer = function () {

		// handler to the ajax request
		var xhrPool = [],
			$importer_wrap;

		$('.wrap-importer.theme.not-imported, #wbc-importer-reimport').unbind('click').on('click', function (e) {

			e.preventDefault();

			$importer_wrap = jQuery(this);
			var reimport = false;
			var message = 'Import Demo Content?';
			var max_progress_repeat = 24;

			if (e.target.id == 'wbc-importer-reimport') {

				reimport = true;
				message = 'Re-Import Content?';

				if (!jQuery(this).hasClass('rendered')) {
					$importer_wrap = jQuery(this).parents('.wrap-importer');
				}

			}

			if ($importer_wrap.hasClass('imported') && reimport == false) return;

			if ($.isEmptyObject(xhrPool)) {
				var r = confirm(message);
				if (r == false) return;
			}

			if (reimport == true) {
				$importer_wrap.removeClass('active imported').addClass('not-imported');
			}

			$importer_wrap.find('.spinner').css('display', 'inline-block');
			$importer_wrap.removeClass('active imported');
			$importer_wrap.find('.importer-button').hide();

			var data = jQuery(this).data();

			data.action = "redux_wbc_importer";
			data.demo_import_id = $importer_wrap.attr("data-demo-id");
			data.nonce = $importer_wrap.attr("data-nonce");
			data.type = 'import-demo-content';
			data.wbc_import = (reimport == true) ? 're-importing' : ' ';
			$importer_wrap.find('.wbc_image').css('opacity', '0.5');

			// if there is a previous ajax request, then we abort it and then set xhr to null
			if (!$.isEmptyObject(xhrPool)) {

				console.log(xhrPool);

				$.each(xhrPool, function (idx, jqXHR) {
					jqXHR.abort();
				});

				xhrPool = [];

			} else {

				console.log('empty xhrPool');

			}

			// and now we can safely make another ajax request since the previous one is aborted
			$.ajax({
				url: ajaxurl,
				type: 'POST',
				data: data,
				beforeSend: function (jqXHR, settings) {
					xhrPool.push(jqXHR);
				}
			}).done(function (response) {

				$importer_wrap.find('.wbc_image').css('opacity', '1');
				$importer_wrap.find('.spinner').css('display', 'none');

				if (response.length > 0 && response.match(/Have fun!/gi)) {

					console.log('importer success: Finish');

					if (reimport == false) {
						$importer_wrap.addClass('rendered').find('.wbc-importer-buttons .importer-button').removeClass('import-demo-data');

						var reImportButton = '<div id="wbc-importer-reimport" class="wbc-importer-buttons button-primary import-demo-data importer-button">Re-Import</div>';
						$importer_wrap.find('.theme-actions .wbc-importer-buttons').append(reImportButton);
					}
					$importer_wrap.find('.importer-button:not(#wbc-importer-reimport)').removeClass('button-primary').addClass('button').text('Imported').show();
					$importer_wrap.find('.importer-button').attr('style', '');
					$importer_wrap.addClass('imported active').removeClass('not-imported');
					location.reload(true);

				} else {

					console.log('importer success: return');
					$importer_wrap.trigger('click');

				}

			}).fail(function () {

				console.log('importer: fail')
				$importer_wrap.trigger('click');

			});

			if (!$importer_wrap.find('.wbc-progress-back').length) {
				$importer_wrap.prepend('<div class="wbc-progress-back"><div class="wbc-progress-bar button-primary"><span class="wbc-progress-count">0%</span></div>');
			}

			setTimeout(function () {
				wbc_show_progress(data, $importer_wrap, max_progress_repeat);
			}, 2000);

			return false;

		});

		function wbc_show_progress(data, $importer_wrap, max_progress_repeat) {

			data.action = 'redux_wbc_importer_progress';

			jQuery.ajax({
				url: ajaxurl,
				data: data,
				beforeSend: function (jqXHR, settings) {
					xhrPool.push(jqXHR);
				},
				success: function (response) {

					var obj = jQuery.parseJSON(response);

					if (response.length > 0 && typeof obj == 'object') {

						if (obj.imported_count != obj.total_post) {

							console.log('Total: ' + obj.total_post);
							console.log('Imported: ' + obj.imported_count);

							var percentage = Math.floor((obj.imported_count / obj.total_post) * 100);

							var current_percentage = $importer_wrap.find('.wbc-progress-count').text().replace('%', '');

							if (percentage >= current_percentage) {
								percentage = (percentage > 0) ? percentage - 1 : percentage;
								$importer_wrap.find('.wbc-progress-bar').css('width', percentage + "%");
								$importer_wrap.find('.wbc-progress-count').text(percentage + "%");
							}

							if (percentage == current_percentage) {
								max_progress_repeat--;
							} else {
								max_progress_repeat = 20;
							}

							if (max_progress_repeat == 1) {
								console.log('Progress repeat: ' + max_progress_repeat);
								$importer_wrap.trigger('click');
							}

							setTimeout(function () {
								wbc_show_progress(data, $importer_wrap, max_progress_repeat);
							}, 2000);

						}

					} else {

						setTimeout(function () {
							wbc_show_progress(data, $importer_wrap, max_progress_repeat);
						}, 2000);

					}

				},
				fail: function () {
					setTimeout(function () {
						wbc_show_progress(data, $importer_wrap, max_progress_repeat);
					}, 2000);
				},
				complete: function (jqXHR) {
					xhrPool.splice($.inArray(jqXHR, xhrPool), 1);
				}
			});

		} // end wbc_show_progress

	};

})(jQuery);