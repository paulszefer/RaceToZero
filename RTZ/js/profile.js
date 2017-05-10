var count = 0;
    
    function displayImage() {
        var imagesArray = ['img/profilepics/sushi.jpg', 'img/profilepics/pbsandwich.jpg', 'img/profilepics/coconut.jpg', 'img/profilepics/apples.png', 'img/profilepics/frenchtoast.png', 'img/profilepics/setprofilepic.png'];
        
        document.canvas.src = imagesArray [count];
        count++;
            if (count % 6 == 0){
                count = 0;
            }
    }