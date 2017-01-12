$(function(){

    var data = {
        cats: [{
            name: 'Becky',
            image: 'img/cat.jpg',
            clicks: 0
        },
        {
            name: 'Martha',
            image: 'img/cat2.jpg',
            clicks: 0
        },
        {
            name: 'JayZ',
            image: 'img/cat3.jpg',
            clicks: 0
        }],
        currentCat: null,
        admin: false
    };

    var octopus = {
        init: function() {
            data.currentCat = data.cats[0];
            view.init();
            view.initDropDown();
        },
        setCurrentCatByName: function(name) {
            data.cats.forEach(function(cat){
                if(cat.name === name) {
                    data.currentCat = cat;
                }
            });
        },

        getAllCats: function() {
            return data.cats;
        },

        getCurrentCat: function() {
            return data.currentCat;
        },

        setCurrentCat: function(cat) {
            data.cats.splice($.inArray(this.getCurrentCat(), data.cats), 1, cat);
            data.currentCat = cat;
            view.renderView();
            view.renderDropDown();
            view.initDropDown();
        },

        incrementCounter: function() {
            var cat = this.getCurrentCat();
            cat.clicks += 1;
            view.renderView();
        },

        toggleAdmin: function(){
            data.admin = !data.admin;
            view.renderView();
        },

        setAdmin: function(isAdmin){
            data.admin = isAdmin;
            view.renderView();
        },

        getAdmin: function() {
            return data.admin;
        }
    };

    var view = {
        init: function(){
            this.dropDownHTML = '<a id="%name%" class="drp" href="#">%name%</a>';
            this.$catName = $('#catName');
            this.$catImage = $('#catImage');
            this.$catClickHeader = $('#click-header');
            this.$adminForm = $('#admin-form');
            this.$formName = $('#form-name');
            this.$formUrl = $('#form-url');
            this.$formClicks = $('#form-clicks');
            this.$myDropDown = $('#myDropdown');

            $('#catImage').click(function(){
                octopus.incrementCounter();
            });

            $('#dropbutton').click(function() {
                $('#myDropdown').toggleClass('show');
            });

            // Close the dropdown menu if the user clicks outside of it
            window.onclick = function(event) {
              if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                  var openDropdown = dropdowns[i];
                  if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                  }
                }
              }
            }

            $('#admin-button, #cancel-button').click(function(){
                octopus.toggleAdmin();
            });

            $('#submit-button').click(function(e){
                var cat = {};
                cat.name = view.$formName.val();
                cat.image = view.$formUrl.val();
                cat.clicks = parseInt(view.$formClicks.val());
                octopus.setCurrentCat(cat);
                e.preventDefault();
            });

            this.renderDropDown();
            this.renderView();
        },
        renderDropDown: function() {
            this.$myDropDown.html('');
            var allCats = octopus.getAllCats();
            allCats.forEach(function(cat){
                $('#myDropdown').append(view.dropDownHTML.replace('%name%', cat.name).replace('%name%', cat.name));
            });
        },
        initDropDown: function() {
            $('.drp').click(function(e){
                octopus.setCurrentCatByName(e.target.id);
                octopus.setAdmin(false);
            });
        },
        renderView: function() {
            var cat = octopus.getCurrentCat();
            this.$catName.html(cat.name);
            this.$catImage.attr('src', cat.image);
            this.$catClickHeader.html('Number of clicks: ' + cat.clicks);

            if(octopus.getAdmin()){
                this.$adminForm.css('display', 'block');
            }
            else{
                this.$adminForm.css('display', 'none');
            }

            this.$formName.val(cat.name);
            this.$formUrl.val(cat.image);
            this.$formClicks.val(cat.clicks);
        }
    };

    octopus.init();
}());