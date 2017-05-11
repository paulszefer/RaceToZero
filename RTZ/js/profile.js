var count = 0;
    
    function displayImage() {
        var imagesArray = ['img/profilepic/sushi.jpg', 'img/profilepic/pbsandwich.jpg', 'img/profilepic/coconut.jpg', 'img/profilepic/apples.png', 'img/profilepic/frenchtoast.png', 'img/profilepic/setprofilepic.png'];
        
        document.canvas.src = imagesArray [count];
        count++;
            if (count % 6 == 0){
                count = 0;
            }
    }