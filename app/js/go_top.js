(function (global, $) {

    "use strict";

    var dyscrollup = {};

    dyscrollup.option = {
        showafter: '300',
        scrolldelay: '500',
        position: 'right',
        image: "",
        shape: 'elem',
        width: 40,
        height: 40
    };

    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    dyscrollup.init = function (option) {
        if (typeof option !== "undefined") {
            this.option = extendSource(option, this.option);
        }
        this.createBtn();
        this.onscroll();
        this.onclick();
    };

    dyscrollup.createBtn = function () {
        var
            self = this,
            html, btn, img;

        html = "<div id='dyscrollup-btn'></div>";
        $("body").prepend(html);

        btn = $("#dyscrollup-btn");
        switch (self.option.position) {
            case 'left':
                btn.css('left', '30px');
                break;

            case 'right':
                btn.css('right', '30px');
                break;
        }

        if (self.option.image.length > 0) {
            btn.css('background', 'url(' + self.option.image + ') center center no-repeat');
        } else {
            btn.css({
                'text-align': 'center',
                'font-size': '30px',
                'line-height': '1em'
            }).html('&#8593;');
        }

        btn = $("#dyscrollup-btn");
        if (self.option.shape === 'elem') {
            btn.css('border-radius', '3px');
        }

        btn.css('width', self.option.width)
            .css('height', self.option.height);
    };

    dyscrollup.onclick = function () {
        var
            self = this;

        $("body").on("click", "#dyscrollup-btn", function (e) {
            e.preventDefault();
            if (!$(this).hasClass("click-locked")) {
                $("html, body").animate({
                    scrollTop: 0
                }, self.option.scrolldelay);
                $(this).addClass("click-locked");
            }
            return false;
        });
    };

    dyscrollup.onscroll = function () {
        var
            self = this;

        $(window).on("scroll", function (e) {
            if ($(window).scrollTop() > self.option.showafter) {
                $('#dyscrollup-btn')
                    .fadeIn();
            } else {
                $('#dyscrollup-btn')
                    .fadeOut()
                    .removeClass("click-locked");
            }
        });
    };

    global.dyscrollup = dyscrollup;

}(typeof window !== "undefined" ? window : this,
    typeof jQuery !== "undefined" ? jQuery : undefined));