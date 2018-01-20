(function($){

    function getDataTransder() {
        // https://stackoverflow.com/questions/47119426/how-to-set-file-objects-and-length-property-at-filelist-object-where-the-files-a/47172409
        return new ClipboardEvent('').clipboardData || new DataTransfer();
    };
   
    $(function(){
        // add/remove paste marker on hover
        var rows = $('div.form-row').has('input[data-past-image]');
        rows.on('mouseenter', function(){
            $(this).find('input[data-past-image]').after($("<span class='paste-image'>Ctrl+V (Command+V)</span>"));
        });
        rows.on('mouseleave', function(){
            $(this).find('span.paste-image').remove();
        });
    });

    $(document).on('paste', function(e){
        // process if data in clipboard present
        if (!e.originalEvent.clipboardData) {
            return false;
        };
        // process if paste marker present
        if ($('span.paste-image').length<1) {
            return false;
        };
        var cd = e.originalEvent.clipboardData;
        // loop looking for image file
        $.each(cd.items, function(k,v){
            if (v.kind=='file' && v.type.indexOf("image") !== -1) {
                var inp = $('span.paste-image').closest('.form-row').find('input[type=file]')[0];
                var dt = getDataTransder();
                dt.items.add(v.getAsFile());
                inp.files = dt.files;            
                return false;
            };
        });

    });

})(django.jQuery);