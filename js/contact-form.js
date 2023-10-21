//Allow only Number input in number fields
// Restricts input for the set of matched elements to the given inputFilter function.
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on(
            'input keydown keyup mousedown mouseup select contextmenu drop',
            function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty('oldValue')) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = '';
                }
            }
        );
    };
})(jQuery);

jQuery(function () {
    jQuery('.number-input').inputFilter(function (value) {
        return /^\d*$/.test(value); // Allow digits only, using a RegExp
    });
})

$("#contactForm").on('submit', function (e) {
    e.preventDefault();
}).validate({
    ignore: ':hidden',
    rules: {
        firstname: {
            required: true,
            minlength: 3,
        },
        lastname: {
            required: true,
            minlength: 3,
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        message: {
            required: true,
            maxlength: 700,
        },
        check: {
            required: true,
            min: 1,
        },
    },
    messages: {
        firstname: {
            required: 'This Field is required',
            minlength: "Names cannot be shorter than 3 characters",
        },
        lastname: {
            required: 'This Field is required',
            minlength: "Names cannot be shorter than 3 characters",
        },
        email: 'Enter a valid email.',
        phone: {
            required: 'This Field is required',
            minlength: 'The phone number must have 10 digits',
            maxlength: 'The phone number must have 10 digits',
        },
        message: {
            required: 'What did you want to say?',
            minlength: 'Please complete your thoughts, then submit.',
        },
        check: {
            required: 'This checkbox must me checked to submit form',
            minlength: 'This checkbox must me checked to submit form',
        },
    },
    submitHandler: function (form) {
        $('.reach-out__submit').prop('disabled', true);
        $('.load-overlay').addClass('active');
        var formData = $("#contactForm").serializeArray();
        var data = {};
        $(formData).each(function (index, obj) {
            if (obj.name != "check") 
                data[obj.name] = obj.value;
        });
        data.toemailid = data.email;
        data.userMessage = data.message;
        delete data.email;
        delete data.message;

        $.ajax({
            type: 'POST',
            url: 'https://cwiindia.com/api/sendemail',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                if (data.toString() === 'true') {
                    $("#contactForm")[0].reset();
                    $('.reach-out__submit').prop('disabled', false);
                    jQuery('#quote-modal').modal('hide');
                    setTimeout(function () {
                        $('.load-overlay').removeClass('active');
                        jQuery('#reach-out-modal').modal('show');
                    }, 1000);
                } else {
                    alert('Something went wrong. Please try again later');
                    $('.load-overlay').removeClass('active');
                    $('.reach-out__submit').prop('disabled', false);
                }
            },
            error: function (errMsg) {
                alert('Something went wrong. Please try again later');
                $('.load-overlay').removeClass('active');
                $('.reach-out__submit').prop('disabled', false);
            },
        });

    }
});
