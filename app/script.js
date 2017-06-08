$(document).ready(function() {

    var listo = []
    var Task = function(task) {
        this.task = task
        this.id = 'new'
    }
    var form = $('#newTaskForm')

    form.hide()

    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task.toUpperCase() === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                    console.log("changing from new to inProgress:",task.id)
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                    console.log("changing to archived:",task.id)
                } else {
                    listo.splice(i, 1);
                }
                break;
            }
        }
        console.log(task)
        task.remove();
    };

    $(document).on('click', '#item', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
    
    function addTask(task) {
        if(task) {
            task = new Task(task)
            listo.push(task)

            $('#newItemInput').val('');

            $('#newList').append(
                '<a href="#finish" class="" id="item">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>'+
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>'
            )

        }


        $('#newTaskForm').slideToggle('fast', 'linear');
    }

    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });


    $('#add-todo').on('click', function () {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });

    
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });


    //local storage
    $('#saveButton').on('click', function() {
        $(this).text('Saved!')
        setTimeout(function() {
            $('#saveButton').text('Save')
        }, 3000)


        localStorage.clear()
        console.log("Listo: ", listo)
        listo.forEach(function(element,i) {

            localStorage.setItem(i, JSON.stringify(element));
        })
    })

    
    $('#loadButton').on('click', function() {
        $(this).text('Loaded!')
        setTimeout(function() {
            $('#loadButton').text('Load')
        }, 3000)
        for(var i = 0; i < localStorage.length; i++) {

            reAddItem(JSON.parse(localStorage[i]))
        }
        console.log(listo)

    })
    
    function reAddItem(task) {
        console.log(task.id)
        listo.push(task)
        if(task.id === 'new') {
            $('#newList').append(
                '<a href="#finish" class="" id="item">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>'+
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>')
        }
        else if(task.id === 'inProgress') {
            $('#currentList').append(
                '<a href="#finish" class="" id="inProgress">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>'+
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>'
            )
        }
        else if(task.id === 'archived') {
            $('#archivedList').append(
                '<a href="#finish" class="" id="archived">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>'+
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>'
            )
        }
    }





})