$(function(){"use strict";$(document).on("click.qor.alert",'[data-dismiss="alert"]',function(){$(this).closest(".qor-alert").remove()}),setTimeout(function(){$('.qor-alert[data-dismissible="true"]').remove()},5e3)}),$(function(){"use strict";$(document).on("click.qor.confirm","[data-confirm]",function(e){var a,o=$(this),t=o.data();t.confirm&&(window.confirm(t.confirm)?/DELETE/i.test(t.method)&&(e.preventDefault(),a=t.url||o.attr("href"),t=$.extend({},t,{_method:"DELETE"}),$.post(a,t,function(){window.location.reload()})):e.preventDefault())})}),$(function(){"use strict";var e=$(".qor-page__body > .qor-form-container > form");$(".qor-error > li > label").each(function(){var a=$(this),o=a.attr("for");o&&e.find("#"+o).closest(".qor-field").addClass("is-error").append(a.clone().addClass("qor-field__error"))})}),$(function(){"use strict";var e=(window.location,'<div class="qor-dialog qor-dialog--global-search" tabindex="-1" role="dialog" aria-hidden="true"><div class="qor-dialog-content"><form action=[[actionUrl]]><div class="mdl-textfield mdl-js-textfield" id="global-search-textfield"><input class="mdl-textfield__input" name="keyword" id="globalSearch" value="" type="text" placeholder="" /><label class="mdl-textfield__label" for="globalSearch">[[placeholder]]</label></div></form></div></div>');$(document).on("click",".qor-dialog--global-search",function(e){e.stopPropagation(),$(e.target).parents(".qor-dialog-content").size()||$(e.target).is(".qor-dialog-content")||$(".qor-dialog--global-search").remove()}),$(document).on("click",".qor-global-search--show",function(a){a.preventDefault();var o=$(this).data(),t=window.Mustache.render(e,o);$("body").append(t),componentHandler.upgradeElement(document.getElementById("global-search-textfield")),$("#globalSearch").focus()})}),$(function(){"use strict";$(".qor-menu-container").on("click","> ul > li > a",function(){var e=$(this),a=e.parent(),o=e.next("ul");o.length&&(o.hasClass("in")?(a.removeClass("is-expanded"),o.one("transitionend",function(){o.removeClass("collapsing in")}).addClass("collapsing").height(0)):(a.addClass("is-expanded"),o.one("transitionend",function(){o.removeClass("collapsing")}).addClass("collapsing in").height(o.prop("scrollHeight"))))}).find("> ul > li > a").each(function(){var e=$(this),a=e.parent(),o=e.next("ul");o.length&&(a.addClass("has-menu is-expanded"),o.addClass("collapse in").height(o.prop("scrollHeight")))}),$(".qor-page").find(".qor-page__header").size()&&$(".qor-page").addClass("has-header")}),$(function(){"use strict";var e=window.location;$(".qor-search").each(function(){var a=$(this),o=a.find(".qor-search__input"),t=a.find(".qor-search__clear"),n=!!o.val();a.closest(".qor-page__header").addClass("has-search"),t.on("click",function(){o.val()?o.focus().val(""):n?e.search=e.search.replace(new RegExp(o.attr("name")+"\\=?\\w*"),"").replace("?",""):a.removeClass("is-dirty")})})}),$(function(){"use strict";$(".qor-js-table .qor-table__content").each(function(){var e=$(this),a=e.width(),o=e.parent().width();a>=180&&o>a&&e.css("max-width",o)})});