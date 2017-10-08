define(function ()
{
    function Editor(editorElem)
    {
        this.editorElem = editorElem;
        this.inputs = [];
    }

    Editor.prototype.addBinding = function (name, obj, callback)
    {
        var control = document.createElement('div');
        $(control).attr('id', name);
        $(control).attr('class', 'editor-control');

        var formGroup = document.createElement('div');
        $(control).attr('class', 'form-group');

        var label = document.createElement('label');
        $(control).text(name);

        var input = document.createElement('input');
        $(input).attr('id', name);
        $(input).attr('class', 'form-control');
        $(input).attr('type', 'numeric');
        $(input).val(obj.value);
        input.boundObj = obj;

        if(callback){
            callback(input);
        }

        $(input).on('change', function ()
        {
            this.boundObj.value = this.value;
        });

        this.inputs.push(input);

        $(formGroup).append(label);
        $(formGroup).append(input);
        $(control).append(formGroup);
        $(this.editorElem).append(control);
    };


    Editor.prototype.update = function ()
    {
        for (var i = 0; i < this.inputs.length; i++)
        {
            var input = this.inputs[i];
            input.value = input.boundObj.value;
        }
    };

    return Editor;
});
