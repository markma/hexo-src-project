define([], function () {
    return {
        page: 1,
        offset: 20,
        init: function () {
            var that = this;
            $.getJSON("/photos/output.json", function (data) {
                that.render(that.page, data);
                that.scroll(data);
            });
        },

        render: function (page, data) {
            var begin = (page - 1) * this.offset;
            var end = page * this.offset;
            if (begin >= data.length) return;
            var html, li = "";
            for (var i = begin; i < end && i < data.length; i++) {
                li += '<li><div class="img-box">' +
                    '<a class="img-bg" rel="example_group" href="https://o48qtc2r4.qnssl.com/' + data[i] + '"></a>' +
                    '<img lazy-src="https://o48qtc2r4.qnssl.com/' + data[i] + '?imageView2/1/w/200/h/200/interlace/1" />' +
                    '</li>';
            }

            $(".img-box-ul").append(li);
            $(".img-box-ul").lazyload();
            $("a[rel=example_group]").fancybox();
        },

        scroll: function (data) {
            var that = this;
            $(window).scroll(function() {
                var windowPageYOffset = window.pageYOffset;
                var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                var sensitivity = 0;

                var offsetTop = $(".photos").offset().top + $(".photos").height();

                if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                    that.render(++that.page, data);
                }
            })
        }
    }
})
